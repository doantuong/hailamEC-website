import React, { useState } from 'react';
import { Zap, Activity, CheckCircle, Calculator, ShieldAlert } from 'lucide-react';

export default function MotorCurrentTool() {
    const [powerKw, setPowerKw] = useState(75);
    const [voltage, setVoltage] = useState(400); // 3-phase default
    const [powerFactor, setPowerFactor] = useState(0.85);
    const [efficiency, setEfficiency] = useState(0.92);

    // Formula: I = P / (V * sqrt(3) * pf * eff) for 3-phase
    const current = (powerKw * 1000) / (voltage * 1.732 * powerFactor * efficiency);
    const fla = current.toFixed(2);
    
    // Recommended breaker (typically 1.25 to 2.5 times FLA depending on start method)
    const breakerMin = Math.ceil(current * 1.25);
    const breakerMax = Math.ceil(current * 2.5);

    return (
        <div className="max-w-4xl mx-auto font-sans">
            <div className="mb-8 border-b border-slate-800 pb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        <Zap className="w-6 h-6 text-[#0AE340]" />
                        Motor Current Calculator (FLA)
                    </h2>
                    <p className="text-sm text-slate-400">Calculate 3-phase AC motor full load amperage (FLA) and recommended breaker sizing (IEC standards).</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-6">
                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-6 border-b border-slate-800 pb-2">Motor Parameters</h3>
                        
                        <div className="grid grid-cols-2 gap-6 mb-6">
                           <div>
                               <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Rated Power (kW)</label>
                               <input type="number" step="0.1" value={powerKw} onChange={e => setPowerKw(Number(e.target.value))} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0AE340]" />
                           </div>
                           <div>
                               <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">System Voltage (V)</label>
                               <input type="number" value={voltage} onChange={e => setVoltage(Number(e.target.value))} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0AE340]" />
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                           <div>
                               <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Power Factor (pf)</label>
                               <input type="number" step="0.01" min="0" max="1" value={powerFactor} onChange={e => setPowerFactor(Number(e.target.value))} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0AE340]" />
                           </div>
                           <div>
                               <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Efficiency (η)</label>
                               <input type="number" step="0.01" min="0" max="1" value={efficiency} onChange={e => setEfficiency(Number(e.target.value))} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0AE340]" />
                           </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-6 relative overflow-hidden">
                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-6 flex items-center justify-between">
                            Analysis Result
                            <Calculator className="w-4 h-4 text-slate-500" />
                        </h3>
                        
                        <div className="mb-8">
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Full Load Amperage (FLA)</p>
                            <div className="flex items-end gap-2">
                                <span className="text-5xl font-black text-white">{fla}</span>
                                <span className="text-xl font-bold text-slate-500 mb-1">A</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg flex items-start gap-3 border text-amber-400 bg-amber-400/10 border-amber-400/20">
                            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-wide">Recommended Breaker</h4>
                                <p className="text-xs mt-1 opacity-90 leading-relaxed font-mono font-bold">
                                    {breakerMin}A - {breakerMax}A
                                </p>
                                <p className="text-[10px] mt-1 opacity-70 leading-relaxed">
                                    Based on starting method (e.g. DOL, Star-Delta, VFD). For precise selection, please initiate an engineering review.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-800">
                             <h4 className="text-xs font-bold uppercase tracking-widest text-[#0AE340] mb-3">Next Steps</h4>
                             <button className="w-full bg-[#1e293b] hover:bg-slate-700 text-white text-sm font-semibold py-3 px-4 rounded-lg transition-colors border border-slate-700 hover:border-slate-500 mb-3">
                                  Generate PDF Component List
                             </button>
                             <button className="w-full bg-[#0AE340]/10 hover:bg-[#0AE340]/20 text-[#0AE340] text-sm font-semibold py-3 px-4 rounded-lg transition-colors border border-[#0AE340]/30 hover:border-[#0AE340]/50">
                                  Request Sizing Review
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
