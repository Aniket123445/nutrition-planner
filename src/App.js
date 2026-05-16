import React, { useState } from 'react';
import ProfilePage from './ProfilePage';
import DeficiencyPage from './DeficiencyPage';
import ReportsPage from './ReportsPage';
import ProgressPage from './ProgressPage';
import HealthSyncPage from './HealthSyncPage';

const styles = {
  app: { fontFamily: "'DM Sans', sans-serif", maxWidth: '480px', margin: '0 auto', minHeight: '100vh', background: '#060d06', color: '#e8f0e8', position: 'relative', overflowX: 'hidden', paddingBottom: '80px' },
  bottomNav: { display: 'flex', justifyContent: 'space-around', padding: '12px 8px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'fixed', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', background: '#060d06', zIndex: 100 },
  navItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' },
  navIcon: { fontSize: '20px' },
  navLabel: { fontSize: '10px', color: '#3a4f3a', letterSpacing: '0.04em' },
};

const API_KEY = process.env.REACT_APP_GEMINI_KEY;

async function callGemini(parts) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts }] }) }
  );
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

const CameraIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#4ade80' : '#4a5f4a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

const ListIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#4ade80' : '#4a5f4a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

const MealIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#4ade80' : '#4a5f4a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2h18v20H3z"/><path d="M7 6h10M7 10h10M7 14h6"/>
  </svg>
);

function App() {
  const [tab, setTab] = useState('photo');
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [ingredient, setIngredient] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportDeficiencies, setReportDeficiencies] = useState(null);
  const [recentMeals, setRecentMeals] = useState([
    { icon: '🌅', name: 'Poha + Masala Chai', time: 'Today · 8:30 AM', cal: '280 kcal', healthy: true, image: null },
    { icon: '☀️', name: 'Dal + Roti + Sabzi', time: 'Today · 1:00 PM', cal: '520 kcal', healthy: true, image: null },
    { icon: '🌙', name: 'Biryani + Raita', time: 'Yesterday · 8:00 PM', cal: '680 kcal', healthy: false, image: null },
  ]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => { setImage(reader.result); setImageBase64(reader.result.split(',')[1]); };
    reader.readAsDataURL(file);
  };

  const analysePhoto = async () => {
    if (!imageBase64) return alert('Please upload a meal photo first!');
    setLoading(true); setResult(null);
    try {
      const text = await callGemini([
        { text: `You are an expert Indian nutritionist. Analyse this meal photo and respond ONLY in this exact format:
FOOD: [food items you see]
CALORIES: [number only]
PROTEIN: [number with g]
CARBS: [number with g]
HEALTH: [Healthy / Moderate / Unhealthy]
TIPS: [2-3 lines of health tips and Indian alternatives]` },
        { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } },
      ]);
      const parsed = parseResult(text);
      setResult(parsed);
      // Add to recent meals with photo
      const now = new Date();
      const timeStr = `Today · ${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
      setRecentMeals(prev => [{
        icon: '🍽️',
        name: parsed.food !== '—' ? parsed.food : 'Meal',
        time: timeStr,
        cal: `${parsed.calories} kcal`,
        healthy: parsed.health === 'Healthy',
        image: image,
      }, ...prev.slice(0, 4)]);
    } catch { setResult({ error: 'Something went wrong. Please try again!' }); }
    setLoading(false);
  };

  const analyseIngredient = async () => {
    if (!ingredient.trim()) return alert('Please enter an ingredient!');
    setLoading(true); setResult(null);
    try {
      const text = await callGemini([{ text: `You are an expert Indian nutritionist. Give nutrition info for: ${ingredient}. Respond ONLY in this format:
FOOD: ${ingredient}
CALORIES: [number per 100g]
PROTEIN: [number with g]
CARBS: [number with g]
HEALTH: [Healthy / Moderate / Unhealthy]
TIPS: [2-3 lines about health benefits and popular Indian dishes using this ingredient]` }]);
      setResult(parseResult(text));
    } catch { setResult({ error: 'Something went wrong. Please try again!' }); }
    setLoading(false);
  };

  const getMealPlan = async () => {
    setLoading(true); setResult(null);
    try {
      // Build deficiency context from reports
      const defContext = reportDeficiencies
        ? `The user has these deficiencies detected from their medical report: ${reportDeficiencies.filter(d => d.level === 'low').map(d => d.name).join(', ')} (critical) and ${reportDeficiencies.filter(d => d.level === 'medium').map(d => d.name).join(', ')} (moderate). Create a meal plan specifically addressing these deficiencies.`
        : 'Create a balanced healthy Indian meal plan.';

      const text = await callGemini([{ text: `You are an expert Indian nutritionist. ${defContext}
Respond ONLY in this format:
FOOD: Personalized Indian Meal Plan
CALORIES: [total daily calories]
PROTEIN: [total protein]
CARBS: [total carbs]
HEALTH: Healthy
TIPS: Breakfast: [meal] ([calories] kcal)\nLunch: [meal] ([calories] kcal)\nSnack: [meal] ([calories] kcal)\nDinner: [meal] ([calories] kcal)\n\nWhy this plan: [1-2 lines explaining how this addresses their deficiencies]` }]);
      setResult(parseResult(text));
    } catch { setResult({ error: 'Something went wrong!' }); }
    setLoading(false);
  };

  const parseResult = (text) => {
    const get = (key) => { const match = text.match(new RegExp(`${key}:\\s*(.+)`)); return match ? match[1].trim() : '—'; };
    return { food: get('FOOD'), calories: get('CALORIES'), protein: get('PROTEIN'), carbs: get('CARBS'), health: get('HEALTH'), tips: get('TIPS') };
  };

  const NAV_ITEMS = [
    { label: 'Home', page: 'photo', icon: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#4ade80' : 'none'} stroke={active ? '#4ade80' : '#3a4f3a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22" stroke={active ? '#060d06' : '#3a4f3a'} fill="none"/></svg> },
    { label: 'Reports', page: 'reports', icon: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#4ade80' : '#3a4f3a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
    { label: 'Deficiency', page: 'deficiency', icon: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#4ade80' : '#3a4f3a'} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
    { label: 'Progress', page: 'progress', icon: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#4ade80' : '#3a4f3a'} strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
    { label: 'Health', page: 'health', icon: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#4ade80' : '#3a4f3a'} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
    { label: 'Profile', page: 'profile', icon: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#4ade80' : '#3a4f3a'} strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ];

  const currentPage = ['profile','deficiency','reports','progress','health'].includes(tab) ? tab : 'photo';

  const BottomNav = () => (
    <div style={styles.bottomNav}>
      {NAV_ITEMS.map(({ label, page, icon }) => {
        const active = currentPage === page;
        return (
          <div key={label} style={{ ...styles.navItem }} onClick={() => setTab(page)}>
            {icon(active)}
            {active && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#4ade80', margin: '0 auto' }} />}
            <div style={{ fontSize: '10px', color: active ? '#4ade80' : '#3a4f3a', letterSpacing: '0.04em' }}>{label}</div>
          </div>
        );
      })}
    </div>
  );

  if (tab === 'profile') return <><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/><div style={{paddingBottom:'70px'}}><ProfilePage onBack={() => setTab('photo')} /></div><BottomNav /></>;
  if (tab === 'deficiency') return <><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/><div style={{paddingBottom:'70px'}}><DeficiencyPage onBack={() => setTab('photo')} reportDeficiencies={reportDeficiencies} /></div><BottomNav /></>;
  if (tab === 'reports') return <><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/><div style={{paddingBottom:'70px'}}><ReportsPage onBack={() => setTab('photo')} onDeficienciesFound={(data) => { setReportDeficiencies(data); setTab('deficiency'); }} /></div><BottomNav /></>;
  if (tab === 'progress') return <><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/><div style={{paddingBottom:'70px'}}><ProgressPage onBack={() => setTab('photo')} /></div><BottomNav /></>;
  if (tab === 'health') return <><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/><div style={{paddingBottom:'70px'}}><HealthSyncPage onBack={() => setTab('photo')} /></div><BottomNav /></>;

  const QUICK_ITEMS = ['Dal Tadka', 'Paneer', 'Roti', 'Biryani', 'Idli', 'Samosa'];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        body { background: #060d06; margin: 0; padding: 0; }
        .tab-btn { flex: 1; padding: 12px 8px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); color: #4a5f4a; font-size: 12px; cursor: pointer; font-family: 'DM Sans', sans-serif; text-align: center; font-weight: 500; display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .tab-btn.active { background: rgba(74,222,128,0.12); border-color: rgba(74,222,128,0.35); color: #4ade80; font-weight: 600; }
        .chip { padding: 6px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 100px; font-size: 12px; color: #8fa88f; cursor: pointer; }
        .manual-input { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 14px 16px; color: #e8f0e8; font-size: 15px; font-family: 'DM Sans', sans-serif; outline: none; }
      `}</style>

      <div style={styles.app}>

        {/* Header — Healthio branding */}
        <div style={{ padding: '52px 24px 20px', position: 'relative' }}>
          <div style={{ fontSize: '13px', color: '#4a5f4a', marginBottom: '8px' }}>Good morning 🌤️</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '2px' }}>
            <span style={{ fontSize: '30px', fontWeight: '700', color: '#f0faf0', letterSpacing: '-0.5px' }}>Healthio</span>
            <span style={{ fontSize: '13px', color: '#4ade80', fontWeight: '500', letterSpacing: '0.02em' }}>· AI Nutrition</span>
          </div>
          <div style={{ fontSize: '13px', color: '#4a5f4a' }}>Snap, analyse & eat smarter every day</div>
          <div style={{ position: 'absolute', top: '48px', right: '24px', width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg,#4ade80,#22c55e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', border: '2px solid rgba(74,222,128,0.3)' }}>🧑</div>
        </div>

        {/* Health Score Card */}
        <div style={{ margin: '0 24px 20px', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '24px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative', width: '72px', height: '72px', flexShrink: 0 }}>
            <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(74,222,128,0.15)" strokeWidth="6"/>
              <circle cx="36" cy="36" r="30" fill="none" stroke="#4ade80" strokeWidth="6" strokeDasharray="188.4" strokeDashoffset="72" strokeLinecap="round"/>
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#4ade80', lineHeight: 1 }}>72</div>
              <div style={{ fontSize: '9px', color: '#4a5f4a', letterSpacing: '0.05em' }}>SCORE</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '15px', fontWeight: '600', color: '#f0faf0', marginBottom: '4px' }}>
              {reportDeficiencies ? 'Report Analysed ✅' : 'Needs Attention ⚠️'}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7f6b', lineHeight: 1.5 }}>
              {reportDeficiencies
                ? `${reportDeficiencies.filter(d=>d.level==='low').length} critical deficiencies found from your report.`
                : '2 critical deficiencies detected. Upload your report for full AI analysis.'}
            </div>
            <div style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', padding: '4px 10px', borderRadius: '100px', fontSize: '11px', color: '#4ade80' }}>↑ 5pts from last week</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', padding: '0 24px 20px' }}>
          {[[<svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>, '1,842', 'Calories'], [<svg key="w" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>, '6/8', 'Water'], [<svg key="s" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0"/><path d="m7 21 5-5"/><path d="m11 21 5-12"/><path d="M5 9a2 2 0 0 1 2-2h1l3 6-3 3H5"/></svg>, '6.2k', 'Steps']].map(([icon, val, label]) => (
            <div key={label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '14px 12px', textAlign: 'center' }}>
              <div style={{ marginBottom: '6px', display: 'flex', justifyContent: 'center' }}>{icon}</div>
              <div style={{ fontSize: '17px', fontWeight: '600', color: '#f0faf0' }}>{val}</div>
              <div style={{ fontSize: '10px', color: '#4a5f4a', marginTop: '2px' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ padding: '0 24px 16px', display: 'flex', gap: '8px' }}>
          <button className={`tab-btn ${tab === 'photo' ? 'active' : ''}`} onClick={() => { setTab('photo'); setResult(null); setImage(null); }}>
            <CameraIcon active={tab === 'photo'} />Photo
          </button>
          <button className={`tab-btn ${tab === 'manual' ? 'active' : ''}`} onClick={() => { setTab('manual'); setResult(null); }}>
            <ListIcon active={tab === 'manual'} />Ingredients
          </button>
          <button className={`tab-btn ${tab === 'plan' ? 'active' : ''}`} onClick={() => { setTab('plan'); setResult(null); }}>
            <MealIcon active={tab === 'plan'} />Meal Plan
          </button>
        </div>

        <div style={{ padding: '0 24px' }}>

          {/* Photo Tab */}
          {tab === 'photo' && (<>
            <div style={{ borderRadius: '20px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', padding: '20px', marginBottom: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }} onClick={() => document.getElementById('file-input').click()}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CameraIcon active={true} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#c8e6c8', marginBottom: '3px' }}>Upload meal photo</div>
                <div style={{ fontSize: '12px', color: '#3a5f3a', marginBottom: '8px' }}>Tap to choose from gallery</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['JPG', 'PNG', 'HEIC'].map(f => <div key={f} style={{ fontSize: '10px', padding: '3px 8px', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.12)', borderRadius: '6px', color: '#4a5f4a', fontFamily: 'monospace' }}>{f}</div>)}
                </div>
              </div>
              <div style={{ color: '#4ade80', fontSize: '20px', opacity: 0.5 }}>›</div>
              <input id="file-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImage} />
            </div>
            {image && <img src={image} alt="meal" style={{ width: '100%', borderRadius: '16px', marginBottom: '12px' }} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }}/>
              <div style={{ fontSize: '11px', color: '#3a5f3a', letterSpacing: '0.05em' }}>OR DRAG & DROP</div>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }}/>
            </div>
            <button style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg,#4ade80,#22c55e)', border: 'none', borderRadius: '16px', color: '#0a1f0a', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }} onClick={analysePhoto}>
              <div style={{ width: '26px', height: '26px', background: 'rgba(0,0,0,0.12)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a1f0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg></div>
              {loading ? 'Analysing...' : 'Analyse with AI →'}
            </button>
          </>)}

          {/* Manual Tab */}
          {tab === 'manual' && (<>
            <input className="manual-input" type="text" placeholder="e.g. dal, paneer, roti, rice..." value={ingredient} onChange={(e) => setIngredient(e.target.value)} style={{ marginBottom: '12px' }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {QUICK_ITEMS.map(item => <div key={item} className="chip" onClick={() => setIngredient(item)}>{item}</div>)}
            </div>
            <button style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg,#4ade80,#22c55e)', border: 'none', borderRadius: '16px', color: '#0a1f0a', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", marginBottom: '20px' }} onClick={analyseIngredient}>
              {loading ? 'Analysing...' : 'Get Nutrition Info →'}
            </button>
          </>)}

          {/* Meal Plan Tab */}
          {tab === 'plan' && (<>
            {reportDeficiencies && (
              <div style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '14px', padding: '12px 16px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>📋</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: '#4ade80' }}>Personalised from your report</div>
                  <div style={{ fontSize: '11px', color: '#4a5f4a', marginTop: '2px' }}>Meal plan will target your deficiencies</div>
                </div>
              </div>
            )}
            <button style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg,#4ade80,#22c55e)', border: 'none', borderRadius: '16px', color: '#0a1f0a', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", marginBottom: '20px' }} onClick={getMealPlan}>
              {loading ? 'Generating...' : reportDeficiencies ? '🎯 Generate Personalised Plan →' : 'Generate My Meal Plan →'}
            </button>
          </>)}

          {loading && <div style={{ fontSize: '14px', color: '#4ade80', textAlign: 'center', padding: '20px' }}>🤖 AI is thinking...</div>}

          {result && !loading && (result.error ? (
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ color: '#f87171' }}>{result.error}</p>
            </div>
          ) : (
            <div style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '20px', padding: '20px', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4ade80', fontWeight: '600', marginBottom: '12px' }}>✦ AI Analysis — {result.food}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                {[['Calories', result.calories], ['Protein', result.protein], ['Carbs', result.carbs]].map(([label, val]) => (
                  <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '12px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: '#f0faf0' }}>{val}</div>
                    <div style={{ fontSize: '11px', color: '#4a5f4a', marginTop: '2px' }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '100px', fontSize: '13px', color: '#4ade80', fontWeight: '500', marginBottom: '12px' }}>
                {result.health === 'Healthy' ? '✓' : result.health === 'Moderate' ? '~' : '⚠'} {result.health}
              </div>
              <p style={{ fontSize: '13px', color: '#8fa88f', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{result.tips}</p>
            </div>
          ))}

          {/* Quick Actions */}
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#f0faf0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Quick Actions</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            <div onClick={() => setTab('reports')} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '16px', cursor: 'pointer' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#c8e6c8', marginBottom: '3px' }}>Upload Report</div>
              <div style={{ fontSize: '11px', color: '#4a5f4a' }}>AI reads your blood test</div>
            </div>
            <div onClick={() => setTab('deficiency')} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '16px', cursor: 'pointer' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#c8e6c8', marginBottom: '3px' }}>Deficiencies</div>
              <div style={{ fontSize: '11px', color: '#4a5f4a' }}>See your nutrient levels</div>
            </div>
            <div onClick={() => setTab('health')} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '16px', cursor: 'pointer' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#c8e6c8', marginBottom: '3px' }}>Sync Health</div>
              <div style={{ fontSize: '11px', color: '#4a5f4a' }}>Import Apple Health data</div>
            </div>
            <div onClick={() => setTab('progress')} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '16px', cursor: 'pointer' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#c8e6c8', marginBottom: '3px' }}>Progress</div>
              <div style={{ fontSize: '11px', color: '#4a5f4a' }}>Weekly nutrition trends</div>
            </div>
          </div>

          {/* Recent Meals — with real uploaded photos */}
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#f0faf0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Recent Meals</div>
          {recentMeals.map((meal, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden', marginBottom: '10px' }}>
              {meal.image && <img src={meal.image} alt="meal" style={{ width: '100%', height: '120px', objectFit: 'cover' }} />}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                {!meal.image && <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(74,222,128,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{meal.icon}</div>}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: '#c8e6c8' }}>{meal.name}</div>
                  <div style={{ fontSize: '11px', color: '#3a5f3a', marginTop: '2px' }}>{meal.time}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#4ade80' }}>{meal.cal}</div>
                  <div style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '100px', marginTop: '4px', background: meal.healthy ? 'rgba(74,222,128,0.12)' : 'rgba(251,191,36,0.12)', color: meal.healthy ? '#4ade80' : '#fbbf24', border: `1px solid ${meal.healthy ? 'rgba(74,222,128,0.2)' : 'rgba(251,191,36,0.2)'}` }}>{meal.healthy ? 'Healthy' : 'Moderate'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <BottomNav />
      </div>
    </>
  );
}

export default App;
