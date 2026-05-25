import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Bell, Activity, Zap, Cpu, AlertTriangle, ShieldCheck, Database, RefreshCcw } from 'lucide-react';

const generateData = () => {
    return Array.from({ length: 20 }, (_, i) => ({
        time: `${10 + Math.floor(i/6)}:${(i%6)*10 < 10 ? '0'+(i%6)*10 : (i%6)*10}`,
        temp: 65 + Math.random() * 15,
        energy: 120 + Math.random() * 40,
        pressure: 4 + Math.random() * 1.5,
    }));
};

const staticData = generateData();

const DashboardDemo: React.FC = () => {
    const [data] = useState(staticData);
    const [activeTab, setActiveTab] = useState<'overview' | 'energy' | 'alarms'>('overview');
    
    const kpis = [
        { label: 'Overall Equipment Effectiveness (OEE)', value: '87.4%', status: 'optimal', icon: <Activity className="w-5 h-5 text-emerald-400" /> },
        { label: 'Real-time Energy Load (kW)', value: '142.8', status: 'warning', icon: <Zap className="w-5 h-5 text-amber-400" /> },
        { label: 'PLC Communication Status', value: 'ONLINE', status: 'optimal', icon: <Cpu className="w-5 h-5 text-emerald-400" /> },
        { label: 'Active Process Alarms', value: '2', status: 'critical', icon: <Bell className="w-5 h-5 text-red-500" /> },
    ];

    return (
        <div className="w-full bg-[#0a0f18] text-slate-200 p-6 rounded-xl border border-slate-800 shadow-2xl font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-[#0f172a] border border-[#1e293b] flex items-center justify-center">
                        <Database className="w-5 h-5 text-[#0AE340]" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-wide uppercase">HAILAMEC Industrial SCADA Hub</h3>
                        <p className="text-xs text-slate-500">Live IIoT Data Stream • Site: HCMC Plant 01</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="flex bg-[#0f172a] p-1 rounded-lg border border-slate-800">
                        <button onClick={() => setActiveTab('overview')} className={`px-4 py-1.5 text-xs font-bold rounded uppercase transition-colors ${activeTab === 'overview' ? 'bg-[#1e293b] text-white' : 'text-slate-500 hover:text-slate-300'}`}>Overview</button>
                        <button onClick={() => setActiveTab('energy')} className={`px-4 py-1.5 text-xs font-bold rounded uppercase transition-colors ${activeTab === 'energy' ? 'bg-[#1e293b] text-white' : 'text-slate-500 hover:text-slate-300'}`}>Energy</button>
                        <button onClick={() => setActiveTab('alarms')} className={`px-4 py-1.5 text-xs font-bold rounded uppercase transition-colors ${activeTab === 'alarms' ? 'bg-[#1e293b] text-white' : 'text-slate-500 hover:text-slate-300'}`}>Alarms</button>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        LIVE
                    </div>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {kpis.map((kpi, idx) => (
                    <div key={idx} className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl relative overflow-hidden group hover:border-[#1e293b] transition-all">
                        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                            {React.cloneElement(kpi.icon as React.ReactElement<any>, { className: 'w-24 h-24' })}
                        </div>
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{kpi.label}</span>
                            {kpi.icon}
                        </div>
                        <div className="relative z-10">
                            <span className={`text-3xl font-black ${
                                kpi.status === 'optimal' ? 'text-white' : 
                                kpi.status === 'warning' ? 'text-amber-400' : 'text-red-500'
                            }`}>{kpi.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area based on tabs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Chart Area - 2/3 width */}
                <div className="col-span-1 lg:col-span-2 bg-[#0f172a] border border-slate-800 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="font-bold text-sm text-slate-300 uppercase tracking-wide">
                            {activeTab === 'energy' ? 'Power Consumption Trend (kW)' : 'Process Temperature Drift (°C)'}
                        </h4>
                        <RefreshCcw className="w-4 h-4 text-slate-500 cursor-pointer hover:text-white transition-colors" />
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            {activeTab === 'energy' ? (
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="time" stroke="#475569" fontSize={11} tickMargin={10} />
                                    <YAxis stroke="#475569" fontSize={11} tickMargin={10} domain={['dataMin - 10', 'dataMax + 10']} />
                                    <RechartsTooltip 
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px' }}
                                        itemStyle={{ color: '#bae6fd' }}
                                    />
                                    <Area type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorEnergy)" />
                                </AreaChart>
                            ) : (
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="time" stroke="#475569" fontSize={11} tickMargin={10} />
                                    <YAxis stroke="#475569" fontSize={11} tickMargin={10} domain={[50, 90]} />
                                    <RechartsTooltip 
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px' }}
                                        itemStyle={{ color: '#f87171' }}
                                    />
                                    <Line type="monotone" dataKey="temp" stroke="#f87171" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#ef4444', stroke: '#0f172a', strokeWidth: 2 }} />
                                </LineChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sidebar Area - 1/3 width */}
                <div className="col-span-1 flex flex-col gap-6">
                    {/* Active Alarms */}
                    <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 flex-1 max-h-[190px] overflow-hidden flex flex-col">
                        <h4 className="font-bold text-sm text-slate-300 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            System Alarms
                        </h4>
                        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                            <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                <span className="w-2 h-2 mt-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0"></span>
                                <div>
                                    <p className="text-xs font-bold text-red-400">Pressure Drop Detected</p>
                                    <p className="text-[10px] text-slate-500 mt-1">Pump Station B • 10:24 AM</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                                <span className="w-2 h-2 mt-1.5 rounded-full bg-amber-400 flex-shrink-0"></span>
                                <div>
                                    <p className="text-xs font-bold text-amber-400">VFD High Temperature Warning</p>
                                    <p className="text-[10px] text-slate-500 mt-1">Cooling Tower 2 • 09:12 AM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Status / Network */}
                    <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 flex-1">
                        <h4 className="font-bold text-sm text-slate-300 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            Network Diagnostics
                        </h4>
                        <div className="space-y-4">
                           <div className="flex justify-between items-center text-xs">
                               <span className="text-slate-400">S7-1500 Main PLC</span>
                               <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded">1ms</span>
                           </div>
                           <div className="w-full bg-[#1e293b] rounded-full h-1">
                               <div className="bg-emerald-400 h-1 rounded-full" style={{ width: '100%' }}></div>
                           </div>
                           
                           <div className="flex justify-between items-center text-xs pt-2">
                               <span className="text-slate-400">Profinet I/O Gateway</span>
                               <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded">3ms</span>
                           </div>
                           <div className="w-full bg-[#1e293b] rounded-full h-1">
                               <div className="bg-emerald-400 h-1 rounded-full" style={{ width: '95%' }}></div>
                           </div>
                           
                           <div className="flex justify-between items-center text-xs pt-2">
                               <span className="text-slate-400">CEMS Remote Server</span>
                               <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded">84ms</span>
                           </div>
                           <div className="w-full bg-[#1e293b] rounded-full h-1">
                               <div className="bg-amber-400 h-1 rounded-full" style={{ width: '70%' }}></div>
                           </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardDemo;
