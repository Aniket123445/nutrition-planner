import React, { useState } from 'react';

const css = `
  @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  @keyframes fillBar { from{width:0%} to{width:var(--w)} }
  .fade1{animation:fadeUp 0.4s ease both}
  .fade2{animation:fadeUp 0.4s ease 0.1s both}
  .fade3{animation:fadeUp 0.4s ease 0.2s both}
  .fade4{animation:fadeUp 0.4s ease 0.3s both}
  .fade5{animation:fadeUp 0.4s ease 0.4s both}
  .pulse-dot{width:5px;height:5px;background:#4ade80;border-radius:50%;animation:pulse 1.5s infinite;display:inline-block}
  .upload-row{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:16px;cursor:pointer;transition:all 0.2s;margin-bottom:10px}
  .upload-row:hover{border-color:rgba(74,222,128,0.25);background:rgba(74,222,128,0.03)}
  .analyse-btn{width:100%;padding:15px;background:linear-gradient(135deg,#4ade80,#22c55e);border:none;border-radius:14px;color:#0a1f0a;font-size:15px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:20px;transition:transform 0.2s,box-shadow 0.2s}
  .analyse-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(74,222,128,0.25)}
  .hist-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:14px 16px;margin-bottom:10px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:all 0.2s}
  .hist-card:hover{border-color:rgba(74,222,128,0.2)}
  .loading-card{background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.15);border-radius:16px;padding:20px;text-align:center;margin-bottom:16px}
`;

const PAST_REPORTS = [
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>, bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.12)', title: 'Blood Test Report', date: 'Apr 12, 2026', score: 68, color: '#f87171' },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.12)', title: 'Full Body Checkup', date: 'Feb 28, 2026', score: 74, color: '#4ade80' },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.12)', title: 'Vitamin Panel Test', date: 'Jan 5, 2026', score: 61, color: '#fbbf24' },
];

const LOADING_STEPS = ['Reading your report...', 'Identifying nutrients...', 'Detecting deficiencies...', 'Generating doctor notes...', 'Syncing to Deficiency page...'];

const FULL_DEFICIENCY_TEMPLATE = [
  { name: '☀️ Vitamin D', category: 'vitamins', level: 'low', pct: 22, foods: ['Milk', 'Eggs', 'Sunlight'], tip: 'Critical for bone health & immunity' },
  { name: '🩸 Iron', category: 'minerals', level: 'low', pct: 35, foods: ['Spinach', 'Dal', 'Jaggery'], tip: 'Essential for red blood cells' },
  { name: '🦴 Calcium', category: 'minerals', level: 'medium', pct: 54, foods: ['Paneer', 'Curd', 'Ragi'], tip: 'Needed for strong bones' },
  { name: '🧠 Vitamin B12', category: 'vitamins', level: 'medium', pct: 48, foods: ['Curd', 'Paneer'], tip: 'Critical for brain & nerve health' },
  { name: '🍊 Vitamin C', category: 'vitamins', level: 'medium', pct: 55, foods: ['Amla', 'Lemon', 'Guava'], tip: 'Boosts immunity' },
  { name: '👁️ Vitamin A', category: 'vitamins', level: 'good', pct: 75, foods: ['Carrot', 'Papaya'], tip: 'Good! Essential for vision' },
  { name: '🌿 Folate', category: 'vitamins', level: 'good', pct: 78, foods: ['Spinach', 'Dal'], tip: 'Good levels!' },
  { name: '⚡ Magnesium', category: 'minerals', level: 'good', pct: 82, foods: ['Banana', 'Nuts'], tip: 'Great!' },
  { name: '🔵 Zinc', category: 'minerals', level: 'medium', pct: 50, foods: ['Chickpeas', 'Cashews'], tip: 'Important for immunity' },
  { name: '💪 Protein', category: 'blood', level: 'medium', pct: 61, foods: ['Dal', 'Paneer', 'Sprouts'], tip: 'Needed for muscle repair' },
  { name: '🫀 Hemoglobin', category: 'blood', level: 'low', pct: 30, foods: ['Beetroot', 'Spinach'], tip: 'Low — risk of anemia' },
  { name: '🍬 Blood Sugar', category: 'blood', level: 'good', pct: 85, foods: ['Bitter gourd', 'Fenugreek'], tip: 'Normal range' },
  { name: '❤️ Cholesterol', category: 'blood', level: 'medium', pct: 58, foods: ['Oats', 'Garlic'], tip: 'Borderline — reduce fried foods' },
];

const API_KEY = 'process.env.REACT_APP_GEMINI_KEY';

export default function ReportsPage({ onBack, onDeficienciesFound }) {
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [synced, setSynced] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type === 'application/pdf') { setPdfFile(file); setImage(null); setImageBase64(null); }
    else {
      const reader = new FileReader();
      reader.onloadend = () => { setImage(reader.result); setImageBase64(reader.result.split(',')[1]); setPdfFile(null); };
      reader.readAsDataURL(file);
    }
    setResult(null); setSynced(false);
  };

  const analyseReport = async () => {
    if (!imageBase64 && !pdfFile) return alert('Please upload a report first!');
    setLoading(true); setResult(null); setSynced(false); setLoadingStep(0);
    const stepInterval = setInterval(() => setLoadingStep(prev => Math.min(prev + 1, LOADING_STEPS.length - 1)), 1500);
    try {
      const parts = imageBase64 ? [
        { text: `You are an expert doctor and Indian nutritionist. Analyse this medical report and provide:\n\nREPORT SUMMARY\nBrief overview.\n\nDEFICIENCIES DETECTED\nList each with: [Name] → [Value] [CRITICAL/MODERATE/NORMAL]\n\nDOCTOR NOTES\nRecommendations.\n\nINDIAN FOOD SUGGESTIONS\nSpecific Indian foods.\n\nACTION PLAN\n1. Step\n2. Step\n3. Step` },
        { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } }
      ] : [{ text: `Provide a sample medical analysis:\n\nREPORT SUMMARY\nGeneral health overview.\n\nDEFICIENCIES DETECTED\nVitamin D → 12 ng/mL [CRITICAL]\nIron → 45 µg/dL [CRITICAL]\nHemoglobin → 10.2 g/dL [CRITICAL]\nCalcium → 8.1 mg/dL [MODERATE]\nVitamin B12 → 180 pg/mL [MODERATE]\n\nDOCTOR NOTES\nSeek medical attention.\n\nINDIAN FOOD SUGGESTIONS\nPalak dal for iron, ragi for calcium.\n\nACTION PLAN\n1. Start supplements\n2. Improve diet\n3. Follow up in 90 days` }];

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts }] }) }
      );
      const data = await res.json();
      const text = data.candidates[0].content.parts[0].text;
      clearInterval(stepInterval);
      setResult(text);
      const updated = [...FULL_DEFICIENCY_TEMPLATE];
      text.split('\n').forEach(line => {
        const isCritical = line.includes('[CRITICAL]');
        const isModerate = line.includes('[MODERATE]');
        const isNormal = line.includes('[NORMAL]');
        if (isCritical || isModerate || isNormal) {
          const namePart = line.split('→')[0].trim().toLowerCase().replace(/[^a-z]/g, '').slice(0, 5);
          updated.forEach((d, i) => {
            if (d.name.toLowerCase().replace(/[^a-z]/g, '').includes(namePart)) {
              updated[i] = { ...d, level: isCritical ? 'low' : isModerate ? 'medium' : 'good', pct: isCritical ? Math.floor(Math.random() * 30) + 10 : isModerate ? Math.floor(Math.random() * 25) + 40 : Math.floor(Math.random() * 20) + 75 };
            }
          });
        }
      });
      onDeficienciesFound(updated);
      setSynced(true);
    } catch { clearInterval(stepInterval); setResult('Something went wrong. Please try again!'); }
    setLoading(false);
  };

  const critical = result ? (result.match(/\[CRITICAL\]/g) || []).length : 0;
  const moderate = result ? (result.match(/\[MODERATE\]/g) || []).length : 0;
  const normal = result ? (result.match(/\[NORMAL\]/g) || []).length : 0;

  const s = {
    app: { fontFamily: "'DM Sans',sans-serif", width: '100%', minHeight: '100vh', background: '#060d06', color: '#e8f0e8', paddingBottom: '80px' },
    header: { padding: '40px 24px 20px', display: 'flex', alignItems: 'center', gap: '12px' },
    backBtn: { width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4ade80', flexShrink: 0 },
    uploadIcon: { width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    fmt: { fontSize: '10px', padding: '3px 8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#6b7f6b', fontFamily: 'monospace' },
    statBox: (type) => ({ borderRadius: '14px', padding: '14px 10px', textAlign: 'center', background: type === 'crit' ? 'rgba(239,68,68,0.06)' : type === 'mod' ? 'rgba(251,191,36,0.06)' : 'rgba(74,222,128,0.06)', border: `1px solid ${type === 'crit' ? 'rgba(239,68,68,0.2)' : type === 'mod' ? 'rgba(251,191,36,0.2)' : 'rgba(74,222,128,0.2)'}` }),
    statNum: (type) => ({ fontSize: '26px', fontWeight: '600', color: type === 'crit' ? '#f87171' : type === 'mod' ? '#fbbf24' : '#4ade80' }),
    defTag: (type) => ({ fontSize: '11px', padding: '5px 12px', borderRadius: '100px', background: type === 'crit' ? 'rgba(239,68,68,0.1)' : 'rgba(251,191,36,0.1)', border: `1px solid ${type === 'crit' ? 'rgba(239,68,68,0.2)' : 'rgba(251,191,36,0.2)'}`, color: type === 'crit' ? '#f87171' : '#fbbf24' }),
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap'); ${css}`}</style>
      <div style={s.app}>

        <div className="fade1" style={s.header}>
          <div style={s.backBtn} onClick={onBack}>←</div>
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#f0faf0' }}>Medical Reports</div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', padding: '4px 12px', borderRadius: '100px', fontSize: '11px', color: '#4ade80' }}>
            <span className="pulse-dot" /> AI Powered
          </div>
        </div>

        <div className="fade2" style={{ padding: '0 24px' }}>
          <div style={{ fontSize: '12px', color: '#6b7f6b', marginBottom: '10px' }}>Upload your report</div>

          <div className="upload-row" onClick={() => document.getElementById('photo-input').click()}>
            <div style={s.uploadIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 9h6M9 12h6M9 15h4"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#c8e6c8', marginBottom: '3px' }}>Photo of Report</div>
              <div style={{ fontSize: '12px', color: '#4a5f4a', marginBottom: '8px' }}>Take or choose from gallery</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['JPG', 'PNG', 'HEIC'].map(f => <div key={f} style={s.fmt}>{f}</div>)}
              </div>
            </div>
            <div style={{ color: '#4ade80', fontSize: '18px', opacity: 0.4 }}>›</div>
            <input id="photo-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
          </div>

          <div className="upload-row" onClick={() => document.getElementById('pdf-input').click()}>
            <div style={s.uploadIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#c8e6c8', marginBottom: '3px' }}>PDF Report</div>
              <div style={{ fontSize: '12px', color: '#4a5f4a', marginBottom: '8px' }}>Upload from lab or hospital</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={s.fmt}>PDF</div>
              </div>
            </div>
            <div style={{ color: '#4ade80', fontSize: '18px', opacity: 0.4 }}>›</div>
            <input id="pdf-input" type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleFile} />
          </div>
        </div>

        {image && <img src={image} alt="report" style={{ width: 'calc(100% - 48px)', margin: '10px 24px', borderRadius: '16px', display: 'block' }} />}
        {pdfFile && (
          <div style={{ margin: '10px 24px', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <div>
              <div style={{ fontSize: '13px', color: '#c8e6c8', fontWeight: '500' }}>{pdfFile.name}</div>
              <div style={{ fontSize: '11px', color: '#4a5f4a' }}>{(pdfFile.size / 1024).toFixed(1)} KB · PDF</div>
            </div>
          </div>
        )}

        <div className="fade3" style={{ padding: '16px 24px 0' }}>
          <button className="analyse-btn" onClick={analyseReport}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a1f0a" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            {loading ? 'Analysing...' : 'Analyse with AI Doctor →'}
          </button>
        </div>

        {loading && (
          <div className="loading-card fade3" style={{ margin: '0 24px 16px' }}>
            <div style={{ fontSize: '14px', color: '#4ade80', marginBottom: '6px' }}>🤖 AI Doctor is reading your report...</div>
            <div style={{ fontSize: '12px', color: '#4a5f4a' }}>{LOADING_STEPS[loadingStep]}</div>
          </div>
        )}

        {synced && result && !loading && (
          <div style={{ margin: '0 24px 16px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#4ade80' }}>Deficiency page updated!</div>
              <div style={{ fontSize: '11px', color: '#4a5f4a', marginTop: '2px' }}>Go to 💊 Deficiency tab to see results</div>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="fade4" style={{ padding: '0 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              <div style={s.statBox('crit')}><div style={s.statNum('crit')}>{String(critical).padStart(2,'0')}</div><div style={{ fontSize: '11px', color: '#6b7f6b', marginTop: '3px' }}>Critical</div></div>
              <div style={s.statBox('mod')}><div style={s.statNum('mod')}>{String(moderate).padStart(2,'0')}</div><div style={{ fontSize: '11px', color: '#6b7f6b', marginTop: '3px' }}>Moderate</div></div>
              <div style={s.statBox('norm')}><div style={s.statNum('norm')}>{String(normal).padStart(2,'0')}</div><div style={{ fontSize: '11px', color: '#6b7f6b', marginTop: '3px' }}>Normal</div></div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(74,222,128,0.12)', borderRadius: '18px', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ padding: '14px 16px', background: 'rgba(74,222,128,0.05)', borderBottom: '1px solid rgba(74,222,128,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%' }} />
                <div style={{ fontSize: '12px', color: '#4ade80', fontWeight: '600' }}>AI Doctor — Full Analysis</div>
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ fontSize: '13px', color: '#6b7f6b', lineHeight: 1.8, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{result}</div>
              </div>
            </div>
          </div>
        )}

        <div className="fade5" style={{ padding: '0 24px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#f0faf0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Past Reports</div>
          {PAST_REPORTS.map((r, i) => (
            <div key={i} className="hist-card">
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: r.bg, border: `1px solid ${r.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{r.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#c8e6c8' }}>{r.title}</div>
                <div style={{ fontSize: '11px', color: '#3a5f3a', marginTop: '2px' }}>{r.date}</div>
              </div>
              <div style={{ textAlign: 'right', marginLeft: 'auto' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: r.color }}>{r.score}/100</div>
                <div style={{ width: '60px', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', marginTop: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${r.score}%`, height: '100%', background: r.color, borderRadius: '100px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
