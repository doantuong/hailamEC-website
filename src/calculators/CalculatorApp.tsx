import React, { useState } from 'react';
import { 
    Zap, Activity, Cpu, Settings, Search, Menu, 
    X, ChevronRight, Calculator, Bot, History, BookOpen 
} from 'lucide-react';
import AICopilot from './AICopilot';
import VoltageDropTool from './tools/VoltageDropTool';
import ScalingTool from './tools/ScalingTool';
import PlcIoTool from './tools/PlcIoTool';
import MotorCurrentTool from './tools/MotorCurrentTool';

const categories = [
    { id: 'electrical', name: 'Electrical', icon: <Zap className="w-4 h-4" /> },
    { id: 'instrumentation', name: 'Instrumentation', icon: <Activity className="w-4 h-4" /> },
    { id: 'automation', name: 'Automation', icon: <Cpu className="w-4 h-4" /> },
    { id: 'process', name: 'Process', icon: <Settings className="w-4 h-4" /> },
];

const allTools = [
    { id: 'voltage-drop', name: 'Voltage Drop Calculator', category: 'electrical', desc: 'Calculate cable voltage drop based on material, size, and current.', status: 'popular' },
    { id: 'cable-size', name: 'Cable Sizing Tool', category: 'electrical', desc: 'Determine correct cable size conforming to IEC standards.', status: 'new' },
    { id: 'scaling-420', name: '4-20mA Scaling Converter', category: 'instrumentation', desc: 'Scale raw analog currents to process values instantly.', status: 'popular' },
    { id: 'plc-io', name: 'PLC I/O Estimator', category: 'automation', desc: 'Calculate module requirements from an instrument list.', status: 'beta' },
    { id: 'motor-current', name: 'Motor Current Calculator', category: 'electrical', desc: 'Calculate FLA for motors based on kW/HP ratings.', status: '' },
    { id: 'tank-vol', name: 'Tank Volume Calculator', category: 'process', desc: 'Volumetric calculation for cylindrical/spherical tanks.', status: '' },
];

export default function CalculatorApp() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [copilotOpen, setCopilotOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeTool, setActiveTool] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTools = allTools.filter(t => 
        (activeCategory === 'all' || t.category === activeCategory) &&
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderTool = () => {
        if (activeTool === 'voltage-drop') return <VoltageDropTool />;
        if (activeTool === 'scaling-420') return <ScalingTool />;
        if (activeTool === 'plc-io') return <PlcIoTool />;
        if (activeTool === 'motor-current') return <MotorCurrentTool />;
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
                <Settings className="w-16 h-16 mb-4 opacity-30 animate-spin-slow" />
                <h3 className="text-xl font-bold text-white mb-2">Module Emulation Mode</h3>
                <p className="max-w-md text-center text-sm leading-relaxed mb-6">This calculator module is currently syncing with cloud engineering libraries. Ask the HAILAMEC AICopilot if you need immediate consultation.</p>
                <button onClick={() => setActiveTool(null)} className="px-6 py-2 bg-[#1e293b] border border-slate-700 rounded-lg text-white font-medium hover:bg-slate-800 transition-colors">Return to Dashboard</button>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-[#06090e] font-sans overflow-hidden text-slate-200">
            {/* Sidebar */}
            <div 
                className={`bg-[#0b111a] border-r border-slate-800 flex-shrink-0 overflow-y-auto overflow-x-hidden flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-[260px]' : 'w-0'}`}
            >
                <div className="p-4 border-b border-slate-800 flex items-center gap-3 w-[260px]">
                    <div className="w-8 h-8 rounded bg-[#1e293b] flex items-center justify-center flex-shrink-0 border border-slate-700">
                        <Activity className="w-5 h-5 text-[#0AE340]" />
                    </div>
                    <div>
                        <h1 className="font-bold text-sm tracking-widest text-white uppercase">HAILAMEC</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Engineering SaaS</p>
                    </div>
                </div>

                <div className="p-4 flex-1 w-[260px]">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Categories</div>
                    <button 
                        onClick={() => { setActiveCategory('all'); setActiveTool(null); }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors mb-1 ${activeCategory === 'all' ? 'bg-[#1e293b] text-white border border-slate-700' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                    >
                        <Calculator className="w-4 h-4" />
                        All Tools
                    </button>
                    {categories.map(c => (
                        <button 
                            key={c.id}
                            onClick={() => { setActiveCategory(c.id); setActiveTool(null); }}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors mb-1 ${activeCategory === c.id ? 'bg-[#1e293b] text-white border border-slate-700' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                        >
                            {c.icon}
                            {c.name}
                        </button>
                    ))}

                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-8 mb-2">Features</div>
                    <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors mb-1">
                        <div className="flex items-center gap-3"><History className="w-4 h-4" /> Edit History</div>
                        <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">Pro</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors mb-1">
                        <BookOpen className="w-4 h-4" /> Engineering Notes
                    </button>
                </div>
            </div>

            {/* Main View */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-14 border-b border-slate-800 flex items-center justify-between px-4 bg-[#0a0f18] sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white transition-colors">
                            <Menu className="w-5 h-5" />
                        </button>
                        
                        {activeTool && (
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <span className="cursor-pointer hover:text-white" onClick={() => setActiveTool(null)}>Dashboard</span>
                                <ChevronRight className="w-4 h-4" />
                                <span className="text-white font-medium">{allTools.find(t => t.id === activeTool)?.name}</span>
                            </div>
                        )}
                        {!activeTool && (
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input 
                                    type="text" 
                                    placeholder="Search calculators..." 
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="bg-[#0f172a] border border-slate-700 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-[#0AE340] w-64 transition-all"
                                />
                            </div>
                        )}
                    </div>
                    
                    <button 
                        onClick={() => setCopilotOpen(!copilotOpen)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${copilotOpen ? 'bg-[#0AE340]/10 border-[#0AE340]/30 text-[#0AE340]' : 'bg-[#0f172a] border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'}`}
                    >
                        <Bot className="w-4 h-4" />
                        AI Copilot
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                    {activeTool ? (
                        <div className="animate-fade-in-up">
                            {renderTool()}
                        </div>
                    ) : (
                        <div className="max-w-6xl mx-auto">
                            <div className="mb-10">
                                <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Engineering Workspace</h2>
                                <p className="text-slate-400">Select a calculator or tool to begin your design.</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredTools.map(tool => (
                                        <div 
                                            key={tool.id}
                                            className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 hover:border-[#334155] hover:bg-[#111928] cursor-pointer transition-all group flex flex-col animate-fade-in-up"
                                            onClick={() => setActiveTool(tool.id)}
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center group-hover:bg-[#0AE340]/10 group-hover:text-[#0AE340] border border-slate-800 transition-colors">
                                                    {categories.find(c => c.id === tool.category)?.icon || <Settings className="w-5 h-5" />}
                                                </div>
                                                {tool.status === 'popular' && <span className="text-[9px] uppercase tracking-wider bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">Popular</span>}
                                                {tool.status === 'new' && <span className="text-[9px] uppercase tracking-wider bg-[#0AE340]/10 text-[#0AE340] px-2 py-0.5 rounded border border-[#0AE340]/20">New</span>}
                                                {tool.status === 'beta' && <span className="text-[9px] uppercase tracking-wider bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">Beta</span>}
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-white">{tool.name}</h3>
                                            <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">{tool.desc}</p>
                                            <div className="flex items-center text-xs font-semibold text-slate-400 group-hover:text-[#0AE340] transition-colors">
                                                Open Tool <ChevronRight className="w-3 h-3 ml-1" />
                                            </div>
                                        </div>
                                    ))}
                                {filteredTools.length === 0 && (
                                    <div className="col-span-full py-12 text-center text-slate-500">
                                        No calculators found matching your query.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* AI Copilot Sidebar */}
            <div 
                className={`bg-[#0b111a] border-l border-slate-800 flex-shrink-0 flex flex-col z-20 transition-all duration-300 ${copilotOpen ? 'w-[320px] opacity-100' : 'w-0 opacity-0'}`}
                style={{ overflow: copilotOpen ? 'visible' : 'hidden' }}
            >
                <div className="w-[320px] h-full flex flex-col">
                    <div className="h-14 border-b border-slate-800 flex items-center justify-between px-4 bg-[#0a0f18]/80">
                        <div className="flex items-center gap-2">
                            <Bot className="w-5 h-5 text-[#0AE340]" />
                            <span className="font-bold text-sm tracking-wide">Engineering Copilot</span>
                        </div>
                        <button onClick={() => setCopilotOpen(false)} className="text-slate-500 hover:text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <AICopilot activeTool={activeTool} />
                    </div>
                </div>
            </div>
        </div>
    );
}
