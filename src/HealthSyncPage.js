import React, { useState } from 'react';

const WatchIcon = ({ size=24, color='#4ade80' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="7"/>
    <path d="M12 7v5l3 2"/>
    <path d="M8 2l1 2M16 2l-1 2M8 22l1-2M16 22l-1-2"/>
  </svg>
);
const StepsIcon = ({ size=22, color='#4ade80' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0"/><path d="m7 21 5-5"/><path d="m11 21 5-12"/><path d="M5 9a2 2 0 0 1 2-2h1l3 6-3 3H5"/>
  </svg>
);
const HeartIcon = ({ size=22, color='#f87171' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const SleepIcon = ({ size=22, color='#60a5fa' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const FireIcon = ({ size=22, color='#fbbf24' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);
const OxygenIcon = ({ size=22, color='#a78bfa' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/>
  </svg>
);
const StressIcon = ({ size=22, color='#4ade80' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M8 15s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);
const ImportIcon = ({ size=20, color='#4a5f4a' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const ChartIcon = ({ size=20, color='#4a5f4a' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const HistoryIcon = ({ size=20, color='#4a5f4a' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const HISTORY = [
  { date: '2026.05.14', steps: 8432, heart: 72, sleep: 7.2, calories: 450, oxygen: 98 },
  { date: '2026.05.13', steps: 6219, heart: 76, sleep: 6.8, calories: 380, oxygen: 97 },
  { date: '2026.05.12', steps: 10234, heart: 68, sleep: 8.1, calories: 520, oxygen: 99 },
  { date: '2026.05.11', steps: 4821, heart: 80, sleep: 5.9, calories: 290, oxygen: 96 },
];

const css = `
  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  @keyframes fillBar { from { width:0% } to { width:var(--w) } }
  .fade-up { animation: fadeUp 0.5s ease both; }
  .fade-up-1 { animation: fadeUp 0.5s ease 0.1s both; }
  .fade-up-2 { animation: fadeUp 0.5s ease 0.2s both; }
  .fade-up-3 { animation: fadeUp 0.5s ease 0.3s both; }
  .fade-up-4 { animation: fadeUp 0.5s ease 0.4s both; }
  .fade-up-5 { animation: fadeUp 0.5s ease 0.5s both; }
  .fade-up-6 { animation: fadeUp 0.5s ease 0.6s both; }
  .live-dot { width:6px; height:6px; background:#4ade80; border-radius:50%; animation:pulse 1.5s infinite; display:inline-block; }
  .metric-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:18px; padding:16px; cursor:pointer; transition:all 0.2s ease; }
  .metric-card:hover { border-color:rgba(74,222,128,0.3); transform:translateY(-2px); }
  .tab-btn { flex:1; padding:10px 6px; border-radius:12px; border:1px solid rgba(255,255,255,0.06); background:transparent; color:#4a5f4a; font-size:11px; cursor:pointer; font-family:'DM Sans',sans-serif; text-align:center; transition:all 0.25s ease; display:flex; flex-direction:column; align-items:center; gap:5px; }
  .tab-btn.active { background:rgba(74,222,128,0.12); border-color:rgba(74,222,128,0.35); color:#4ade80; font-weight:600; }
  .sync-btn { width:100%; padding:16px; background:linear-gradient(135deg,#4ade80,#22c55e); border:none; border-radius:16px; color:#0a1f0a; font-size:15px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; display:flex; align-items:center; justify-content:center; gap:10px; transition:transform 0.2s, box-shadow 0.2s; }
  .sync-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(74,222,128,0.25); }
  .input-field { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:10px 12px; color:#e8f0e8; font-size:15px; font-family:'DM Sans',sans-serif; outline:none; transition:border-color 0.2s; }
  .input-field:focus { border-color:rgba(74,222,128,0.4); }
  .bar-fill { height:100%; border-radius:100px; animation:fillBar 1.2s ease both; }
  .hist-card { background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:14px; padding:14px 16px; margin-bottom:10px; transition:all 0.2s; }
  .hist-card:hover { border-color:rgba(74,222,128,0.2); background:rgba(74,222,128,0.03); }
`;

export default function HealthSyncPage({ onBack }) {
  const [activeTab, setActiveTab] = useState('import');
  const [steps, setSteps] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [sleep, setSleep] = useState('');
  const [calories, setCalories] = useState('');
  const [oxygen, setOxygen] = useState('');
  const [stress, setStress] = useState('');
  const [synced, setSynced] = useState(false);
  const [syncedData, setSyncedData] = useState(null);

  const handleSync = () => {
    if (!steps && !heartRate && !sleep && !calories) return alert('Please enter at least one metric!');
    setSyncedData({ steps, heartRate, sleep, calories, oxygen, stress });
    setSynced(true);
    setActiveTab('summary');
  };

  const getStatus = (type, val) => {
    const v = parseFloat(val);
    if (type === 'steps') return v >= 10000 ? { text: 'Goal reached!', color: '#4ade80' } : { text: `${(10000-v).toLocaleString()} to goal`, color: v >= 7000 ? '#fbbf24' : '#f87171' };
    if (type === 'heart') return v >= 60 && v <= 100 ? { text: 'Normal range', color: '#4ade80' } : { text: 'Check with doctor', color: '#f87171' };
    if (type === 'sleep') return v >= 7 ? { text: 'Great sleep', color: '#4ade80' } : { text: v >= 6 ? 'Slightly low' : 'Need more sleep', color: v >= 6 ? '#fbbf24' : '#f87171' };
    if (type === 'oxygen') return v >= 95 ? { text: 'Normal', color: '#4ade80' } : { text: 'See a doctor', color: '#f87171' };
    if (type === 'calories') return v >= 300 ? { text: 'Active day', color: '#4ade80' } : { text: 'Move more', color: '#fbbf24' };
    if (type === 'stress') return v <= 3 ? { text: 'Low stress', color: '#4ade80' } : { text: v <= 6 ? 'Moderate' : 'High stress', color: v <= 6 ? '#fbbf24' : '#f87171' };
    return { text: '', color: '#4ade80' };
  };

  const INPUTS = [
    { icon: <StepsIcon />, label: 'Steps Today', val: steps, setter: setSteps, placeholder: 'e.g. 8432', unit: 'steps', type: 'steps' },
    { icon: <HeartIcon />, label: 'Heart Rate', val: heartRate, setter: setHeartRate, placeholder: 'e.g. 72', unit: 'bpm', type: 'heart' },
    { icon: <SleepIcon />, label: 'Sleep Duration', val: sleep, setter: setSleep, placeholder: 'e.g. 7.5', unit: 'hrs', type: 'sleep' },
    { icon: <FireIcon />, label: 'Calories Burned', val: calories, setter: setCalories, placeholder: 'e.g. 450', unit: 'kcal', type: 'calories' },
    { icon: <OxygenIcon />, label: 'Blood Oxygen', val: oxygen, setter: setOxygen, placeholder: 'e.g. 98', unit: '%', type: 'oxygen' },
    { icon: <StressIcon />, label: 'Stress Level', val: stress, setter: setStress, placeholder: '1-10', unit: '/10', type: 'stress' },
  ];

  const SUMMARY_ITEMS = syncedData ? [
    syncedData.steps && { icon: <StepsIcon color="#4ade80" />, val: parseInt(syncedData.steps).toLocaleString(), label: 'Steps', status: getStatus('steps', syncedData.steps) },
    syncedData.heartRate && { icon: <HeartIcon color="#f87171" />, val: syncedData.heartRate + ' bpm', label: 'Heart Rate', status: getStatus('heart', syncedData.heartRate) },
    syncedData.sleep && { icon: <SleepIcon color="#60a5fa" />, val: syncedData.sleep + ' hrs', label: 'Sleep', status: getStatus('sleep', syncedData.sleep) },
    syncedData.calories && { icon: <FireIcon color="#fbbf24" />, val: syncedData.calories + ' kcal', label: 'Calories', status: getStatus('calories', syncedData.calories) },
    syncedData.oxygen && { icon: <OxygenIcon color="#a78bfa" />, val: syncedData.oxygen + '%', label: 'Blood Oxygen', status: getStatus('oxygen', syncedData.oxygen) },
    syncedData.stress && { icon: <StressIcon color="#4ade80" />, val: syncedData.stress + '/10', label: 'Stress', status: getStatus('stress', syncedData.stress) },
  ].filter(Boolean) : [];

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap'); ${css}`}</style>
      <div style={{ fontFamily: "'DM Sans',sans-serif", width: '100%', minHeight: '100vh', background: '#060d06', color: '#e8f0e8', paddingBottom: '80px' }}>

        {/* Header */}
        <div className="fade-up" style={{ padding: '40px 24px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div onClick={onBack} style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4ade80', flexShrink: 0 }}>←</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <WatchIcon size={16} />
            </div>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#f0faf0' }}>Health Sync</span>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', padding: '4px 12px', borderRadius: '100px', fontSize: '11px', color: '#4ade80' }}>
            <div className="live-dot" /> Live
          </div>
        </div>

        {/* Apple Health Card */}
        <div className="fade-up-1" style={{ margin: '0 24px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <WatchIcon size={26} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '15px', fontWeight: '600', color: '#f0faf0', marginBottom: '3px' }}>Apple Health</div>
            <div style={{ fontSize: '12px', color: '#6b7f6b' }}>Last synced 2 mins ago</div>
          </div>
          <div style={{ fontSize: '11px', color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', padding: '4px 10px', borderRadius: '100px', flexShrink: 0 }}>● Connected</div>
        </div>

        {/* Tabs */}
        <div className="fade-up-2" style={{ display: 'flex', gap: '8px', padding: '0 24px 20px' }}>
          <button className={`tab-btn ${activeTab === 'import' ? 'active' : ''}`} onClick={() => setActiveTab('import')}>
            <ImportIcon color={activeTab === 'import' ? '#4ade80' : '#4a5f4a'} />
            Import
          </button>
          <button className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => setActiveTab('summary')}>
            <ChartIcon color={activeTab === 'summary' ? '#4ade80' : '#4a5f4a'} />
            Summary
          </button>
          <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
            <HistoryIcon color={activeTab === 'history' ? '#4ade80' : '#4a5f4a'} />
            History
          </button>
        </div>

        {/* IMPORT TAB */}
        {activeTab === 'import' && (
          <div style={{ padding: '0 24px' }}>
            <div className="fade-up-3" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4ade80', fontWeight: '600', marginBottom: '12px' }}>✦ Enter Today's Health Data</div>
            <div className="fade-up-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '16px', marginBottom: '16px' }}>
              {INPUTS.map(({ icon, label, val, setter, placeholder, unit }, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: i === INPUTS.length - 1 ? 0 : '14px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', color: '#6b7f6b', marginBottom: '5px' }}>{label}</div>
                    <input className="input-field" type="number" placeholder={placeholder} value={val} onChange={e => setter(e.target.value)} />
                  </div>
                  <div style={{ fontSize: '12px', color: '#4a5f4a', flexShrink: 0, width: '28px' }}>{unit}</div>
                </div>
              ))}
            </div>
            <button className="sync-btn fade-up-4" onClick={handleSync}>
              <WatchIcon size={20} color="#0a1f0a" />
              Sync to Healthio →
            </button>
          </div>
        )}

        {/* SUMMARY TAB */}
        {activeTab === 'summary' && (
          <div style={{ padding: '0 24px' }}>
            {synced && syncedData ? (<>
              <div className="fade-up" style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: '16px', padding: '16px', textAlign: 'center', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', background: 'rgba(74,222,128,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#4ade80', marginBottom: '4px' }}>Health data synced!</div>
                <div style={{ fontSize: '12px', color: '#4a5f4a' }}>Profile & Progress pages updated</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                {SUMMARY_ITEMS.map(({ icon, val, label, status }, i) => (
                  <div key={label} className={`metric-card fade-up-${Math.min(i+1,6)}`}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>{icon}</div>
                    <div style={{ fontSize: '20px', fontWeight: '600', color: '#f0faf0' }}>{val}</div>
                    <div style={{ fontSize: '11px', color: '#4a5f4a', marginTop: '2px' }}>{label}</div>
                    <div style={{ fontSize: '11px', color: status.color, marginTop: '6px' }}>{status.text}</div>
                  </div>
                ))}
              </div>

              <div className="fade-up-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#c8e6c8', marginBottom: '14px' }}>Daily Goals</div>
                {[
                  syncedData.steps && ['Steps', Math.min((parseInt(syncedData.steps)/10000)*100, 100), 'linear-gradient(90deg,#4ade80,#22c55e)'],
                  syncedData.calories && ['Calories', Math.min((parseInt(syncedData.calories)/500)*100, 100), 'linear-gradient(90deg,#fbbf24,#f59e0b)'],
                  syncedData.sleep && ['Sleep', Math.min((parseFloat(syncedData.sleep)/8)*100, 100), 'linear-gradient(90deg,#60a5fa,#3b82f6)'],
                  syncedData.oxygen && ['Blood Oxygen', Math.min(parseInt(syncedData.oxygen), 100), 'linear-gradient(90deg,#a78bfa,#8b5cf6)'],
                ].filter(Boolean).map(([label, pct, gradient]) => (
                  <div key={label} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                      <span style={{ color: '#8fa88f' }}>{label}</span>
                      <span style={{ color: '#4ade80', fontWeight: '500' }}>{Math.round(pct)}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.07)', borderRadius: '100px', overflow: 'hidden' }}>
                      <div className="bar-fill" style={{ '--w': `${pct}%`, background: gradient }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="fade-up-6" style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '16px', padding: '16px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4ade80', fontWeight: '600', marginBottom: '10px' }}>AI Health Insight</div>
                <div style={{ fontSize: '13px', color: '#8fa88f', lineHeight: 1.7 }}>
                  {parseInt(syncedData.steps) >= 8000 ? 'Great step count today! ' : 'Try to walk more today. '}
                  {parseFloat(syncedData.sleep) >= 7 ? 'Excellent sleep duration. ' : 'Aim for 7-8 hours of sleep. '}
                  {parseInt(syncedData.stress) >= 7 ? 'High stress — try deep breathing.' : 'Stress levels look manageable.'}
                </div>
              </div>
            </>) : (
              <div style={{ textAlign: 'center', padding: '60px 24px', color: '#4a5f4a' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <WatchIcon size={28} color="#4a5f4a" />
                </div>
                <div style={{ fontSize: '15px', color: '#6b7f6b', marginBottom: '8px' }}>No data synced yet</div>
                <div style={{ fontSize: '13px' }}>Go to Import tab to enter your health data</div>
              </div>
            )}
          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <div style={{ padding: '0 24px' }}>
            <div className="fade-up" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4ade80', fontWeight: '600', marginBottom: '12px' }}>✦ Past Records</div>
            {HISTORY.map((h, i) => (
              <div key={i} className={`hist-card fade-up-${i+1}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#4ade80' }}>{h.date}</div>
                  <div style={{ fontSize: '11px', color: h.steps >= 8000 ? '#4ade80' : '#fbbf24', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points={h.steps >= 8000 ? "20 6 9 17 4 12" : "18 6 6 18M6 6l12 12"}/></svg>
                    {h.steps >= 8000 ? 'Active day' : 'Low activity'}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {[
                    [<StepsIcon size={16} color="#4ade80" />, h.steps.toLocaleString(), 'steps'],
                    [<HeartIcon size={16} color="#f87171" />, h.heart + ' bpm', 'heart'],
                    [<SleepIcon size={16} color="#60a5fa" />, h.sleep + ' hrs', 'sleep'],
                  ].map(([icon, val, label]) => (
                    <div key={label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '8px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>{icon}</div>
                      <div style={{ fontSize: '12px', fontWeight: '500', color: '#c8e6c8' }}>{val}</div>
                      <div style={{ fontSize: '10px', color: '#4a5f4a' }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
