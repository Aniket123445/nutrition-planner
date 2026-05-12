import React, { useState, useEffect } from 'react';

const s = {
  app: { fontFamily: "'DM Sans', sans-serif", maxWidth: '420px', margin: '0 auto', minHeight: '100vh', background: '#0d130d', color: '#e8f0e8', paddingBottom: '40px', position: 'relative', overflowX: 'hidden' },
  orb: { position: 'absolute', width: '280px', height: '280px', background: 'radial-gradient(circle,rgba(34,197,94,0.1) 0%,transparent 70%)', borderRadius: '50%', top: '-60px', right: '-80px', pointerEvents: 'none' },
  header: { padding: '40px 24px 20px', display: 'flex', alignItems: 'center', gap: '12px' },
  backBtn: { width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', color: '#e8f0e8' },
  headerTitle: { fontSize: '18px', fontWeight: '600', color: '#f0faf0' },
  avatarSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 24px 28px' },
  avatarRing: { width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg,#4ade80,#22c55e)', padding: '2px', marginBottom: '14px' },
  avatarInner: { width: '100%', height: '100%', borderRadius: '50%', background: '#1a2e1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' },
  avatarName: { fontSize: '20px', fontWeight: '600', color: '#f0faf0', marginBottom: '4px' },
  avatarTag: { fontSize: '12px', color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', padding: '4px 12px', borderRadius: '100px' },
  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', padding: '0 24px 24px' },
  statCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '14px 10px', textAlign: 'center' },
  statVal: { fontSize: '22px', fontWeight: '600', color: '#4ade80' },
  statLabel: { fontSize: '11px', color: '#4a5f4a', marginTop: '3px' },
  section: { padding: '0 24px 20px' },
  sectionLabel: { fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4ade80', fontWeight: '600', marginBottom: '12px' },
  inputGroup: { marginBottom: '12px' },
  inputLabel: { fontSize: '12px', color: '#6b7f6b', marginBottom: '6px', display: 'block' },
  inputField: { width: '100%', padding: '13px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', color: '#e8f0e8', fontSize: '14px', fontFamily: "'DM Sans',sans-serif", outline: 'none' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  goalGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' },
  goalBtn: (active) => ({ padding: '12px 10px', background: active ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${active ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '14px', color: active ? '#4ade80' : '#6b7f6b', fontSize: '13px', fontFamily: "'DM Sans',sans-serif", cursor: 'pointer', textAlign: 'center' }),
  chipRow: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  chip: (active) => ({ padding: '8px 14px', background: active ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${active ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '100px', fontSize: '12px', color: active ? '#4ade80' : '#6b7f6b', cursor: 'pointer' }),

  watchCard: { margin: '0 24px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '20px', padding: '16px', overflow: 'hidden', position: 'relative' },
  watchHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  watchTitle: { fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4ade80', fontWeight: '600' },
  liveDot: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#4ade80' },
  dot: { width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%', animation: 'pulse 1.5s infinite' },
  watchGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  watchMetric: { background: 'rgba(255,255,255,0.03)', borderRadius: '14px', padding: '14px 12px' },
  watchIcon: { fontSize: '18px', marginBottom: '6px' },
  watchVal: { fontSize: '22px', fontWeight: '600', color: '#f0faf0' },
  watchUnit: { fontSize: '11px', color: '#4a5f4a', marginTop: '2px' },
  heartBar: { marginTop: '14px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '14px' },
  heartBarTitle: { fontSize: '11px', color: '#4a5f4a', marginBottom: '8px' },
  barTrack: { height: '6px', background: 'rgba(255,255,255,0.07)', borderRadius: '100px', overflow: 'hidden', marginBottom: '10px' },
  barFill: (w, color) => ({ height: '100%', width: `${w}%`, borderRadius: '100px', background: color, transition: 'width 1s ease' }),

  saveBtn: { margin: '0 24px', width: 'calc(100% - 48px)', padding: '16px', background: 'linear-gradient(135deg,#4ade80,#22c55e)', border: 'none', borderRadius: '16px', color: '#0a1f0a', fontSize: '15px', fontWeight: '600', fontFamily: "'DM Sans',sans-serif", cursor: 'pointer' },
  savedMsg: { textAlign: 'center', color: '#4ade80', fontSize: '14px', marginTop: '12px' },
};

const GOALS = ['🏃 Lose Weight', '💪 Build Muscle', '🧘 Stay Healthy', '⚡ More Energy'];
const DIETS = ['Vegetarian', 'Non-Veg', 'Vegan', 'Jain'];
const CONDITIONS = ['Diabetes', 'BP', 'Thyroid', 'None'];

export default function ProfilePage({ onBack }) {
  const [name, setName] = useState('Aniket Bhatnagar');
  const [age, setAge] = useState('22');
  const [gender, setGender] = useState('Male');
  const [weight, setWeight] = useState('72');
  const [height, setHeight] = useState('175');
  const [goal, setGoal] = useState('🏃 Lose Weight');
  const [diet, setDiet] = useState('Vegetarian');
  const [condition, setCondition] = useState('None');
  const [saved, setSaved] = useState(false);

  const [heartRate, setHeartRate] = useState(72);
  const [steps, setSteps] = useState(4821);
  const [calories, setCalories] = useState(312);
  const [sleep, setSleep] = useState(7.2);
  const [oxygen, setOxygen] = useState(98);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(60, Math.min(100, prev + change));
      });
      setSteps(prev => prev + Math.floor(Math.random() * 8));
      setCalories(prev => prev + Math.floor(Math.random() * 2));
      setOxygen(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(95, Math.min(100, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
      <div style={s.app}>
        <div style={s.orb} />

        <div style={s.header}>
          <div style={s.backBtn} onClick={onBack}>←</div>
          <div style={s.headerTitle}>My Profile</div>
        </div>

        <div style={s.avatarSection}>
          <div style={s.avatarRing}>
            <div style={s.avatarInner}>🧑</div>
          </div>
          <div style={s.avatarName}>{name || 'Your Name'}</div>
          <div style={s.avatarTag}>Health Enthusiast</div>
        </div>

        <div style={s.statsGrid}>
          <div style={s.statCard}><div style={s.statVal}>{age}</div><div style={s.statLabel}>Age</div></div>
          <div style={s.statCard}><div style={s.statVal}>{weight}<span style={{fontSize:'13px'}}>kg</span></div><div style={s.statLabel}>Weight</div></div>
          <div style={s.statCard}><div style={s.statVal}>{height}<span style={{fontSize:'13px'}}>cm</span></div><div style={s.statLabel}>Height</div></div>
        </div>

        {/* SMARTWATCH SECTION */}
        <div style={s.watchCard}>
          <div style={s.watchHeader}>
            <div style={s.watchTitle}>⌚ Live Smartwatch Data</div>
            <div style={s.liveDot}><div style={s.dot}/> LIVE</div>
          </div>
          <div style={s.watchGrid}>
            <div style={s.watchMetric}>
              <div style={s.watchIcon}>❤️</div>
              <div style={s.watchVal}>{heartRate}</div>
              <div style={s.watchUnit}>bpm · Heart Rate</div>
            </div>
            <div style={s.watchMetric}>
              <div style={s.watchIcon}>👟</div>
              <div style={s.watchVal}>{steps.toLocaleString()}</div>
              <div style={s.watchUnit}>steps today</div>
            </div>
            <div style={s.watchMetric}>
              <div style={s.watchIcon}>🔥</div>
              <div style={s.watchVal}>{calories}</div>
              <div style={s.watchUnit}>kcal burned</div>
            </div>
            <div style={s.watchMetric}>
              <div style={s.watchIcon}>🩸</div>
              <div style={s.watchVal}>{oxygen}%</div>
              <div style={s.watchUnit}>Blood Oxygen</div>
            </div>
          </div>
          <div style={s.heartBar}>
            <div style={s.heartBarTitle}>Sleep last night</div>
            <div style={s.barTrack}><div style={s.barFill((sleep/9)*100,'linear-gradient(90deg,#4ade80,#22c55e)')}/></div>
            <div style={{fontSize:'13px',color:'#4ade80',fontWeight:'600'}}>{sleep} hrs <span style={{color:'#4a5f4a',fontWeight:'400',fontSize:'12px'}}>· Good sleep</span></div>
          </div>
          <div style={s.heartBar}>
            <div style={s.heartBarTitle}>Daily steps goal (10,000)</div>
            <div style={s.barTrack}><div style={s.barFill((steps/10000)*100,'linear-gradient(90deg,#4ade80,#22c55e)')}/></div>
            <div style={{fontSize:'13px',color:'#4ade80',fontWeight:'600'}}>{Math.round((steps/10000)*100)}% <span style={{color:'#4a5f4a',fontWeight:'400',fontSize:'12px'}}>· {10000 - steps} steps to go</span></div>
          </div>
        </div>

        {/* PERSONAL INFO */}
        <div style={s.section}>
          <div style={s.sectionLabel}>✦ Personal Info</div>
          <div style={s.inputGroup}>
            <span style={s.inputLabel}>Full Name</span>
            <input style={s.inputField} type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name"/>
          </div>
          <div style={s.row}>
            <div style={s.inputGroup}>
              <span style={s.inputLabel}>Age</span>
              <input style={s.inputField} type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="22"/>
            </div>
            <div style={s.inputGroup}>
              <span style={s.inputLabel}>Gender</span>
              <input style={s.inputField} type="text" value={gender} onChange={e => setGender(e.target.value)} placeholder="Male"/>
            </div>
          </div>
          <div style={s.row}>
            <div style={s.inputGroup}>
              <span style={s.inputLabel}>Weight (kg)</span>
              <input style={s.inputField} type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="72"/>
            </div>
            <div style={s.inputGroup}>
              <span style={s.inputLabel}>Height (cm)</span>
              <input style={s.inputField} type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="175"/>
            </div>
          </div>
        </div>

        {/* HEALTH GOAL */}
        <div style={s.section}>
          <div style={s.sectionLabel}>✦ Health Goal</div>
          <div style={s.goalGrid}>
            {GOALS.map(g => (
              <button key={g} style={s.goalBtn(goal === g)} onClick={() => setGoal(g)}>{g}</button>
            ))}
          </div>
        </div>

        {/* DIET TYPE */}
        <div style={s.section}>
          <div style={s.sectionLabel}>✦ Diet Type</div>
          <div style={s.chipRow}>
            {DIETS.map(d => (
              <div key={d} style={s.chip(diet === d)} onClick={() => setDiet(d)}>{d}</div>
            ))}
          </div>
        </div>

        {/* HEALTH CONDITIONS */}
        <div style={s.section}>
          <div style={s.sectionLabel}>✦ Health Conditions</div>
          <div style={s.chipRow}>
            {CONDITIONS.map(c => (
              <div key={c} style={s.chip(condition === c)} onClick={() => setCondition(c)}>{c}</div>
            ))}
          </div>
        </div>

        <button style={s.saveBtn} onClick={handleSave}>Save Profile →</button>
        {saved && <div style={s.savedMsg}>✅ Profile saved successfully!</div>}
      </div>
    </>
  );
}
