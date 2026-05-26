import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

// Basic in-memory rate limiter for anti-spam
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max 5 requests per minute per IP for lead submission

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  let record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    record = { count: 1, resetTime: now + 60000 };
    rateLimitMap.set(ip, record);
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  record.count++;
  return true;
}

// Basic sanitize input to prevent simple XSS/Injection
function sanitizeInput(str: any): string {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>'"=\/]/g, '').trim(); // Remove basic HTML tags and scripts
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Gemini Client will be lazy-initialized inside the /api/chat route to avoid server crashes if key is omitted on startup.

  // Local storage for B2B leads and inquiries
  const leadsFile = path.resolve(__dirname, 'leads.json');
  
  app.post('/api/submit-lead', (req, res) => {
    try {
      const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
      if (!checkRateLimit(clientIp)) {
        return res.status(429).json({ error: 'Too many requests. Anti-spam protection triggered.' });
      }

      let { name, email, company, phone, notes, requirement, service, lang, chatHistory } = req.body;
      
      name = sanitizeInput(name);
      email = sanitizeInput(email);
      phone = sanitizeInput(phone);
      company = sanitizeInput(company);
      notes = sanitizeInput(notes);
      
      if (!name || (!email && !phone)) {
        return res.status(400).json({ error: 'Name and at least email or phone are required.' });
      }

      let leads = [];
      if (fs.existsSync(leadsFile)) {
        try {
          leads = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
        } catch (e) {
          leads = [];
        }
      }
      
      // Calculate a basic AI Lead Score based on completeness and chat engagement
      let leadScore = 50;
      if (email && phone) leadScore += 10;
      if (company) leadScore += 10;
      if (notes && notes.length > 50) leadScore += 10;
      if (chatHistory && chatHistory.length > 2) leadScore += 20;

      const newLead = {
        id: Date.now().toString(),
        name,
        email: email || 'info@hailamec.com', 
        company: company || 'Not provided',
        phone,
        service: service || 'Engineering Consultation',
        notes,
        requirement,
        chatHistory: chatHistory || [],
        lang: lang || 'vi',
        leadScore,
        status: 'New',
        createdAt: new Date().toISOString()
      };
      leads.push(newLead);
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));

      // Simulate sending SMTP email notification to admin (info@hailamec.com)
      console.log('✉️ [SMTP] Sending notification to info@hailamec.com : New Lead Captured -', newLead.name);

      return res.json({ success: true, message: 'Lead submitted successfully', leadId: newLead.id });
    } catch (err) {
      console.error('Error submitting lead:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Admin endpoint to fetch CRM leads
  app.get('/api/leads', (req, res) => {
    try {
      let leads = [];
      if (fs.existsSync(leadsFile)) {
        leads = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
      }
      return res.json(leads.reverse());
    } catch (err) {
      console.error('Error reading leads:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Client-safe Gemini API Proxy
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history, lang } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
      }

      const clientLang = lang || 'vi';

      // Lazy-initialize GoogleGenAI with protection
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({ text: clientLang === 'vi' 
          ? "Xin chào! API Key chưa được thiết lập. Hãy truy cập thanh cấu hình của AI Studio để thiết lập `GEMINI_API_KEY` của bạn." 
          : "Hello! The Gemini API Key is not set in environment variables. Please configure `GEMINI_API_KEY` in AI Studio Settings." });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Professional executive-level system prompting mapping out HAI LAM's fields of technical consulting
      const systemInstruction = `You are "Senior Automation & Electrical Systems Engineering Consultant" at HAI LAM E&C. 
Your tone of voice is highly technical, precise, confident, and professional, characteristic of a senior consultant from ABB, Siemens, or Schneider Electric.
Avoid generic corporate fluff, sales exaggeration, and overly emotional marketing slogans. Highlight real engineering principles, technical standards (TCVN, IEC, ISO), and regulatory frameworks.

You specialize in:
1. Industrial Automation: PLC programming (Siemens S7-1200/1500, S7-300, S7-400, Allen-Bradley Studio 5000, Schneider EcoStruxure, Mitsubishi MELSEC), HMI/SCADA systems (WinCC, Ignition, Citect, FactoryTalk), industrial communications (Profinet, Profibus, Modbus RTU/TCP, EtherNet/IP, OPC UA, MQTT) and Industrial IoT gateways.
2. Electrical Engineering: MV & LV Substations, MSB (Main Switch Boards), MCC (Motor Control Center - drawer and fixed boards), VFD configurations, Soft Starters, power quality, cable sizing formulas (voltage drop, heat dissipation), and Active Harmonic Filters (AHF).
3. Instrumentation & Control (I&C): sensor transmitter calibration, Radar & Ultrasonic level meters, electromagnetic flow meters, Vortex & Coriolis mass meters, PID controller loop tuning, control valves and HART configurations.
4. Environmental Monitoring: CEMS (Continuous Emission Monitoring Systems for CO, SO2, NOx, O2, dust) and Wastewater Monitoring (pH, TSS, COD, Ammonium, automated sample collection). Full compliance with Vietnam's Decree 08/2022/NĐ-CP, Circular 02/2022/TT-BTNMT, and automated FTP transmission of Data Loggers to the local Department of Natural Resources and Environment (DONRE).
5. EPC Turnkey Workflows: on-site surveys, preliminary bills of materials (BOQ), shopdrawings, electrical panel construction, site wiring, cold/hot commissioning, SAT (Site Acceptance Test), handover, and long-term 24/7 technical maintenance services.

When the user asks technical questions (e.g. cable sizing formulas, CEMS hardware, radar vs ultrasonic measurements, withdrawable MCC panel layouts, transmitter calibration intervals, PID tuning, power quality analysis), demonstrate deep engineering mastery. Provide exact step-by-step guidelines, reference relevant standards (e.g. IEC 61439, IEC 60364) or local regulations, and provide concrete technical specifications.

Keep responses informative but concise. Encourage users to schedule an engineering consultation or request a technical proposal through our chat widget's form when they need full implementation.
Respond in the language the user is speaking (primarily Vietnamese or English). Use clean Markdown with structured lists and bold highlights for professional B2B readability.`;

      // Build model input conversation structure
      const contents = [];
      if (history && Array.isArray(history)) {
        for (const chatTurn of history) {
          contents.push({
            role: chatTurn.role === 'user' ? 'user' : 'model',
            parts: [{ text: chatTurn.text }]
          });
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.25, // Accurate and deterministic technical consultancy
        }
      });

      const text = response.text || '';
      return res.json({ text });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      return res.status(500).json({ error: err.message || 'Gemini API Error' });
    }
  });

  // Handle development vs production routing
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    
    app.use(vite.middlewares);

    app.get('*all', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let templatePath = 'index.html';
        if (url.startsWith('/vi/')) {
          templatePath = 'vi/index.html';
        } else if (url.startsWith('/en/')) {
          templatePath = 'en/index.html';
        } else if (url.startsWith('/tools')) {
          templatePath = 'tools.html';
        }

        if (!fs.existsSync(templatePath)) {
          templatePath = 'index.html';
        }

        let template = fs.readFileSync(path.resolve(__dirname, templatePath), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));

    app.get('*all', (req, res) => {
      const url = req.originalUrl;
      let templatePath = 'dist/index.html';
      if (url.startsWith('/vi/')) {
        templatePath = 'dist/vi/index.html';
      } else if (url.startsWith('/en/')) {
        templatePath = 'dist/en/index.html';
      } else if (url.startsWith('/tools')) {
        templatePath = 'dist/tools.html';
      }
      if (!fs.existsSync(templatePath)) {
        templatePath = 'dist/index.html';
      }
      res.sendFile(path.resolve(__dirname, templatePath));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 [HAILAMEC Full-Stack System] Operational on http://0.0.0.0:${PORT}`);
  });
}

startServer();
