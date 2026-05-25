import React, { useState } from 'react';
import { Zap, AlertTriangle, CheckCircle, Calculator } from 'lucide-react';

export default function VoltageDropTool() {
    const [material, setMaterial] = useState<'Cu' | 'Al'>('Cu');
    const [voltage, setVoltage] = useState(400); // 3-phase default
    const [phase, setPhase] = useState<1 | 3>(3);
    const [current, setCurrent] = useState(100); // Amps
    const [length, setLength] = useState(50); // meters
    const [size, setSize] = useState(35); // sq mm
    
    // Simplified resistivity values (ohm.mm2/m) at 20degC
    const rhoCu = 0.0175;
    const rhoAl = 0.0282;

    const rho = material === 'Cu' ? rhoCu : rhoAl;
    
    // Formula: VD = (K * I * rho * L) / A
    // K = 2 for 1-phase, sqrt(3) for 3-phase
    const K = phase === 1 ? 2 : 1.732;
    const voltageDrop = ((K * current * rho * length) / size).toFixed(2);
    const voltageDropPercent = ((parseFloat(voltageDrop) / voltage) * 100).toFixed(2);
    
    const percentage = parseFloat(voltageDropPercent);
    let status = 'optimal';
    if (percentage > 5) status = 'critical';
    else if (percentage > 3) status = 'warning';

    const getStatusColors = () => {
        if (status === 'critical') return 'text-red-500 bg-red-500/10 border-red-500/20';
        if (status === 'warning') return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
        return 'text-[#0AE340] bg-[#0AE340]/10 border-[#0AE340]/20';
    };

    return (
        <div className="max-w-4xl mx-auto font-sans">
            <div className="mb-8 border-b border-slate-800 pb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        <Zap className="w-6 h-6 text-[#0AE340]" />
                        Cable Voltage Drop Calculator
                    </h2>
                    <p className="text-sm text-slate-400">Calculate voltage drop for AC systems based on simplified resistivity (IEC Guidelines).</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-6">
                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-6 border-b border-slate-800 pb-2">System Parameters</h3>
                        
                        <div className="grid grid-cols-2 gap-6 mb-6">
                           <div>
                               <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">System Phase</label>
                               <div className="flex bg-[#1e293b] rounded-lg p-1 border border-slate-700">
                                   <button 
                                       onClick={() => { setPhase(1); setVoltage(230); }}
                                       className={`flex-1 py-1.5 text-xs font-bold rounded ${phase === 1 ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                                   >1-Phase AC</button>
                                   <button 
                                       onClick={() => { setPhase(3); setVoltage(400); }}
                                       className={`flex-1 py-1.5 text-xs font-bold rounded ${phase === 3 ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                                   >3-Phase AC</button>
                               </div>
                           </div>
                           <div>
                               <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">System Voltage (V)</label>
                               <input type="number" value={voltage} onChange={e => setVoltage(Number(e.target.value))} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0AE340]" />
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                           <div>
                               <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Load Current (A)</label>
                               <input type="number" value={current} onChange={e => setCurrent(Number(e.target.value))} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0AE340]" />
                           </div>
                           <div>
                               <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Cable Length (m)</label>
                               <input type="number" value={length} onChange={e => setLength(Number(e.target.value))} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0AE340]" />
                           </div>
                        </div>

                        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-6 border-b border-slate-800 pb-2 mt-8">Cable Parameters</h3>
                        <div className="grid grid-cols-2 gap-6">
                           <div>
                               <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Conductor Material</label>
                               <div className="flex bg-[#1e293b] rounded-lg p-1 border border-slate-700">
                                   <button 
                                       onClick={() => setMaterial('Cu')}
                                       className={`flex-1 py-1.5 text-xs font-bold rounded ${material === 'Cu' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' : 'text-slate-400 border border-transparent'}`}
                                   >Copper (Cu)</button>
                                   <button 
                                       onClick={() => setMaterial('Al')}
                                       className={`flex-1 py-1.5 text-xs font-bold rounded ${material === 'Al' ? 'bg-slate-300/20 text-slate-300 border border-slate-400/50' : 'text-slate-400 border border-transparent'}`}
                                   >Aluminum (Al)</button>
                               </div>
                           </div>
                           <div>
                               <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Cross-Section (mm²)</label>
                               <select value={size} onChange={e => setSize(Number(e.target.value))} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0AE340] appearance-none">
                                   {[1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300].map(s => (
                                       <option key={s} value={s}>{s} mm²</option>
                                   ))}
                               </select>
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
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Voltage Drop</p>
                            <div className="flex items-end gap-2">
                                <span className="text-5xl font-black text-white">{voltageDrop}</span>
                                <span className="text-xl font-bold text-slate-500 mb-1">V</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Percentage</p>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-black text-white">{voltageDropPercent}</span>
                                <span className="text-xl font-bold text-slate-500 mb-1">%</span>
                            </div>
                        </div>

                        <div className={`p-4 rounded-lg flex items-start gap-3 border ${getStatusColors()}`}>
                            {status === 'optimal' ? (
                                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                            ) : (
                                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                            )}
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-wide">
                                    {status === 'optimal' ? 'Acceptable' : status === 'warning' ? 'Marginal' : 'Non-Compliant'}
                                </h4>
                                <p className="text-xs mt-1 opacity-90 leading-relaxed">
                                    {status === 'optimal' && 'Voltage drop is within the 3% recommended limit for lighting and sensitive equipment.'}
                                    {status === 'warning' && 'Voltage drop exceeds 3%. Acceptable for motors (up to 5%), but verify equipment rating.'}
                                    {status === 'critical' && 'Voltage drop exceeds 5% limit. Increase cable size or reduce load/distance.'}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-800">
                             <h4 className="text-xs font-bold uppercase tracking-widest text-[#0AE340] mb-3">Next Steps</h4>
                             <button className="w-full bg-[#1e293b] hover:bg-slate-700 text-white text-sm font-semibold py-3 px-4 rounded-lg transition-colors border border-slate-700 hover:border-slate-500 mb-3">
                                  Generate PDF Report
                             </button>
                             <button className="w-full bg-[#0AE340]/10 hover:bg-[#0AE340]/20 text-[#0AE340] text-sm font-semibold py-3 px-4 rounded-lg transition-colors border border-[#0AE340]/30 hover:border-[#0AE340]/50">
                                  Request Engineering Verification
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
