import React, { useState } from 'react';
import { Activity, ArrowRightLeft, Settings2 } from 'lucide-react';

export default function ScalingTool() {
    const [minRange, setMinRange] = useState(0);
    const [maxRange, setMaxRange] = useState(100);
    const [unit, setUnit] = useState('°C');
    const [inputValue, setInputValue] = useState('12');
    const [calcMode, setCalcMode] = useState<'mA_to_PV' | 'PV_to_mA'>('mA_to_PV');

    const compute = () => {
        const span = maxRange - minRange;
        const val = parseFloat(inputValue);
        if (isNaN(val)) return '---';

        if (calcMode === 'mA_to_PV') {
            // (mA - 4) / 16 * Span + Min
            if (val < 3.8 || val > 21) return 'FAULT';
            return (((val - 4) / 16) * span + minRange).toFixed(2);
        } else {
            // ((PV - Min) / Span) * 16 + 4
            return (((val - minRange) / span) * 16 + 4).toFixed(2);
        }
    };

    const result = compute();

    return (
        <div className="max-w-4xl mx-auto font-sans">
            <div className="mb-8 border-b border-slate-800 pb-6">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-[#0AE340]" />
                    4-20mA Signal Scaling
                </h2>
                <p className="text-sm text-slate-400">Convert raw analog instrument signals (mA) to Engineering Units (PV) and vice-versa.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-6 space-y-6">
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2"><Settings2 className="w-4 h-4" /> PLC / Instrument Range</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Min Value (LRV)</label>
                            <input type="number" value={minRange} onChange={e => setMinRange(Number(e.target.value))} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0AE340]" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Max Value (URV)</label>
                            <input type="number" value={maxRange} onChange={e => setMaxRange(Number(e.target.value))} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0AE340]" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Engineering Unit</label>
                        <input type="text" value={unit} onChange={e => setUnit(e.target.value)} className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0AE340]" />
                    </div>
                </div>

                <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-6">
                    <div className="flex bg-[#1e293b] rounded-lg p-1 border border-slate-700 mb-8">
                        <button 
                            onClick={() => { setCalcMode('mA_to_PV'); setInputValue('12'); }}
                            className={`flex-1 py-2 text-xs font-bold rounded uppercase tracking-wide flex items-center justify-center gap-2 ${calcMode === 'mA_to_PV' ? 'bg-[#0AE340]/10 text-[#0AE340] border border-[#0AE340]/30' : 'text-slate-400'}`}
                        >
                            mA <ArrowRightLeft className="w-3 h-3" /> PV
                        </button>
                        <button 
                            onClick={() => { setCalcMode('PV_to_mA'); setInputValue((maxRange/2).toString()); }}
                            className={`flex-1 py-2 text-xs font-bold rounded uppercase tracking-wide flex items-center justify-center gap-2 ${calcMode === 'PV_to_mA' ? 'bg-[#0AE340]/10 text-[#0AE340] border border-[#0AE340]/30' : 'text-slate-400'}`}
                        >
                            PV <ArrowRightLeft className="w-3 h-3" /> mA
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex-1">
                            <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase">{calcMode === 'mA_to_PV' ? 'Current Input (mA)' : `Process Input (${unit})`}</label>
                            <input type="number" step="0.1" value={inputValue} onChange={e => setInputValue(e.target.value)} className="w-full bg-transparent border-b-2 border-slate-700 px-2 py-2 text-3xl font-black text-white focus:outline-none focus:border-[#0AE340] text-center" />
                        </div>
                        <ArrowRightLeft className="w-6 h-6 text-slate-600 mt-6" />
                        <div className="flex-1 text-center">
                            <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase">Result {calcMode === 'mA_to_PV' ? `(${unit})` : '(mA)'}</label>
                            <div className="text-3xl font-black text-[#0AE340] mt-2 filter drop-shadow-[0_0_8px_rgba(10,227,64,0.4)]">
                                {result}
                            </div>
                        </div>
                    </div>
                    {result === 'FAULT' && (
                        <div className="text-center text-xs font-semibold text-red-500 bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                            WIRE BREAK OR SENSOR FAULT DETECTED (&lt; 3.8mA)
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
