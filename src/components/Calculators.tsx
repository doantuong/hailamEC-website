import React, { useState } from 'react';
import { Download } from 'lucide-react';

function VoltageDropTool({ lang }: { lang: 'vi' | 'en' }) {
  const [current, setCurrent] = useState<number>(100);
  const [length, setLength] = useState<number>(50);
  const [area, setArea] = useState<number>(35);
  const [voltage, setVoltage] = useState<number>(400);

  // Simple formula (Copper, 3-phase, cosphi=0.8 for example purposes. Real calculation is more complex)
  // v_drop = sqrt(3) * I * L * (R*cosPhi + X*sinPhi)
  // Simplified approx for copper standard: Vd = (sqrt(3) * I * L * 0.0225) / Area
  const vDrop = (Math.sqrt(3) * current * length * 0.0225) / area;
  const vDropPercent = (vDrop / voltage) * 100;

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200">
      <h3 className="text-xl font-bold mb-4">Voltage Drop Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">System Voltage (V)</label>
          <input type="number" value={voltage} onChange={e => setVoltage(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Load Current (A)</label>
          <input type="number" value={current} onChange={e => setCurrent(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cable Length (m)</label>
          <input type="number" value={length} onChange={e => setLength(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cable Cross-Section (mm²)</label>
          <input type="number" value={area} onChange={e => setArea(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
      </div>
      <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded">
        <div className="font-medium">Voltage Drop: <span className="font-bold text-[#D32F2F]">{vDrop.toFixed(2)} V</span></div>
        <div className="font-medium">Percentage: <span className={`font-bold ${vDropPercent > 5 ? 'text-red-500' : 'text-green-600'}`}>{vDropPercent.toFixed(2)} %</span></div>
        <p className="text-xs text-slate-500 mt-2">* Simplified calculation for copper cables (3-phase).</p>
      </div>
    </div>
  );
}

function AnalogScalingTool({ lang }: { lang: 'vi' | 'en' }) {
  const [rawMin, setRawMin] = useState<number>(4000);
  const [rawMax, setRawMax] = useState<number>(20000);
  const [euMin, setEuMin] = useState<number>(0);
  const [euMax, setEuMax] = useState<number>(100);
  const [rawVal, setRawVal] = useState<number>(12000);

  const scaledVal = ((rawVal - rawMin) / (rawMax - rawMin)) * (euMax - euMin) + euMin;

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200">
      <h3 className="text-xl font-bold mb-4">PLC Analog Scaling (Raw to EU)</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Raw Min</label>
          <input type="number" value={rawMin} onChange={e => setRawMin(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Raw Max</label>
          <input type="number" value={rawMax} onChange={e => setRawMax(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">EU Min</label>
          <input type="number" value={euMin} onChange={e => setEuMin(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">EU Max</label>
          <input type="number" value={euMax} onChange={e => setEuMax(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">Input Raw Value</label>
        <input type="number" value={rawVal} onChange={e => setRawVal(Number(e.target.value))} className="w-full p-2 border rounded bg-slate-50" />
      </div>
      <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded">
        <div className="font-medium">Scaled Value (EU): <span className="font-bold text-[#0AE340]">{scaledVal.toFixed(2)}</span></div>
      </div>
    </div>
  );
}

function MotorCurrentTool({ lang }: { lang: 'vi' | 'en' }) {
  const [powerKw, setPowerKw] = useState<number>(55);
  const [voltage, setVoltage] = useState<number>(400);
  const [efficiency, setEfficiency] = useState<number>(0.92);
  const [cosPhi, setCosPhi] = useState<number>(0.85);

  const ratedCurrent = (powerKw * 1000) / (Math.sqrt(3) * voltage * efficiency * cosPhi);

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200">
      <h3 className="text-xl font-bold mb-4">Motor Rated Current Calculator</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Motor Power (kW)</label>
          <input type="number" value={powerKw} onChange={e => setPowerKw(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Voltage (V)</label>
          <input type="number" value={voltage} onChange={e => setVoltage(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Efficiency (0.1 - 1)</label>
          <input type="number" step="0.01" value={efficiency} onChange={e => setEfficiency(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Power Factor (cos φ)</label>
          <input type="number" step="0.01" value={cosPhi} onChange={e => setCosPhi(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
      </div>
      <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded">
        <div className="font-medium">Calculated Full Load Current (FLA): <span className="font-bold text-[#D32F2F]">{ratedCurrent.toFixed(2)} A</span></div>
      </div>
    </div>
  );
}

export default function Calculators({ lang }: { lang: 'vi' | 'en' }) {
  const [activeTab, setActiveTab] = useState('voltage');

  return (
    <div className="max-w-5xl mx-auto my-12 px-4 shadow-sm pb-10 bg-white rounded-lg">
      <div className="mb-8 pt-8">
        <h2 className="text-3xl font-bold text-[#2F423B] mb-2 px-8">Engineering SaaS Tools</h2>
        <p className="text-slate-600 px-8">
          {lang === 'vi' 
            ? 'Các công cụ tính toán chạy trực tiếp trên trình duyệt. Website không lưu dữ liệu kỹ thuật của người dùng trên server.'
            : 'Calculation tools run directly in the browser. Client data is not stored on any server.'}
        </p>
      </div>

      <div className="flex border-b border-slate-200 mb-8 px-8 flex-wrap overflow-x-auto">
        <button 
          className={`whitespace-nowrap py-3 px-6 font-medium transition-colors border-b-2 ${activeTab === 'voltage' ? 'border-[#D32F2F] text-[#D32F2F]' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          onClick={() => setActiveTab('voltage')}
        >
          {lang === 'vi' ? 'Độ sụt áp (Voltage Drop)' : 'Voltage Drop'}
        </button>
        <button 
          className={`whitespace-nowrap py-3 px-6 font-medium transition-colors border-b-2 ${activeTab === 'scaling' ? 'border-[#D32F2F] text-[#D32F2F]' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          onClick={() => setActiveTab('scaling')}
        >
          {lang === 'vi' ? 'PLC Scaling (Analog)' : 'PLC Scaling'}
        </button>
        <button 
          className={`whitespace-nowrap py-3 px-6 font-medium transition-colors border-b-2 ${activeTab === 'motor' ? 'border-[#D32F2F] text-[#D32F2F]' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          onClick={() => setActiveTab('motor')}
        >
          {lang === 'vi' ? 'Dòng điện động cơ (Motor FLA)' : 'Motor FLA'}
        </button>
      </div>

      <div className="px-8">
        {activeTab === 'voltage' && <VoltageDropTool lang={lang} />}
        {activeTab === 'scaling' && <AnalogScalingTool lang={lang} />}
        {activeTab === 'motor' && <MotorCurrentTool lang={lang} />}
      </div>
    </div>
  );
}
