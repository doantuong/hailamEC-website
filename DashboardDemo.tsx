import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Bell, Activity, Zap, Cpu, AlertTriangle, ShieldCheck, Database, RefreshCcw, Users, Mail, Phone, Calendar, ClipboardList, Filter } from 'lucide-react';

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
    const [mainTab, setMainTab] = useState<'scada' | 'crm'>('crm');
    const [scadaTab, setScadaTab] = useState<'overview' | 'energy' | 'alarms'>('overview');
    const [leads, setLeads] = useState<any[]>([]);
    const [loadingLeads, setLoadingLeads] = useState(false);

    useEffect(() => {
        if (mainTab === 'crm') {
            fetchLeads();
        }
    }, [mainTab]);

    const fetchLeads = async () => {
        setLoadingLeads(true);
        try {
            const res = await fetch('/api/leads');
            const data = await res.json();
            setLeads(data);
        } catch (e) {
            console.error('Failed to fetch leads', e);
        } finally {
            setLoadingLeads(false);
        }
    };
    
    const kpis = [
        { label: 'Overall Equipment Effectiveness', value: '87.4%', status: 'optimal', icon: <Activity className="w-5 h-5 text-emerald-400" /> },
        { label: 'Real-time Energy Load (kW)', value: '142.8', status: 'warning', icon: <Zap className="w-5 h-5 text-amber-400" /> },
        { label: 'PLC Communication Status', value: 'ONLINE', status: 'optimal', icon: <Cpu className="w-5 h-5 text-emerald-400" /> },
        { label: 'Active Process Alarms', value: '2', status: 'critical', icon: <Bell className="w-5 h-5 text-red-500" /> },
    ];

    const crmKpis = [
        { label: 'Total Capture Inquiries', value: leads.length.toString(), icon: <Users className="w-5 h-5 text-blue-400" /> },
        { label: 'Pending Quotes', value: leads.filter(l => l.status === 'New').length.toString(), icon: <ClipboardList className="w-5 h-5 text-amber-400" /> },
        { label: 'Email Notifications Status', value: 'ACTIVE', icon: <Mail className="w-5 h-5 text-emerald-400" /> },
        { label: 'AI Chat Conversations', value: leads.filter(l => l.chatHistory && l.chatHistory.length > 0).length.toString(), icon: <Database className="w-5 h-5 text-purple-400" /> },
    ];

    const renderCRM = () => (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {crmKpis.map((kpi, idx) => (
                    <div key={idx} className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl flex flex-col justify-between hover:border-slate-600 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{kpi.label}</span>
                            {kpi.icon}
                        </div>
                        <span className="text-3xl font-black text-white">{kpi.value}</span>
                    </div>
                ))}
            </div>

            <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#1e293b]/30">
                    <h4 className="font-bold text-sm text-slate-300 uppercase tracking-wide flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-blue-400" />
                        Inquiry Management (Engineering SaaS)
                    </h4>
                    <button onClick={fetchLeads} className="px-3 py-1.5 text-xs bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition flex items-center gap-2">
                        <RefreshCcw className="w-3 h-3" /> Refresh
                    </button>
                </div>
                <div className="overflow-x-auto">
                    {loadingLeads ? (
                        <div className="p-8 text-center text-slate-500 animate-pulse">Syncing leads...</div>
                    ) : leads.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">No customer inquiries found.</div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#1e293b]/50 text-[10px] uppercase tracking-wider text-slate-400">
                                    <th className="p-3 pl-5 border-b border-slate-800 font-semibold">Date</th>
                                    <th className="p-3 border-b border-slate-800 font-semibold">Client</th>
                                    <th className="p-3 border-b border-slate-800 font-semibold">Contact</th>
                                    <th className="p-3 border-b border-slate-800 font-semibold">Service Requirement</th>
                                    <th className="p-3 border-b border-slate-800 font-semibold">AI Lead Score</th>
                                    <th className="p-3 pr-5 border-b border-slate-800 font-semibold text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs text-slate-300 divide-y divide-slate-800">
                                {leads.map((lead: any) => (
                                    <React.Fragment key={lead.id}>
                                        <tr className="hover:bg-slate-800/30 transition-colors group">
                                            <td className="p-3 pl-5 align-top whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(lead.createdAt).toLocaleDateString()}
                                                </div>
                                                <div className="text-[10px] text-slate-500 ml-5 mt-0.5">
                                                    {new Date(lead.createdAt).toLocaleTimeString()}
                                                </div>
                                            </td>
                                            <td className="p-3 align-top">
                                                <div className="font-bold text-white mb-0.5">{lead.name}</div>
                                                <div className="text-[10px] bg-slate-800 inline-block px-1.5 py-0.5 rounded text-slate-400">
                                                    {lead.company || 'Individual'}
                                                </div>
                                            </td>
                                            <td className="p-3 align-top text-slate-400 space-y-1">
                                                <div className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {lead.email}</div>
                                                {lead.phone && <div className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {lead.phone}</div>}
                                            </td>
                                            <td className="p-3 align-top">
                                                <div className="font-semibold text-amber-100 mb-1">{lead.service || lead.requirement}</div>
                                                {lead.notes && (
                                                    <p className="text-[11px] text-slate-500 italic max-w-[200px] truncate group-hover:whitespace-normal group-hover:truncate-none transition-all">"{lead.notes}"</p>
                                                )}
                                            </td>
                                            <td className="p-3 align-top text-center w-24">
                                                <div className={`text-base font-black ${lead.leadScore > 75 ? 'text-emerald-400' : lead.leadScore > 50 ? 'text-amber-400' : 'text-slate-400'}`}>
                                                    {lead.leadScore || 50}
                                                </div>
                                                <div className="w-full bg-[#1e293b] rounded-full h-1 mt-1 overflow-hidden">
                                                    <div className="bg-emerald-400 h-full" style={{ width: `${Math.min(100, lead.leadScore || 50)}%`}}></div>
                                                </div>
                                            </td>
                                            <td className="p-3 pr-5 align-top text-right">
                                                <span className={`inline-block px-2 py-1 text-[10px] font-bold rounded uppercase ${
                                                    lead.status === 'New' ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20' : 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                                                }`}>
                                                    {lead.status || 'New'}
                                                </span>
                                            </td>
                                        </tr>
                                        {lead.chatHistory && lead.chatHistory.length > 0 && (
                                            <tr className="bg-[#0f172a] border-b-4 border-slate-900 hidden group-hover:table-row">
                                                <td colSpan={6} className="p-4 pl-10 bg-slate-900/50">
                                                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2 flex items-center gap-2 px-2 border-l-2 border-purple-500">
                                                        <Database className="w-3 h-3 text-purple-400" />
                                                        AI Conversation Log
                                                    </div>
                                                    <div className="max-h-48 overflow-y-auto space-y-2 pr-2 text-[11px] custom-scrollbar bg-[#0a0f18] rounded-lg p-3">
                                                        {lead.chatHistory.map((msg: any, i: number) => (
                                                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                                <div className={`max-w-[80%] rounded px-3 py-1.5 ${msg.role === 'user' ? 'bg-blue-600/20 text-blue-100 border border-blue-500/20' : 'bg-slate-800 text-slate-300 border border-slate-700'}`}>
                                                                    {msg.text}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full bg-[#0a0f18] text-slate-200 p-6 rounded-xl border border-slate-800 shadow-2xl font-sans" style={{ minHeight: '600px' }}>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-[#0f172a] border border-[#1e293b] flex items-center justify-center">
                        <Database className="w-5 h-5 text-[#0AE340]" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-wide uppercase">HAILAMEC Platform</h3>
                        <p className="text-xs text-slate-500">Engineering SaaS & Operations Control Panel</p>
                    </div>
                </div>
                <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <div className="flex bg-[#0f172a] p-1 rounded-lg border border-slate-800">
                        <button onClick={() => setMainTab('scada')} className={`px-5 py-1.5 text-[11px] font-bold rounded tracking-wide uppercase transition-colors ${mainTab === 'scada' ? 'bg-[#1e293b] text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}>SCADA / IIoT</button>
                        <button onClick={() => setMainTab('crm')} className={`px-5 py-1.5 text-[11px] font-bold rounded tracking-wide uppercase transition-colors ${mainTab === 'crm' ? 'bg-blue-600/20 text-blue-400 shadow shadow-blue-900/20' : 'text-slate-500 hover:text-slate-300'}`}>CRM / Leads Dashboard</button>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        LIVE
                    </div>
                </div>
            </div>

            {mainTab === 'scada' && (
                <>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex bg-[#0f172a] p-1 rounded-lg border border-slate-800">
                            <button onClick={() => setScadaTab('overview')} className={`px-4 py-1.5 text-[10px] font-bold rounded uppercase transition-colors ${scadaTab === 'overview' ? 'bg-[#1e293b] text-white' : 'text-slate-500 hover:text-slate-300'}`}>Overview</button>
                            <button onClick={() => setScadaTab('energy')} className={`px-4 py-1.5 text-[10px] font-bold rounded uppercase transition-colors ${scadaTab === 'energy' ? 'bg-[#1e293b] text-white' : 'text-slate-500 hover:text-slate-300'}`}>Energy Trend</button>
                            <button onClick={() => setScadaTab('alarms')} className={`px-4 py-1.5 text-[10px] font-bold rounded uppercase transition-colors ${scadaTab === 'alarms' ? 'bg-[#1e293b] text-white' : 'text-slate-500 hover:text-slate-300'}`}>Alarms Log</button>
                        </div>
                    </div>
                    {/* SCADA View Content */}
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
                    {/* Charts etc remain similarly mapped */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="col-span-1 lg:col-span-2 bg-[#0f172a] border border-slate-800 rounded-xl p-5">
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    {scadaTab === 'energy' ? (
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
                                            <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px' }} />
                                            <Area type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorEnergy)" />
                                        </AreaChart>
                                    ) : (
                                        <LineChart data={data}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                            <XAxis dataKey="time" stroke="#475569" fontSize={11} tickMargin={10} />
                                            <YAxis stroke="#475569" fontSize={11} tickMargin={10} domain={[50, 90]} />
                                            <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px' }} />
                                            <Line type="monotone" dataKey="temp" stroke="#f87171" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#ef4444', stroke: '#0f172a', strokeWidth: 2 }} />
                                        </LineChart>
                                    )}
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col gap-6">
                            {/* Alarms Box */}
                            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 flex-1 max-h-[190px] overflow-hidden flex flex-col">
                                <h4 className="font-bold text-[11px] text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-red-500" />
                                    System Alarms
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                        <span className="w-2 h-2 mt-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0"></span>
                                        <div>
                                            <p className="text-[11px] font-bold text-red-400">Pressure Drop Detected</p>
                                            <p className="text-[10px] text-slate-500 mt-0.5">Pump Station B • 10:24 AM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {mainTab === 'crm' && renderCRM()}
            
        </div>
    );
};

export default DashboardDemo;
