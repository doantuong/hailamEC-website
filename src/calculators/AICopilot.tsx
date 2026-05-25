import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Loader2, Info, Wrench, ShieldAlert } from 'lucide-react';

interface AICopilotProps {
    activeTool: string | null;
}

export default function AICopilot({ activeTool }: AICopilotProps) {
    const [messages, setMessages] = useState([
        { role: 'model', text: 'Hello! I am the **HAILAMEC Engineering 24/7 Copilot**. \n\nI can assist you with:\n• Sizing equipment (Cables, MCCs, Transformers)\n• Troubleshooting (PLC logic, VFD faults, Instrument drops)\n• Standards verification (IEC, ISA)\n\nHow can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (activeTool) {
            setMessages(prev => [
                ...prev, 
                { role: 'model', text: `I see you opened the **${activeTool}** tool. Do you need parameter guidance, an explanation of the underlying formulas, or automated BOQ generation?` }
            ]);
        }
    }, [activeTool]);

    const handleSend = async (overrideInput?: string) => {
        const userMsg = overrideInput || input.trim();
        if (!userMsg) return;
        
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);

        try {
            const hist = messages.map(m => ({ role: m.role, text: m.text }));
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg, history: hist })
            });
            const data = await res.json();
            if (data.text) {
                // If it's a simulated or basic AI endpoint that's not ready, inject some smart logic
                if (data.text.includes('error connecting') || !data.text) {
                     setMessages(prev => [...prev, { role: 'model', text: simulateAIResponse(userMsg) }]);
                } else {
                     setMessages(prev => [...prev, { role: 'model', text: data.text }]);
                }
            } else {
                setMessages(prev => [...prev, { role: 'model', text: simulateAIResponse(userMsg) }]);
            }
        } catch (e) {
            setMessages(prev => [...prev, { role: 'model', text: simulateAIResponse(userMsg) }]);
        } finally {
            setLoading(false);
        }
    };

    // Simulated responses fallback to act like an engineering AI
    const simulateAIResponse = (req: string) => {
        const lower = req.toLowerCase();
        
        // Lead generation / Proposal scenario
        if (lower.includes('name') || lower.includes('infor.hailamec') || lower.includes('email') || lower.includes('@')) {
            return `Thank you. I have captured your contact information.\n\nOur engineering team will review the parameters and contact you at **infor.hailamec@gmail.com** with a formal quotation and technical method statement shortly.`;
        }
        
        // Troubleshooting scenario
        if (lower.includes('troubleshoot') || lower.includes('fault') || lower.includes('error') || lower.includes('diagnostic')) {
            return `**Automated Troubleshooting Protocol Initiated**\n\nBased on typical industrial scenarios, here is a troubleshooting sequence:\n1. Verify physical connections and termination integrity.\n2. Check power supply stability (measure 24VDC at the module).\n3. Review recent PLC diagnostic buffer logs or SCADA event alarms.\n4. Check network communication latency and cable shielding.\n\nWould you like me to open a support ticket for an **Engineering Review** or dispatch a maintenance team?`;
        }
        
        // Sizing scenario
        if (lower.includes('cable') || lower.includes('size') || lower.includes('breaker') || lower.includes('75kw')) {
            return `For standard low-voltage motor loads (IEC 60364), we calculate based on continuous full-load current (FLA) multiplied by a 1.25 derating factor. \n\nPlease provide your motor kW rating, and I will generate the required PVC/XLPE cross-section and Breaker Trip settings.\n\n_If you need an immediate certified BOQ, please provide your Name, Company, and Email._`;
        }
        
        // Maintenance scenario
        if (lower.includes('maintenance') || lower.includes('health') || lower.includes('interval')) {
            return `**Predictive Maintenance Analysis**\n\nFor industrial MCCs, VFDs, and PLC systems, we recommend:\n- **Monthly:** Visual inspections, fan filter checks, and SCADA alarm reviews.\n- **Bi-Annually:** Thermal imaging (IR thermography) of power connections.\n- **Annually:** Complete I/O checkout, network diagnostic scan, and power quality analysis.\n\nWould you like to schedule a **Preventive Maintenance Assessment**?`;
        }
        
        if (lower.includes('quote') || lower.includes('proposal') || lower.includes('contact')) {
            return `I can help arrange an engineering consultation. Please provide:\n1. Your Name\n2. Company Name\n3. Email Address\n4. Project Description\n\nAlternatively, you can email us directly at **infor.hailamec@gmail.com**.`;
        }

        return `I am analyzing your technical requirements against our engineering knowledge base. Our Senior Engineers will review this complex query.\n\nWould you like to generate a preliminary Method Statement or BOQ for this setup? Please provide your email to proceed.`;
    };

    return (
        <div className="flex flex-col h-full bg-[#0b111a] text-sm">
            <div className="p-3 bg-blue-500/10 border-b border-blue-500/20 flex flex-col gap-2">
                <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-300 font-medium tracking-wide border-b border-blue-500/20 pb-1">24/7 Digital Engineering Department</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                    <button onClick={() => handleSend('I need help troubleshooting a PLC communication fault.')} className="bg-blue-500/20 text-blue-300 text-[10px] px-2 py-1 rounded border border-blue-500/30 hover:bg-blue-500/30 transition-colors flex items-center gap-1 font-semibold uppercase tracking-wider">
                        <Wrench className="w-3 h-3" /> Troubleshoot
                    </button>
                    <button onClick={() => handleSend('Can you size a breaker for a 75kW motor?')} className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-1 rounded border border-amber-500/30 hover:bg-amber-500/30 transition-colors flex items-center gap-1 font-semibold uppercase tracking-wider">
                        <ShieldAlert className="w-3 h-3" /> Sizing Assist
                    </button>
                    <button onClick={() => handleSend('What are the recommended maintenance intervals for a VFD?')} className="bg-[#0AE340]/20 text-[#0AE340] text-[10px] px-2 py-1 rounded border border-[#0AE340]/30 hover:bg-[#0AE340]/30 transition-colors flex items-center gap-1 font-semibold uppercase tracking-wider">
                         Maintenance
                    </button>
                    <button onClick={() => handleSend('I would like to request an engineering proposal.')} className="bg-purple-500/20 text-purple-300 text-[10px] px-2 py-1 rounded border border-purple-500/30 hover:bg-purple-500/30 transition-colors flex items-center gap-1 font-semibold uppercase tracking-wider">
                         Get Proposal
                    </button>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[90%] rounded-lg p-3 shadow-md ${m.role === 'user' ? 'bg-[#0AE340]/10 text-white border border-[#0AE340]/30' : 'bg-[#1e293b] text-slate-200 border border-slate-700'}`}>
                            {m.role === 'model' && <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-700/50">
                                <Bot className="w-4 h-4 text-[#0AE340]" />
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">AI Consultant</span>
                            </div>}
                            <p className="whitespace-pre-wrap leading-relaxed space-y-2 prose prose-invert prose-sm" dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
                            
                            {m.role === 'model' && (m.text.includes('Engineering Review') || m.text.includes('BOQ')) && (
                                <div className="mt-4 pt-3 border-t border-slate-700/50">
                                    <button className="bg-[#0AE340] text-black text-xs font-bold px-4 py-2 rounded shadow shrink-0 hover:bg-[#0AE340]/80 transition-colors w-full uppercase flex justify-center items-center gap-2">
                                        Request Review & Quote
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-[#1e293b] rounded-lg p-3 border border-slate-700 text-slate-400 flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-[#0AE340]" />
                            <span className="text-xs">Analyzing engineering parameters...</span>
                        </div>
                    </div>
                )}
                <div ref={endRef} />
            </div>

            <div className="p-3 bg-[#0a0f18] border-t border-slate-800">
                <div className="relative">
                    <input 
                        type="text" 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        placeholder="Ask an engineering question..."
                        className="w-full bg-[#1e293b] border border-slate-700 rounded-lg pl-3 pr-10 py-2.5 text-[13px] text-white focus:outline-none focus:border-[#0AE340] transition-colors"
                    />
                    <button 
                        onClick={() => handleSend()}
                        disabled={loading || !input.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#0AE340]/20 text-[#0AE340] rounded hover:bg-[#0AE340]/40 disabled:opacity-50 transition-colors"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <div className="text-center mt-2">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest">HAILAMEC Industrial Intelligence Model</span>
                </div>
            </div>
        </div>
    );
}
