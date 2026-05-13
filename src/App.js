import React, { useState } from 'react';
import ProfilePage from './ProfilePage';
import DeficiencyPage from './DeficiencyPage';
import ReportsPage from './ReportsPage';
import ProgressPage from './ProgressPage';
import HealthSyncPage from './HealthSyncPage';
const styles = {
  app: { fontFamily: "'DM Sans', sans-serif", maxWidth: '100%', margin: '0 auto', minHeight: '100vh', background: '#0d130d', color: '#e8f0e8', position: 'relative', overflowX: 'hidden', paddingBottom: '70px' },
  orb1: { position: 'absolute', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)', borderRadius: '50%', top: '-80px', right: '-80px', pointerEvents: 'none' },
  orb2: { position: 'absolute', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)', borderRadius: '50%', bottom: '200px', left: '-60px', pointerEvents: 'none' },
  header: { padding: '48px 24px 24px', position: 'relative' },
  logoPill: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '100px', padding: '6px 14px', fontSize: '12px', color: '#4ade80', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '16px' },
  dot: { width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%' },
  h1: { fontSize: '32px', lineHeight: '1.15', color: '#f0faf0', marginBottom: '8px', fontWeight: '400' },
  em: { color: '#4ade80', fontStyle: 'italic' },
  subtitle: { fontSize: '14px', color: '#6b7f6b', fontWeight: '300' },
  tabs: { display: 'flex', gap: '8px', padding: '0 24px 24px' },
  tab: { flex: 1, padding: '10px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', color: '#6b7f6b', fontSize: '13px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
  tabActive: { flex: 1, padding: '10px', borderRadius: '12px', border: '1px solid #4ade80', background: '#4ade80', color: '#0a1f0a', fontSize: '13px', cursor: 'pointer', fontWeight: '600', fontFamily: "'DM Sans', sans-serif" },
  content: { padding: '0 24px' },
  uploadZone: { border: '1.5px dashed rgba(74,222,128,0.3)', borderRadius: '20px', padding: '40px 24px', textAlign: 'center', background: 'rgba(34,197,94,0.03)', cursor: 'pointer', marginBottom: '16px' },
  uploadIcon: { width: '56px', height: '56px', background: 'rgba(74,222,128,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '24px' },
  uploadTitle: { fontSize: '15px', fontWeight: '500', color: '#c8e6c8', marginBottom: '6px' },
  uploadSub: { fontSize: '13px', color: '#4a5f4a' },
  analyseBtn: { width: '100%', padding: '16px', background: 'linear-gradient(135deg, #4ade80, #22c55e)', border: 'none', borderRadius: '16px', color: '#0a1f0a', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", marginBottom: '24px' },
  manualInput: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px', width: '100%', color: '#e8f0e8', fontSize: '15px', fontFamily: "'DM Sans', sans-serif", marginBottom: '12px', outline: 'none' },
  chips: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' },
  chip: { padding: '6px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', fontSize: '12px', color: '#8fa88f', cursor: 'pointer' },
  resultCard: { background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '20px', padding: '20px', marginBottom: '16px' },
  resultLabel: { fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4ade80', fontWeight: '600', marginBottom: '12px' },
  macroGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' },
  macro: { background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '12px 8px', textAlign: 'center' },
  macroVal: { fontSize: '20px', fontWeight: '600', color: '#f0faf0' },
  macroLabel: { fontSize: '11px', color: '#4a5f4a', marginTop: '2px' },
  healthBadge: { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '100px', fontSize: '13px', color: '#4ade80', fontWeight: '500' },
  resultText: { fontSize: '13px', color: '#8fa88f', lineHeight: '1.7', marginTop: '12px', whiteSpace: 'pre-wrap' },
  loadingText: { fontSize: '14px', color: '#4ade80', textAlign: 'center', padding: '20px' },
  bottomNav: { display: 'flex', justifyContent: 'space-around', padding: '12px 24px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'fixed', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '100%', background: '#0d130d', zIndex: 100 },
  navItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' },
  navIcon: { fontSize: '20px' },
  navLabel: { fontSize: '10px', color: '#3a4f3a', letterSpacing: '0.04em' },
};

const QUICK_ITEMS = ['Dal Tadka', 'Paneer', 'Roti', 'Biryani', 'Idli', 'Samosa'];
const API_KEY = process.env.REACT_APP_GEMINI_KEY;

async function callGemini(parts) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts }] }) }
  );
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

function App() {
  const [tab, setTab] = useState('photo');
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [ingredient, setIngredient] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportDeficiencies, setReportDeficiencies] = useState(null);

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
      setResult(parseResult(text));
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
      const text = await callGemini([{ text: `You are an Indian nutritionist. Create a healthy one-day Indian meal plan. Respond ONLY in this format:
FOOD: Weekly Indian Meal Plan
CALORIES: 1800
PROTEIN: 65g
CARBS: 240g
HEALTH: Healthy
TIPS: Breakfast: Poha + Chai (280 kcal)\nLunch: Dal + Roti + Sabzi + Curd (520 kcal)\nSnack: Fruit + Handful of nuts (180 kcal)\nDinner: Khichdi + Raita (380 kcal)` }]);
      setResult(parseResult(text));
    } catch { setResult({ error: 'Something went wrong!' }); }
    setLoading(false);
  };

  const parseResult = (text) => {
    const get = (key) => { const match = text.match(new RegExp(`${key}:\\s*(.+)`)); return match ? match[1].trim() : '—'; };
    return { food: get('FOOD'), calories: get('CALORIES'), protein: get('PROTEIN'), carbs: get('CARBS'), health: get('HEALTH'), tips: get('TIPS') };
  };

  const switchTab = (t) => { setTab(t); setResult(null); setImage(null); };

  const BottomNav = () => (
    <div style={styles.bottomNav}>
      {[['🏠', 'Home'], ['📋', 'Reports'], ['💊', 'Deficiency'], ['📊', 'Progress'], ['⌚', 'Health'], ['👤', 'Profile']].map(([icon, label]) => (
        <div key={label} style={styles.navItem} onClick={() => {
          if (label === 'Profile') setTab('profile');
          if (label === 'Deficiency') setTab('deficiency');
          if (label === 'Reports') setTab('reports');
          if (label === 'Progress') setTab('progress');
          if (label === 'Home') setTab('photo');
        }}>
          <div style={styles.navIcon}>{icon}</div>
          <div style={styles.navLabel}>{label}</div>
        </div>
      ))}
    </div>
  );

  if (tab === 'profile') return <><ProfilePage onBack={() => setTab('photo')} /><BottomNav /></>;
  if (tab === 'deficiency') return <><DeficiencyPage onBack={() => setTab('photo')} reportDeficiencies={reportDeficiencies} /><BottomNav /></>;
  if (tab === 'reports') return <><ReportsPage onBack={() => setTab('photo')} onDeficienciesFound={(data) => { setReportDeficiencies(data); setTab('deficiency'); }} /><BottomNav /></>;
  if (tab === 'progress') return <><ProgressPage onBack={() => setTab('photo')} /><BottomNav /></>;
if (tab === 'health') return <><HealthSyncPage onBack={() => setTab('photo')} /><BottomNav /></>;
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <div style={styles.app}>
        <div style={styles.orb1} /><div style={styles.orb2} />
        <div style={styles.header}>
          <div style={styles.logoPill}><div style={styles.dot} />AI Powered</div>
          <h1 style={styles.h1}>Your <span style={styles.em}>Indian</span><br />Diet Assistant</h1>
          <p style={styles.subtitle}>Snap, analyse & eat smarter every day</p>
        </div>
        <div style={styles.tabs}>
          {['photo', 'manual', 'plan'].map((t) => (
            <button key={t} style={tab === t ? styles.tabActive : styles.tab} onClick={() => switchTab(t)}>
              {t === 'photo' ? '📷 Photo' : t === 'manual' ? '✏️ Ingredients' : '🍱 Meal Plan'}
            </button>
          ))}
        </div>
        <div style={styles.content}>
          {tab === 'photo' && (
            <>
              <div style={styles.uploadZone} onClick={() => document.getElementById('file-input').click()}>
                <div style={styles.uploadIcon}>📷</div>
                <div style={styles.uploadTitle}>Upload your meal photo</div>
                <div style={styles.uploadSub}>Tap to choose from gallery</div>
                <input id="file-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImage} />
              </div>
              {image && <img src={image} alt="meal" style={{ width: '100%', borderRadius: '16px', marginBottom: '16px' }} />}
              <button style={styles.analyseBtn} onClick={analysePhoto}>{loading ? 'Analysing...' : 'Analyse Meal →'}</button>
            </>
          )}
          {tab === 'manual' && (
            <>
              <input style={styles.manualInput} type="text" placeholder="e.g. dal, paneer, roti, rice..." value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
              <div style={styles.chips}>{QUICK_ITEMS.map((item) => (<div key={item} style={styles.chip} onClick={() => setIngredient(item)}>{item}</div>))}</div>
              <button style={styles.analyseBtn} onClick={analyseIngredient}>{loading ? 'Analysing...' : 'Get Nutrition Info →'}</button>
            </>
          )}
          {tab === 'plan' && (
            <button style={styles.analyseBtn} onClick={getMealPlan}>{loading ? 'Generating...' : 'Generate My Meal Plan →'}</button>
          )}
          {loading && <div style={styles.loadingText}>🤖 AI is thinking...</div>}
          {result && !loading && (
            result.error ? (
              <div style={styles.resultCard}><p style={{ color: '#f87171' }}>{result.error}</p></div>
            ) : (
              <div style={styles.resultCard}>
                <div style={styles.resultLabel}>✦ AI Analysis — {result.food}</div>
                <div style={styles.macroGrid}>
                  <div style={styles.macro}><div style={styles.macroVal}>{result.calories}</div><div style={styles.macroLabel}>Calories</div></div>
                  <div style={styles.macro}><div style={styles.macroVal}>{result.protein}</div><div style={styles.macroLabel}>Protein</div></div>
                  <div style={styles.macro}><div style={styles.macroVal}>{result.carbs}</div><div style={styles.macroLabel}>Carbs</div></div>
                </div>
                <div style={styles.healthBadge}>{result.health === 'Healthy' ? '✓' : result.health === 'Moderate' ? '~' : '⚠'} {result.health}</div>
                <p style={styles.resultText}>{result.tips}</p>
              </div>
            )
          )}
        </div>
        <div style={styles.bottomNav}>
          {[['🏠', 'Home'], ['📋', 'Reports'], ['💊', 'Deficiency'], ['📊', 'Progress'], ['👤', 'Profile']].map(([icon, label]) => (
            <div key={label} style={styles.navItem} onClick={() => {
              if (label === 'Profile') setTab('profile');
              if (label === 'Deficiency') setTab('deficiency');
              if (label === 'Reports') setTab('reports');
              if (label === 'Progress') setTab('progress');
            }}>
              <div style={styles.navIcon}>{icon}</div>
              <div style={styles.navLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
