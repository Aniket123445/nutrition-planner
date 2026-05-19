import React, { useState } from 'react';

const s = {
  app: { fontFamily: "'DM Sans', sans-serif", maxWidth: '420px', margin: '0 auto', minHeight: '100vh', background: '#0d130d', color: '#e8f0e8', paddingBottom: '40px', position: 'relative', overflowX: 'hidden' },
  orb: { position: 'absolute', width: '280px', height: '280px', background: 'radial-gradient(circle,rgba(34,197,94,0.1) 0%,transparent 70%)', borderRadius: '50%', top: '-60px', right: '-80px', pointerEvents: 'none' },
  header: { padding: '40px 24px 20px', display: 'flex', alignItems: 'center', gap: '12px' },
  backBtn: { width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', color: '#e8f0e8' },
  headerTitle: { fontSize: '18px', fontWeight: '600', color: '#f0faf0' },
  pill: { fontSize: '11px', color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', padding: '4px 12px', borderRadius: '100px', marginLeft: 'auto' },
  fromReportBanner: { margin: '0 24px 20px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' },
  bannerText: { fontSize: '13px', color: '#4ade80', fontWeight: '500' },
  bannerSub: { fontSize: '11px', color: '#4a5f4a', marginTop: '2px' },
  scoreCard: { margin: '0 24px 20px', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '20px', padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' },
  scoreCircle: { width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(74,222,128,0.1)', border: '2px solid rgba(74,222,128,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  scoreNum: { fontSize: '26px', fontWeight: '600', color: '#4ade80', lineHeight: 1 },
  scoreLabel: { fontSize: '10px', color: '#4a5f4a', marginTop: '2px' },
  scoreTitle: { fontSize: '15px', fontWeight: '600', color: '#f0faf0', marginBottom: '4px' },
  scoreSubtitle: { fontSize: '12px', color: '#6b7f6b', lineHeight: 1.5 },

  categoryTabs: { display: 'flex', gap: '6px', padding: '0 24px 16px', overflowX: 'auto' },
  catTab: (a) => ({ padding: '8px 14px', borderRadius: '100px', border: `1px solid ${a ? '#4ade80' : 'rgba(255,255,255,0.06)'}`, background: a ? '#4ade80' : 'transparent', color: a ? '#0a1f0a' : '#6b7f6b', fontSize: '12px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontWeight: a ? '600' : '400', whiteSpace: 'nowrap', flexShrink: 0 }),

  filterTabs: { display: 'flex', gap: '8px', padding: '0 24px 16px' },
  filterTab: (a) => ({ flex: 1, padding: '8px', borderRadius: '10px', border: `1px solid ${a ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.06)'}`, background: a ? 'rgba(74,222,128,0.08)' : 'transparent', color: a ? '#4ade80' : '#6b7f6b', fontSize: '11px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif', fontWeight: a ? '600' : '400', textAlign: 'center" }),

  section: { padding: '0 24px 20px' },
  sectionLabel: { fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4ade80', fontWeight: '600', marginBottom: '12px' },
  defCard: (level) => ({ background: 'rgba(255,255,255,0.03)', border: `1px solid ${level === 'low' ? 'rgba(239,68,68,0.3)' : level === 'medium' ? 'rgba(251,191,36,0.3)' : 'rgba(74,222,128,0.2)'}`, borderRadius: '16px', padding: '14px 16px', marginBottom: '10px' }),
  defTop: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' },
  defName: { fontSize: '14px', fontWeight: '500', color: '#f0faf0', display: 'flex', alignItems: 'center', gap: '8px' },
  defBadge: (level) => ({ fontSize: '10px', padding: '3px 10px', borderRadius: '100px', background: level === 'low' ? 'rgba(239,68,68,0.15)' : level === 'medium' ? 'rgba(251,191,36,0.15)' : 'rgba(74,222,128,0.15)', color: level === 'low' ? '#f87171' : level === 'medium' ? '#fbbf24' : '#4ade80' }),
  defPct: (level) => ({ fontSize: '13px', fontWeight: '600', color: level === 'low' ? '#f87171' : level === 'medium' ? '#fbbf24' : '#4ade80' }),
  barTrack: { height: '5px', background: 'rgba(255,255,255,0.07)', borderRadius: '100px', overflow: 'hidden', marginBottom: '8px' },
  barFill: (w, level) => ({ height: '100%', width: `${w}%`, borderRadius: '100px', background: level === 'low' ? '#f87171' : level === 'medium' ? '#fbbf24' : '#4ade80' }),
  defTip: { fontSize: '12px', color: '#4a5f4a', marginBottom: '6px' },
  foodChips: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  foodChip: { fontSize: '11px', padding: '4px 10px', background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '100px', color: '#4ade80' },
  aiBtn: { margin: '0 24px 16px', width: 'calc(100% - 48px)', padding: '16px', background: 'linear-gradient(135deg,#4ade80,#22c55e)', border: 'none', borderRadius: '16px', color: '#0a1f0a', fontSize: '15px', fontWeight: '600', fontFamily: "'DM Sans',sans-serif", cursor: 'pointer' },
  aiResult: { margin: '0 24px', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '16px', padding: '16px' },
  aiLabel: { fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4ade80', fontWeight: '600', marginBottom: '10px' },
  aiText: { fontSize: '13px', color: '#8fa88f', lineHeight: 1.7, whiteSpace: 'pre-wrap' },
  loading: { fontSize: '14px', color: '#4ade80', textAlign: 'center', padding: '16px' },
};

const DEFAULT_DEFICIENCIES = [
  // Vitamins
  { name: '☀️ Vitamin D', category: 'vitamins', level: 'low', pct: 22, foods: ['Milk', 'Eggs', 'Sunlight', 'Mushrooms'], tip: 'Critical for bone health & immunity' },
  { name: '🧠 Vitamin B12', category: 'vitamins', level: 'medium', pct: 48, foods: ['Curd', 'Paneer', 'Fortified milk'], tip: 'Critical for brain & nerve health' },
  { name: '🍊 Vitamin C', category: 'vitamins', level: 'medium', pct: 55, foods: ['Amla', 'Lemon', 'Guava', 'Tomato'], tip: 'Boosts immunity & iron absorption' },
  { name: '👁️ Vitamin A', category: 'vitamins', level: 'good', pct: 75, foods: ['Carrot', 'Sweet potato', 'Papaya'], tip: 'Good! Essential for vision & skin' },
  { name: '🌿 Folate (B9)', category: 'vitamins', level: 'good', pct: 78, foods: ['Spinach', 'Dal', 'Beetroot'], tip: 'Good levels! Keep eating greens' },
  // Minerals
  { name: '🩸 Iron', category: 'minerals', level: 'low', pct: 35, foods: ['Spinach', 'Dal', 'Jaggery', 'Pomegranate'], tip: 'Essential for red blood cells' },
  { name: '🦴 Calcium', category: 'minerals', level: 'medium', pct: 54, foods: ['Paneer', 'Curd', 'Ragi', 'Milk'], tip: 'Needed for strong bones & teeth' },
  { name: '🔵 Zinc', category: 'minerals', level: 'medium', pct: 50, foods: ['Pumpkin seeds', 'Chickpeas', 'Cashews'], tip: 'Important for immunity & wound healing' },
  { name: '⚡ Magnesium', category: 'minerals', level: 'good', pct: 82, foods: ['Banana', 'Dark chocolate', 'Nuts'], tip: 'Great! Supports 300+ body functions' },
  // Blood markers
  { name: '🫀 Hemoglobin', category: 'blood', level: 'low', pct: 30, foods: ['Beetroot', 'Spinach', 'Pomegranate', 'Dal'], tip: 'Low — risk of anemia. Eat iron-rich foods' },
  { name: '🍬 Blood Sugar', category: 'blood', level: 'good', pct: 85, foods: ['Bitter gourd', 'Fenugreek', 'Whole grains'], tip: 'Normal range. Maintain with low-GI diet' },
  { name: '❤️ Cholesterol', category: 'blood', level: 'medium', pct: 58, foods: ['Oats', 'Flaxseeds', 'Garlic', 'Walnuts'], tip: 'Borderline — reduce fried & oily foods' },
  { name: '💪 Protein', category: 'blood', level: 'medium', pct: 61, foods: ['Dal', 'Paneer', 'Sprouts', 'Eggs'], tip: 'Needed for muscle repair & growth' },
];

const API_KEY = 'AIzaSyCfEAsVNkjJD6H30ZzGic1nSCbtgJICE-4';
const FILTERS = [['all', 'All'], ['low', 'Critical'], ['medium', 'Moderate'], ['good', 'Good']];   

export default function DeficiencyPage({ onBack, reportDeficiencies }) {
  const [category, setCategory] = useState('all');
  const [filter, setFilter] = useState('all');
  const [aiReport, setAiReport] = useState('');
  const [loading, setLoading] = useState(false);

  const DEFICIENCIES = reportDeficiencies && reportDeficiencies.length > 0 ? reportDeficiencies : DEFAULT_DEFICIENCIES;

  const filtered = DEFICIENCIES.filter(d => {
    const catMatch = category === 'all' || d.category === category;
    const levelMatch = filter === 'all' || d.level === filter;
    return catMatch && levelMatch;
  });

  const isFromReport = reportDeficiencies && reportDeficiencies.length > 0;
  const criticalCount = DEFICIENCIES.filter(d => d.level === 'low').length;
  const healthScore = Math.max(40, 100 - (criticalCount * 15) - (DEFICIENCIES.filter(d => d.level === 'medium').length * 8));

  const getAIReport = async () => {
    setLoading(true); setAiReport('');
    try {
      const lowItems = DEFICIENCIES.filter(d => d.level === 'low').map(d => d.name).join(', ');
      const medItems = DEFICIENCIES.filter(d => d.level === 'medium').map(d => d.name).join(', ');
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: `As an Indian nutritionist, give a personalized health report for:
Critical deficiencies: ${lowItems}
Moderate deficiencies: ${medItems}
Give 5 practical Indian diet tips. Be friendly and specific to Indian foods. Use line breaks between tips.` }] }] }) }
      );
      const data = await res.json();
      setAiReport(data.candidates[0].content.parts[0].text);
    } catch { setAiReport('Something went wrong. Please try again!'); }
    setLoading(false);
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
      <div style={s.app}>
        <div style={s.orb} />
        <div style={s.header}>
          <div style={s.backBtn} onClick={onBack}>←</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <span style={s.headerTitle}>Deficiency Tracker</span>
          </div>
          <div style={s.pill}>AI Powered</div>
        </div>

        {isFromReport && (
          <div style={s.fromReportBanner}>
            <span style={{ fontSize: '20px' }}>📋</span>
            <div>
              <div style={s.bannerText}>✓ Synced from medical report</div>
              <div style={s.bannerSub}>All parameters detected by AI Doctor</div>
            </div>
          </div>
        )}

        <div style={s.scoreCard}>
          <div style={s.scoreCircle}>
            <div style={s.scoreNum}>{healthScore}</div>
            <div style={s.scoreLabel}>Health Score</div>
          </div>
          <div>
            <div style={s.scoreTitle}>{healthScore >= 75 ? 'Looking Good! ✅' : healthScore >= 60 ? 'Needs Attention ⚠️' : 'Critical Care 🚨'}</div>
            <div style={s.scoreSubtitle}>{criticalCount} critical · {DEFICIENCIES.filter(d => d.level === 'medium').length} moderate · {DEFICIENCIES.filter(d => d.level === 'good').length} normal</div>
          </div>
        </div>

        <div style={s.categoryTabs}>
          {[
            ['all', <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/></svg>, 'All'],
            ['vitamins', <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M20 20v-2a4 4 0 0 0-8 0"/></svg>, 'Vitamins'],
            ['minerals', <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>, 'Minerals'],
            ['blood', <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>, 'Blood'],
          ].map(([val, icon, label]) => (
            <button key={val} style={{ ...s.catTab(category === val), display: 'flex', alignItems: 'center', gap: '5px' }} onClick={() => setCategory(val)}>
              {icon}{label}
            </button>
          ))}
        </div>

        <div style={s.filterTabs}>
          {FILTERS.map(([val, label]) => (
            <button key={val} style={s.filterTab(filter === val)} onClick={() => setFilter(val)}>{label}</button>
          ))}
        </div>

        <div style={s.section}>
          <div style={s.sectionLabel}>✦ {filtered.length} Parameters {isFromReport ? '(from report)' : '(estimated)'}</div>
          {filtered.map((d, i) => (
            <div key={i} style={s.defCard(d.level)}>
              <div style={s.defTop}>
                <div style={s.defName}>{d.name}<span style={s.defBadge(d.level)}>{d.level === 'low' ? 'Critical' : d.level === 'medium' ? 'Moderate' : 'Good'}</span></div>
                <div style={s.defPct(d.level)}>{d.pct}%</div>
              </div>
              <div style={s.barTrack}><div style={s.barFill(d.pct, d.level)} /></div>
              <div style={s.defTip}>{d.tip}</div>
              {d.foods && <div style={s.foodChips}>{d.foods.map(f => <div key={f} style={s.foodChip}>{f}</div>)}</div>}
            </div>
          ))}
        </div>

        <button style={s.aiBtn} onClick={getAIReport}>{loading ? 'Generating...' : '🤖 Get AI Health Report →'}</button>
        {loading && <div style={s.loading}>🤖 AI is analysing your deficiencies...</div>}
        {aiReport && !loading && (
          <div style={s.aiResult}>
            <div style={s.aiLabel}>✦ Your Personalized AI Health Report</div>
            <div style={s.aiText}>{aiReport}</div>
          </div>
        )}
      </div>
    </>
  );
}
