import React, { useState } from 'react';
import { Cpu, Server, ServerCrash, Share2, Calculator, CheckCircle } from 'lucide-react';

export default function PlcIoTool() {
    const [di, setDi] = useState(32);
    const [do_, setDo] = useState(16);
    const [ai, setAi] = useState(8);
    const [ao, setAo] = useState(4);
    const [spareMargin, setSpareMargin] = useState(20);

    const calcTotal = (val: number) => Math.ceil(val * (1 + spareMargin / 100));

    const totalDi = calcTotal(di);
    const totalDo = calcTotal(do_);
    const totalAi = calcTotal(ai);
    const totalAo = calcTotal(ao);

    // Assuming Siemens S7-1500 typical module density
    const diModules = Math.ceil(totalDi / 32);
    const doModules = Math.ceil(totalDo / 32);
    const aiModules = Math.ceil(totalAi / 8);
    const aoModules = Math.ceil(totalAo / 8);

    const totalModules = diModules + doModules + aiModules + aoModules;

    return (
        <div className="max-w-4xl mx-auto font-sans">
            <div className="mb-8 border-b border-slate-800 pb-6">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-[#0AE340]" />
                    PLC I/O & Architecture Estimator
                </h2>
                <p className="text-sm text-slate-400">Calculate required I/O modules, spare capacity, and recommended architecture for your automation project.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-6">
                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-6 border-b border-slate-800 pb-2">I/O Requirement (Base)</h3>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">DI (Digital In)</label>
                                <input type="number" value={di} onChange={e => setDi(Number(e.target.value))} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0AE340]" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">DO (Digital Out)</label>
                                <input type="number" value={do_} onChange={e => setDo(Number(e.target.value))} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0AE340]" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">AI (Analog In)</label>
                                <input type="number" value={ai} onChange={e => setAi(Number(e.target.value))} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0AE340]" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">AO (Analog Out)</label>
                                <input type="number" value={ao} onChange={e => setAo(Number(e.target.value))} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0AE340]" />
                            </div>
                        </div>

                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2 mt-6">Engineering Margin</h3>
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Spare Capacity (%)</label>
                            <input type="range" min="0" max="50" step="5" value={spareMargin} onChange={e => setSpareMargin(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                            <div className="text-right text-xs text-[#0AE340] font-bold mt-2">{spareMargin}% Spare</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-6">
                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-6 flex items-center justify-between">
                            Architecture Sizing
                            <Server className="w-4 h-4 text-slate-500" />
                        </h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center p-3 bg-[#1e293b] rounded-lg border border-slate-700">
                                <span className="text-sm text-slate-400 font-medium">DI Modules (32-ch)</span>
                                <span className="text-lg font-bold text-white">{diModules} <span className="text-xs text-slate-500 font-normal">({totalDi} pts)</span></span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-[#1e293b] rounded-lg border border-slate-700">
                                <span className="text-sm text-slate-400 font-medium">DO Modules (32-ch)</span>
                                <span className="text-lg font-bold text-white">{doModules} <span className="text-xs text-slate-500 font-normal">({totalDo} pts)</span></span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-[#1e293b] rounded-lg border border-slate-700">
                                <span className="text-sm text-slate-400 font-medium">AI Modules (8-ch)</span>
                                <span className="text-lg font-bold text-white">{aiModules} <span className="text-xs text-slate-500 font-normal">({totalAi} pts)</span></span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-[#1e293b] rounded-lg border border-slate-700">
                                <span className="text-sm text-slate-400 font-medium">AO Modules (8-ch)</span>
                                <span className="text-lg font-bold text-white">{aoModules} <span className="text-xs text-slate-500 font-normal">({totalAo} pts)</span></span>
                            </div>
                        </div>

                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <h4 className="flex items-center gap-2 font-bold text-blue-400 text-sm mb-2">
                                <Share2 className="w-4 h-4" /> Topology Recommendation
                            </h4>
                            <p className="text-xs text-blue-200/80 leading-relaxed">
                                Total {totalModules} modules required. 
                                {totalModules > 8 ? " Exceeds typical single-rack capacity. Recommend distributed I/O architecture (e.g., PROFINET/EtherCAT remote I/O nodes) to reduce wiring costs." : " Can be accommodated in a single centralized PLC rack."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Smart Lead Generation Section */}
            <div className="mt-8 bg-gradient-to-r from-[#0f172a] to-[#1e293b] rounded-xl border border-slate-700 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#0AE340]" /> Need a detailed engineering review?</h3>
                    <p className="text-sm text-slate-400 max-w-xl">Send this architecture to our automation experts. We provide free panel sizing, BOQ generation, and network topology diagrams within 24 hours.</p>
                </div>
                <div className="flex-shrink-0">
                    <button className="bg-[#0AE340] hover:bg-[#0AE340]/90 text-black font-bold px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(10,227,64,0.3)] transition-all flex items-center gap-2">
                        Get Proposal & BOQ
                    </button>
                </div>
            </div>
        </div>
    );
}
