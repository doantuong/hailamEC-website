// HAI LAM E&C STRATEGIC AI CHAT WIDGET
// Author: Chief Strategy Architect
// Language: TypeScript (Modular Vanilla ESM)

interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

function initAIChatbot() {
  // Make sure we do not load multiple times
  const CONTAINER_ID = 'hailamec-ai-chat-root';
  if (document.getElementById(CONTAINER_ID)) return;
  if (!document.body) {
      console.warn("[HAI LAM E&C AI] document.body not ready. Delaying mount...");
      return;
  }

  console.log('[HAI LAM E&C AI] Initializing Chatbot Widget...');
  
  // 1. Language Detection based on URL path
  const isEn = window.location.pathname.includes('/en/');
  const langKey = isEn ? 'en' : 'vi';

  // 2. Bilingual I18n Resource Map
  const i18n = {
    vi: {
      launcherTitle: "Tư vấn Kỹ thuật AI",
      statusOnline: "Kỹ sư Trưởng trực tuyến",
      welcomeMessage: "Kính chào Quý khách! Tôi là **AI Engineering Consultant** của Hải Lam E&C. \n\nTôi có thể hỗ trợ Quý khách giải quyết nhanh các bài toán kỹ thuật như:\n\n*   **Tự động hóa**: Thiết kế mạch PLC, nâng cấp tủ SCADA, truyền thông Profinet/Citect.\n*   **Cơ Điện (M&E)**: Tính sụn áp, chọn cỡ cáp IEC, tính toán bù tải trạm biến áp.\n*   **Thu thập dữ liệu**: Tích hợp module IoT Gateway, kết nối PID cảm biến đo lường HART.\n*   **Bảo vệ Môi trường**: Thiết kế trạm CEMS, WQMS đạt chuẩn kiểm định theo **Thông tư 02/2022/TT-BTNMT** & truyền dữ liệu Sở TNMT.\n\nQuý khách đang gặp thách thức kỹ thuật gì ở nhà xưởng?",
      inputPlaceholder: "Nhập câu hỏi kỹ thuật (vd: tính sụt cáp, thiết kế tủ MCC...)",
      btnSend: "Gửi",
      tabChat: "Tư vấn Kỹ thuật",
      tabForm: "Gửi Báo Giá / RFQ",
      tabContact: "Kênh Trực Tiếp",
      suggestTitle: "Nội dung đề xuất tư vấn:",
      submitSuccess: "Gửi thông tin RFQ thành công! Trực ban Kỹ sư Trưởng Hải Lam E&C đã nhận được yêu cầu của bạn và sẽ liên hệ phản hồi phương án sơ bộ cùng báo giá trong vòng tối đa 4 giờ.",
      form_name: "Họ và tên Kỹ sư / Đại diện *",
      form_company: "Tên Doanh nghiệp / Nhà máy",
      form_email: "Địa chỉ Email liên hệ *",
      form_phone: "Số điện thoại đấu nối *",
      form_requirement: "Hạng mục kỹ thuật cần khảo sát",
      form_notes: "Mô tả yêu cầu kỹ thuật chi tiết của hệ thống",
      form_submit: "Nhận Đề xuất & Báo giá Turnkey",
      form_error: "Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Email để ban kỹ sư liên hệ.",
      opts_env: "Hệ thống CEMS & Quan trắc tự động (Circular 02/2022)",
      opts_auto: "Tích hợp PLC / SCADA & Nâng cấp dây chuyền",
      opts_elec: "Tổng thầu Cơ điện, Tủ điện MSB / MCC & TBA",
      opts_design: "Thiết kế kỹ thuật, bản vẽ Shopdrawing & BIM Revit",
      opts_maint: "Dịch vụ Bảo trì dài hạn & Ứ cứu sự cố 24/7",
      directIntro: "Kết nối trực tiếp với Văn phòng Dự án và Ban Kỹ sư:",
      phoneLabel: "Hotline Dự án (24/7):",
      emailLabel: "Email nhận Hồ sơ Thầu / RFQ:",
      zaloLabel: "Kênh hỗ trợ Zalo (Kỹ sư trực):",
      whatsappLabel: "International Sales (WhatsApp):",
      suggestedQuestions: [
        "Tính cỡ cáp hạ thế theo chuẩn IEC",
        "Quy định đo đạc trạm CEMS TNMT",
        "Backup chuyển đổi PLC S7-300 lên S7-1500",
        "Tư vấn lắp tủ bù tụ và lọc sóng hài AHF",
        "Quy trình khảo sát & báo giá EPC Turnkey"
      ]
    },
    en: {
      launcherTitle: "B2B AI Consultant",
      statusOnline: "Senior Engineering AI Online",
      welcomeMessage: "Greetings! I am the **Strategic Engineering AI Consultant** for HAILAMEC. \n\nI can assist you with precise engineering formulations, compliance diagnostics, and turnkey EPC designs including:\n\n*   **Industrial Automation**: PLC logic (Siemens, Rockwell), Scada architectures (Ignition, WinCC), and IoT Gateway deployments.\n*   **MV/LV Power Distribution**: IEC cable loading calculations, voltage drop sizing, and Active Harmonic Filters (AHF).\n*   **Instrumentation**: Smart flowmeter loops (Coriolis, Vortex), level transmitters (Radar, Ultrasonic), and 4-20mA HART calibration.\n*   **Environmental Monitoring**: Continuous Emission Monitoring Systems (CEMS) and Wastewater designs in compliance with **Vietnam's Decree 08/2022/NĐ-CP** and automated DONRE transmission.\n\nWhat engineering bottleneck can we solve for your facility today?",
      inputPlaceholder: "Type technical query (e.g. cable sizing IEC, CEMS compliance...)",
      btnSend: "Send",
      tabChat: "Engineering Assistant",
      tabForm: "Request Proposal",
      tabContact: "Direct Channels",
      suggestTitle: "Suggested technical topics:",
      submitSuccess: "Turnkey RFP received successfully! Our Chief Strategy Architect and Senior Engineers will assess your technical requirements and send a preliminary solution within 4 hours.",
      form_name: "Engineer / Representative Name *",
      form_company: "Enterprise / Factory Name",
      form_email: "Corporate Email *",
      form_phone: "Contact Phone Number *",
      form_requirement: "Primary Technical Discipline",
      form_notes: "Specification detailing or scope of work",
      form_submit: "Generate Turnkey Engineering Proposal",
      form_error: "Please complete your Name, Email, and Phone so we can route the technical solution.",
      opts_env: "CEMS & Water Monitoring Compliance",
      opts_auto: "PLC / SCADA Integration & Retrofits",
      opts_elec: "Industrial Substation, MSB / MCC Panel EPC",
      opts_design: "BIM / Shopdrawing Design & BOQ estimation",
      opts_maint: "24/7 Industrial SLA & Preventive Maintenance",
      directIntro: "Direct escalation paths to our Project Management Office:",
      phoneLabel: "Project Line (24/7 Direct):",
      emailLabel: "Tenders & Proposals Email:",
      zaloLabel: "Zalo Support Group (Local):",
      whatsappLabel: "Worldwide Business (WhatsApp):",
      suggestedQuestions: [
        "Sizing power cable voltage drop IEC",
        "CEMS compliance Decree 08/2022",
        "S7-300 to S7-1500 PLC Migration",
        "Capacitor Bank & Harmonic Filter design",
        "Turnkey EPC survey & bidding process"
      ]
    }
  };

  const t = i18n[langKey];

  // 3. Local state tracking loaded from SessionStorage so it persists page navigation!
  let chatHistory: ChatTurn[] = [];
  try {
    const saved = sessionStorage.getItem('hailamec_ai_history');
    if (saved) {
      chatHistory = JSON.parse(saved);
    }
  } catch (e) {
    chatHistory = [];
  }

  // Create style element to load custom animations and overrides
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    @keyframes slideInUp {
      from { transform: translateY(30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes pulseSoft {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.15); opacity: 0.8; }
    }
    .animate-slide-up { animation: slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-pulse-soft { animation: pulseSoft 2s infinite ease-in-out; }
    
    /* Elegant Markdown styling overrides */
    .chatbot-markdown p { margin-bottom: 12px; line-height: 1.5; }
    .chatbot-markdown ul, .chatbot-markdown ol { margin-left: 18px; margin-bottom: 12px; list-style-type: disc; }
    .chatbot-markdown li { margin-bottom: 4px; line-height: 1.4; }
    .chatbot-markdown strong { font-weight: 700; color: #1e293b; }
    .chatbot-markdown h4 { font-weight: 700; font-size: 1.05rem; margin-top: 12px; margin-bottom: 6px; color: #0f172a; }
  `;
  document.head.appendChild(styleEl);

  // 4. Create UI Markup Hierarchy
  const root = document.createElement('div');
  root.id = CONTAINER_ID;
  root.className = 'fixed bottom-6 right-6 z-[99999] flex flex-col items-end font-sans';

  // Inside the script we construct the HTML
  root.innerHTML = `
    <!-- Floating Launcher Badge -->
    <button id="ai-chat-launcher" class="flex items-center gap-3 bg-slate-900 border border-slate-700 hover:border-accent text-white px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-accent">
      <!-- Status pulse -->
      <span class="relative flex h-3 w-3">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
      </span>
      <span class="font-bold text-[14px] tracking-wide uppercase">${t.launcherTitle}</span>
      <svg class="w-5 h-5 ml-1 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 10.742l3.417-3.417m0 0l3.417 3.417m-3.417-3.417v12.213" />
      </svg>
    </button>

    <!-- Unified Chat Window -->
    <div id="ai-chat-window" class="hidden flex flex-col w-[390px] md:w-[410px] h-[600px] max-h-[85vh] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden mt-4 transition-all duration-300 transform scale-95 opacity-0 origin-bottom-right">
      
      <!-- Window Executive Header -->
      <div class="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-5 py-4 flex flex-col gap-1 border-b border-slate-800">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6 text-red-500" viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg">
              <path d="M250 20 L480 160 L250 300 L20 160 Z" fill="none" stroke="currentColor" stroke-width="24" />
            </svg>
            <span class="font-extrabold text-[15px] tracking-wide text-slate-100 uppercase">HAI LAM E&C</span>
          </div>
          <!-- Close Button -->
          <button id="ai-chat-close" class="text-slate-400 hover:text-white transition-colors p-1 focus:outline-none">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex items-center gap-1.5 mt-1.5 text-xs text-slate-300">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>${t.statusOnline}</span>
          <span class="mx-1 text-slate-600">|</span>
          <span>EPC General Contractor</span>
        </div>
      </div>

      <!-- Tab Selection System (Siemens style bento headers) -->
      <div class="grid grid-cols-3 bg-slate-50 border-b border-slate-200 text-xs text-slate-600 font-bold">
        <button id="tab-chat" class="py-3 px-1 border-b-2 border-red-600 text-slate-900 text-center transition-all focus:outline-none hover:bg-slate-100">${t.tabChat}</button>
        <button id="tab-form" class="py-3 px-1 border-b-2 border-transparent text-center transition-all focus:outline-none hover:bg-slate-100">${t.tabForm}</button>
        <button id="tab-contact" class="py-3 px-1 border-b-2 border-transparent text-center transition-all focus:outline-none hover:bg-slate-100">${t.tabContact}</button>
      </div>

      <!-- Main Widget Body Area -->
      <div class="flex-1 flex flex-col overflow-hidden bg-slate-50 relative">
        
        <!-- SECTION 1: AI ASSISTANT PANEL -->
        <div id="panel-chat" class="flex-1 flex flex-col overflow-hidden">
          <div id="chat-messages" class="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            <!-- Initial Welcome Card from AI Consultant -->
            <div class="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm text-[13.5px] text-slate-700 leading-relaxed max-w-[90%] chatbot-markdown">
              ${formatMarkdown(t.welcomeMessage)}
              
              <!-- Quick Suggestion Action Chips -->
              <div class="mt-4 border-t border-slate-100 pt-3">
                <span class="text-xs font-bold text-slate-500 uppercase block mb-2">${t.suggestTitle}</span>
                <div class="flex flex-wrap gap-1.5">
                  ${t.suggestedQuestions.map(q => `
                    <button class="suggest-chip text-left text-xs bg-slate-100 hover:bg-red-50 hover:text-red-700 hover:border-red-300 text-slate-600 font-medium px-2.5 py-1.5 rounded border border-slate-200 transition-all outline-none">
                      ${q}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
            <!-- Interactive appended messages go here -->
          </div>

          <!-- Input Trigger Control Bar -->
          <div class="bg-white p-3 border-t border-slate-200 flex gap-2">
            <input id="chat-textarea" type="text" placeholder="${t.inputPlaceholder}" class="flex-1 text-[13.5px] bg-slate-50 border border-slate-200 focus:border-slate-400 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-slate-400" />
            <button id="chat-send-btn" class="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider px-4 rounded-lg flex items-center justify-center transition-all focus:outline-none active:scale-95">
              ${t.btnSend}
            </button>
          </div>
        </div>

        <!-- SECTION 2: B2B RFQ LEAD CAPTURE FORM -->
        <div id="panel-form" class="hidden flex-1 overflow-y-auto p-5">
          <div id="rfq-form-container" class="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex flex-col gap-4">
            <div class="text-center mb-1">
              <h4 class="text-sm font-bold text-slate-800 uppercase tracking-wide">HAI LAM B2B ENGINEERING GATEWAY</h4>
              <p class="text-[11.5px] text-slate-500 mt-1">Leave technical parameters to generate an executive bidding estimate.</p>
            </div>
            
            <form id="rfq-lead-form" class="flex flex-col gap-3">
              <div>
                <label class="block text-xs font-bold text-slate-600 uppercase mb-1">${t.form_name}</label>
                <input required id="lead-name" type="text" placeholder="e.g. Nguyễn Văn A" class="w-full text-xs bg-slate-50 border border-slate-200 focus:border-slate-400 rounded px-2.5 py-2 outline-none" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-600 uppercase mb-1">${t.form_company}</label>
                <input id="lead-company" type="text" placeholder="e.g. Heineken Vietnam, VSIP II" class="w-full text-xs bg-slate-50 border border-slate-200 focus:border-slate-400 rounded px-2.5 py-2 outline-none" />
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs font-bold text-slate-600 uppercase mb-1">${t.form_email}</label>
                  <input required id="lead-email" type="email" placeholder="name@company.com" class="w-full text-xs bg-slate-50 border border-slate-200 focus:border-slate-400 rounded px-2.5 py-2 outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-600 uppercase mb-1">${t.form_phone}</label>
                  <input required id="lead-phone" type="tel" placeholder="090123456" class="w-full text-xs bg-slate-50 border border-slate-200 focus:border-slate-400 rounded px-2.5 py-2 outline-none" />
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-600 uppercase mb-1">${t.form_requirement}</label>
                <select id="lead-requirement" class="w-full text-xs bg-slate-50 border border-slate-200 focus:border-slate-400 rounded px-2.5 py-2 outline-none">
                  <option value="CEMS">${t.opts_env}</option>
                  <option value="Automation">${t.opts_auto}</option>
                  <option value="Electrical">${t.opts_elec}</option>
                  <option value="Design">${t.opts_design}</option>
                  <option value="Maintenance">${t.opts_maint}</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-600 uppercase mb-1">${t.form_notes}</label>
                <textarea id="lead-notes" rows="3" placeholder="Specify control platforms, sizing targets, CEMS parameters, etc..." class="w-full text-xs bg-slate-50 border border-slate-200 focus:border-slate-400 rounded px-2.5 py-2 outline-none resize-none"></textarea>
              </div>
              <button type="submit" class="mt-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded transition-all outline-none focus:ring-2 focus:ring-accent">
                ${t.form_submit}
              </button>
            </form>
          </div>
        </div>

        <!-- SECTION 3: DIRECT B2B CHANNELS & PHONE ESCALATION -->
        <div id="panel-contact" class="hidden flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          <p class="text-xs text-slate-500 font-medium">${t.directIntro}</p>

          <!-- Hotline Direct -->
          <a href="tel:+84364518980" class="flex items-center gap-4 bg-white border border-slate-100 hover:border-red-300 p-3.5 rounded-xl shadow-sm hover:translate-x-1 transition-all group">
            <div class="w-10 h-10 bg-red-50 text-red-600 flex items-center justify-center rounded-lg text-lg font-bold group-hover:bg-red-600 group-hover:text-white transition-all">
              📞
            </div>
            <div>
              <span class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">${t.phoneLabel}</span>
              <span class="text-sm font-extrabold text-slate-800 cursor-pointer">+84 364 518 980</span>
            </div>
          </a>

          <!-- Zalo Connection (local) -->
          <a href="https://zalo.me/364518980" target="_blank" class="flex items-center gap-4 bg-white border border-slate-100 hover:border-blue-300 p-3.5 rounded-xl shadow-sm hover:translate-x-1 transition-all group">
            <div class="w-10 h-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-lg text-lg font-extrabold group-hover:bg-blue-600 group-hover:text-white transition-all">
              Z
            </div>
            <div>
              <span class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">${t.zaloLabel}</span>
              <span class="text-sm font-extrabold text-slate-800 cursor-pointer">Zalo Chat Support</span>
            </div>
          </a>

          <!-- WhatsApp Direct (interntional) -->
          <a href="https://wa.me/84364518980" target="_blank" class="flex items-center gap-4 bg-white border border-slate-100 hover:border-emerald-300 p-3.5 rounded-xl shadow-sm hover:translate-x-1 transition-all group">
            <div class="w-10 h-10 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-lg text-lg font-bold group-hover:bg-emerald-600 group-hover:text-white transition-all">
              💬
            </div>
            <div>
              <span class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">${t.whatsappLabel}</span>
              <span class="text-sm font-extrabold text-slate-800 cursor-pointer">+84 364 518 980</span>
            </div>
          </a>

          <!-- Project Email -->
          <a href="mailto:info@hailamec.com" class="flex items-center gap-4 bg-white border border-slate-100 hover:border-slate-300 p-3.5 rounded-xl shadow-sm hover:translate-x-1 transition-all group">
            <div class="w-10 h-10 bg-slate-50 text-slate-600 flex items-center justify-center rounded-lg text-lg font-bold group-hover:bg-slate-900 group-hover:text-white transition-all">
              ✉
            </div>
            <div>
              <span class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">${t.emailLabel}</span>
              <span class="text-sm font-extrabold text-slate-800 truncate block">info@hailamec.com</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(root);

  // 5. Connect UI Triggers & Interactive Event Handlers
  const launcher = document.getElementById('ai-chat-launcher');
  const windowEl = document.getElementById('ai-chat-window');
  const closeBtn = document.getElementById('ai-chat-close');

  const tabChatBtn = document.getElementById('tab-chat');
  const tabFormBtn = document.getElementById('tab-form');
  const tabContactBtn = document.getElementById('tab-contact');

  const panelChat = document.getElementById('panel-chat');
  const panelForm = document.getElementById('panel-form');
  const panelContact = document.getElementById('panel-contact');

  const messagesContainer = document.getElementById('chat-messages');
  const textarea = document.getElementById('chat-textarea') as HTMLInputElement;
  const sendBtn = document.getElementById('chat-send-btn');
  const leadForm = document.getElementById('rfq-lead-form') as HTMLFormElement;

  // Toggle Window visibility
  launcher?.addEventListener('click', () => {
    const isHidden = windowEl?.classList.contains('hidden');
    if (isHidden) {
      windowEl?.classList.remove('hidden');
      setTimeout(() => {
        windowEl?.classList.remove('scale-95', 'opacity-0');
        windowEl?.classList.add('scale-100', 'opacity-100', 'animate-slide-up');
        launcher.classList.add('hidden');
      }, 30);
      renderHistory();
    }
  });

  closeBtn?.addEventListener('click', () => {
    windowEl?.classList.add('scale-95', 'opacity-0');
    windowEl?.classList.remove('scale-100', 'opacity-100', 'animate-slide-up');
    setTimeout(() => {
      windowEl?.classList.add('hidden');
      launcher?.classList.remove('hidden');
    }, 200);
  });

  // Switch Tabs System
  function selectTab(selectedTab: 'chat' | 'form' | 'contact') {
    const activeTabClass = ['border-red-600', 'text-slate-900'];
    const inactiveTabClass = ['border-transparent'];

    // Reset tabs
    tabChatBtn?.classList.remove(...activeTabClass);
    tabChatBtn?.classList.add(...inactiveTabClass);
    tabFormBtn?.classList.remove(...activeTabClass);
    tabFormBtn?.classList.add(...inactiveTabClass);
    tabContactBtn?.classList.remove(...activeTabClass);
    tabContactBtn?.classList.add(...inactiveTabClass);

    // Hide all panels
    panelChat?.classList.add('hidden');
    panelForm?.classList.add('hidden');
    panelContact?.classList.add('hidden');

    // Activate selected
    if (selectedTab === 'chat') {
      tabChatBtn?.classList.add(...activeTabClass);
      tabChatBtn?.classList.remove(...inactiveTabClass);
      panelChat?.classList.remove('hidden');
    } else if (selectedTab === 'form') {
      tabFormBtn?.classList.add(...activeTabClass);
      tabFormBtn?.classList.remove(...inactiveTabClass);
      panelForm?.classList.remove('hidden');
    } else if (selectedTab === 'contact') {
      tabContactBtn?.classList.add(...activeTabClass);
      tabContactBtn?.classList.remove(...inactiveTabClass);
      panelContact?.classList.remove('hidden');
    }
  }

  tabChatBtn?.addEventListener('click', () => selectTab('chat'));
  tabFormBtn?.addEventListener('click', () => selectTab('form'));
  tabContactBtn?.addEventListener('click', () => selectTab('contact'));

  // Render chat turns into message container
  function renderHistory() {
    // Collect existing loaded chat elements and flush past cards, preserving only initial card
    const initialCard = messagesContainer?.firstElementChild;
    if (!messagesContainer) return;
    
    messagesContainer.innerHTML = '';
    if (initialCard) {
      messagesContainer.appendChild(initialCard);
    }

    chatHistory.forEach(turn => {
      appendMessageUI(turn.role, turn.text);
    });
    
    scrollChatBottom();
  }

  function appendMessageUI(role: 'user' | 'model', text: string) {
    if (!messagesContainer) return;
    const msgCard = document.createElement('div');
    if (role === 'user') {
      msgCard.className = 'bg-slate-900 text-white rounded-xl p-3 shadow-sm text-[13px] self-end max-w-[85%] font-medium leading-relaxed';
      msgCard.textContent = text;
    } else {
      msgCard.className = 'bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm text-[13.5px] text-slate-700 leading-relaxed self-start max-w-[90%] chatbot-markdown';
      msgCard.innerHTML = formatMarkdown(text);
    }
    messagesContainer.appendChild(msgCard);
    scrollChatBottom();
  }

  function appendThinkingUI() {
    if (!messagesContainer) return null;
    const loaderCard = document.createElement('div');
    loaderCard.id = 'chat-thinking-loader';
    loaderCard.className = 'bg-white border border-slate-100 rounded-xl px-4 py-3 shadow-sm text-xs text-slate-500 self-start flex items-center gap-2 font-medium';
    loaderCard.innerHTML = `
      <span class="flex h-2 w-2 relative">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
      </span>
      <span>Chief Strategy Architect is reviewing specifications...</span>
    `;
    messagesContainer.appendChild(loaderCard);
    scrollChatBottom();
    return loaderCard;
  }

  function scrollChatBottom() {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  // Format simple markdown blocks
  function formatMarkdown(text: string): string {
    if (!text) return '';
    
    // Bold tags formatting
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    
    // Convert bullet asterisks to lists
    const lines = formatted.split('\n');
    let inList = false;
    let finalHtml = '';

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
        const itemContent = trimmed.substring(1).trim();
        if (!inList) {
          finalHtml += '<ul class="list-disc pl-5 mb-3">';
          inList = true;
        }
        finalHtml += `<li class="mb-1">${itemContent}</li>`;
      } else {
        if (inList) {
          finalHtml += '</ul>';
          inList = false;
        }
        if (trimmed.length > 0) {
          finalHtml += `<p class="mb-3">${line}</p>`;
        }
      }
    });

    if (inList) {
      finalHtml += '</ul>';
    }

    return finalHtml;
  }

  // Trigger outbound API chat query
  async function triggerChatInquiry(userText: string) {
    if (!userText.trim()) return;
    
    // Append to UI
    appendMessageUI('user', userText);
    textarea.value = '';

    // Append to runtime list
    chatHistory.push({ role: 'user', text: userText });
    saveHistory();

    const loader = appendThinkingUI();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: chatHistory.slice(0, -1), // Exclude the newly added user message as it is sent as the primary body message
          lang: langKey
        })
      });

      loader?.remove();

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      const modelText = data.text || 'We encountered an internal processing issue. Please request a direct consult.';
      
      appendMessageUI('model', modelText);
      chatHistory.push({ role: 'model', text: modelText });
      saveHistory();

    } catch (err) {
      loader?.remove();
      console.error('Inquiry error:', err);
      const errorText = isEn 
        ? "⚠️ **Connection Timeout**. High engineering bandwidth required. Please escalate via **Direct Channels** or the **Submit RFQ** tab above."
        : "⚠️ **Mất kết nối trung tâm**. Hiện tại hệ thống đang quá tải. Quý khách vui lòng thử lại hoặc gửi yêu cầu nhanh qua tab **Gửi Báo Giá / RFQ** phía trên.";
      appendMessageUI('model', errorText);
    }
  }

  function saveHistory() {
    try {
      // Retain max 20 logs
      if (chatHistory.length > 20) {
        chatHistory = chatHistory.slice(-20);
      }
      sessionStorage.setItem('hailamec_ai_history', JSON.stringify(chatHistory));
    } catch (e) {}
  }

  // Trigger Send Button click
  sendBtn?.addEventListener('click', () => {
    triggerChatInquiry(textarea.value);
  });

  textarea?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      triggerChatInquiry(textarea.value);
    }
  });

  // Wire suggestion chips
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target && target.classList.contains('suggest-chip')) {
      const question = target.textContent?.trim() || '';
      if (question) {
        triggerChatInquiry(question);
      }
    }
  });

  // B2B Lead RFQ Handling
  leadForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = (document.getElementById('lead-name') as HTMLInputElement).value;
    const company = (document.getElementById('lead-company') as HTMLInputElement).value;
    const email = (document.getElementById('lead-email') as HTMLInputElement).value;
    const phone = (document.getElementById('lead-phone') as HTMLInputElement).value;
    const requirement = (document.getElementById('lead-requirement') as HTMLSelectElement).value;
    const notes = (document.getElementById('lead-notes') as HTMLTextAreaElement).value;

    const formBtn = leadForm.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = formBtn.textContent;

    formBtn.disabled = true;
    formBtn.textContent = isEn ? "Encrypting RFQ..." : "Đang kiểm tra kết nối...";

    try {
      const r = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, phone, requirement, notes, lang: langKey, chatHistory })
      });

      if (!r.ok) throw new Error('Failed to register lead');

      // Success visual overlay
      const card = document.getElementById('rfq-form-container');
      if (card) {
        card.innerHTML = `
          <div class="text-center py-8 px-4 flex flex-col items-center gap-4">
            <div class="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-3xl font-bold border border-emerald-200 animate-pulse-soft">
              ✓
            </div>
            <h4 class="text-sm font-bold text-slate-800 uppercase tracking-wide">${isEn ? 'RFQ TRANSMITTED SECURELY' : 'ĐÃ ĐẤU NỐI RFQ THÀNH CÔNG'}</h4>
            <p class="text-[12.5px] text-slate-600 leading-relaxed">${t.submitSuccess}</p>
            <div class="flex gap-2 mt-4 w-full">
              <a href="https://zalo.me/364518980" target="_blank" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase py-2.5 rounded text-center transition-all">
                Zalo chat
              </a>
              <button id="rfq-reset-btn" class="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs uppercase py-2.5 rounded transition-all">
                ${isEn ? 'Back to form' : 'Gửi yêu cầu mới'}
              </button>
            </div>
          </div>
        `;

        document.getElementById('rfq-reset-btn')?.addEventListener('click', () => {
          window.location.reload();
        });
      }

    } catch (err) {
      console.error(err);
      alert(isEn ? "Failed to transmit lead. Please reach out via Direct Channels." : "Có lỗi truyền dữ liệu. Quý khách vui lòng gọi Hotline trực tiếp.");
      formBtn.disabled = false;
      formBtn.textContent = originalText;
    }
  });

} // End of initAIChatbot

// Ensure execution is safe regardless of when WP injects the script (async/defer)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAIChatbot);
} else {
    initAIChatbot();
}

// Fallback for Flatsome / WP caching mechanisms that might inject the script late
const aiObserver = new MutationObserver((mutations, obs) => {
    if (document.body && !document.getElementById('hailamec-ai-chat-root')) {
        initAIChatbot();
        // Don't disconnect immediately if it was too early, but wait until it's actually placed
        if (document.getElementById('hailamec-ai-chat-root')) {
            obs.disconnect();
        }
    }
});

// Start observing as soon as possible
if (document.body) {
    aiObserver.observe(document.documentElement, { childList: true, subtree: true });
} else {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.body) {
            aiObserver.observe(document.documentElement, { childList: true, subtree: true });
        }
    });
}
