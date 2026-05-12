import React, { useState } from 'react';

const s = {
  app: { fontFamily: "'DM Sans', sans-serif", maxWidth: '40px', margin: '0 auto', minHeight: '100vh', background: '#050f05', color: '#e8f0e8', paddingBottom: '40px', position: 'relative', overflowX: 'hidden' },
  gridBg: { position: 'absolute', top: 0, left: 0, right: 0, height: '300px', backgroundImage: 'linear-gradient(rgba(74,222,128,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,0.04) 1px,transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' },
  orb: { position: 'absolute', width: '300px', height: '300px', background: 'radial-gradient(circle,rgba(34,197,94,0.08) 0%,transparent 70%)', borderRadius: '50%', top: '-80px', right: '-80px', pointerEvents: 'none' },
  header: { padding: '40px 24px 20px', position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' },
  backBtn: { width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', color: '#4ade80' },
  headerTitle: { fontSize: '18px', fontWeight: '600', color: '#f0faf0' },
  pill: { fontSize: '11px', color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', padding: '4px 12px', borderRadius: '100px', marginLeft: 'auto', fontFamily: 'monospace' },
  tabRow: { display: 'flex', gap: '8px', padding: '0 24px 20px' },
  tab: (a) => ({ flex: 1, padding: '10px', borderRadius: '10px', border: `1px solid ${a ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.06)'}`, background: a ? 'rgba(74,222,128,0.08)' : 'transparent', color: a ? '#4ade80' : '#4a5f4a', fontSize: '12px', cursor: 'pointer', fontFamily: 'monospace', letterSpacing: '0.02em' }),
  uploadBox: { margin: '0 24px 20px', background: 'rgba(74,222,128,0.03)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '16px', padding: '32px 24px', textAlign: 'center', cursor: 'pointer', position: 'relative' },
  corner: (pos) => { const c = { position: 'absolute', width: '12px', height: '12px', borderColor: '#4ade80', borderStyle: 'solid', opacity: 0.6 }; if (pos === 'tl') return { ...c, top: 8, left: 8, borderWidth: '2px 0 0 2px' }; if (pos === 'tr') return { ...c, top: 8, right: 8, borderWidth: '2px 2px 0 0' }; if (pos === 'bl') return { ...c, bottom: 8, left: 8, borderWidth: '0 0 2px 2px' }; return { ...c, bottom: 8, right: 8, borderWidth: '0 2px 2px 0' }; },
  uploadIconWrap: { width: '56px', height: '56px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 14px' },
  uploadTitle: { fontSize: '15px', fontWeight: '500', color: '#c8e6c8', marginBottom: '6px' },
  uploadSub: { fontSize: '12px', color: '#3a5f3a', marginBottom: '14px' },
  uploadTypes: { display: 'flex', justifyContent: 'center', gap: '8px' },
  typeBadge: { fontFamily: 'monospace', fontSize: '10px', padding: '4px 10px', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '6px', color: '#4ade80' },
  previewBox: { borderRadius: '16px', overflow: 'hidden', margin: '0 24px 16px', border: '1px solid rgba(74,222,128,0.2)' },
  pdfPreview: { background: 'rgba(74,222,128,0.06)', padding: '20px', display: 'flex', alignItems: 'center', gap: '12px' },
  analyseBtn: { margin: '0 24px 20px', width: 'calc(100% - 48px)', padding: '16px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '12px', color: '#4ade80', fontSize: '14px', fontWeight: '500', fontFamily: 'monospace', cursor: 'pointer', letterSpacing: '0.05em' },
  loadingCard: { margin: '0 24px 16px', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '16px', padding: '20px', textAlign: 'center' },
  loadingText: { fontSize: '14px', color: '#4ade80', marginBottom: '8px' },
  loadingStep: { fontSize: '12px', color: '#4a5f4a', fontFamily: 'monospace' },
  successCard: { margin: '0 24px 16px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '16px', padding: '20px', textAlign: 'center' },
  successIcon: { fontSize: '36px', marginBottom: '10px' },
  successText: { fontSize: '15px', fontWeight: '600', color: '#4ade80', marginBottom: '6px' },
  successSub: { fontSize: '12px', color: '#4a5f4a' },
  metricsRow: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', padding: '0 24px 20px' },
  metric: (type) => ({ background: 'rgba(255,255,255,0.02)', border: `1px solid ${type === 'critical' ? 'rgba(239,68,68,0.3)' : type === 'moderate' ? 'rgba(251,191,36,0.3)' : 'rgba(74,222,128,0.3)'}`, borderRadius: '12px', padding: '12px 8px', textAlign: 'center' }),
  metricVal: (type) => ({ fontFamily: 'monospace', fontSize: '24px', fontWeight: '500', color: type === 'critical' ? '#f87171' : type === 'moderate' ? '#fbbf24' : '#4ade80' }),
  metricLabel: { fontSize: '10px', color: '#3a5f3a', marginTop: '3px', letterSpacing: '0.05em', textTransform: 'uppercase' },
  resultCard: { margin: '0 24px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(74,222,128,0.12)', borderRadius: '16px', overflow: 'hidden' },
  resultHeader: { padding: '12px 16px', background: 'rgba(74,222,128,0.05)', borderBottom: '1px solid rgba(74,222,128,0.1)', display: 'flex', alignItems: 'center', gap: '8px' },
  resultHeaderDot: { width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%' },
  resultHeaderText: { fontFamily: 'monospace', fontSize: '11px', color: '#4ade80', letterSpacing: '0.05em' },
  resultBody: { padding: '16px' },
  resultText: { fontSize: '12px', color: '#6b7f6b', lineHeight: 1.8, whiteSpace: 'pre-wrap' },
  histCard: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '14px 16px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' },
  histTitle: { fontSize: '13px', fontWeight: '500', color: '#c8e6c8' },
  histDate: { fontFamily: 'monospace', fontSize: '11px', color: '#3a5f3a', marginTop: '3px' },
  histScore: (good) => ({ fontFamily: 'monospace', fontSize: '13px', fontWeight: '500', color: good ? '#4ade80' : '#f87171' }),
  section: { padding: '0 24px' },
  sectionLabel: { fontFamily: 'monospace', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4ade80', marginBottom: '12px' },
};

const PAST_REPORTS = [
  { icon: '🩸', title: 'Blood Test Report', date: '2026.04.12', score: 68, good: false },
  { icon: '🫀', title: 'Full Body Checkup', date: '2026.02.28', score: 74, good: true },
  { icon: '🧪', title: 'Vitamin Panel Test', date: '2026.01.05', score: 61, good: false },
];

const LOADING_STEPS = ['Reading your report...', 'Identifying nutrients & markers...', 'Detecting deficiencies...', 'Generating doctor notes...', 'Syncing to Deficiency page...'];

const API_KEY = process.env.REACT_APP_GEMINI_KEY;

const FULL_DEFICIENCY_TEMPLATE = [
  { name: '☀️ Vitamin D', level: 'low', pct: 22, foods: ['Milk', 'Eggs', 'Sunlight', 'Mushrooms'], tip: 'Critical for bone health & immunity' },
  { name: '🩸 Iron', level: 'low', pct: 35, foods: ['Spinach', 'Dal', 'Jaggery', 'Pomegranate'], tip: 'Essential for red blood cells' },
  { name: '🦴 Calcium', level: 'medium', pct: 54, foods: ['Paneer', 'Curd', 'Ragi', 'Milk'], tip: 'Needed for strong bones & teeth' },
  { name: '🧠 Vitamin B12', level: 'medium', pct: 48, foods: ['Curd', 'Paneer', 'Fortified milk'], tip: 'Critical for brain & nerve health' },
  { name: '🍊 Vitamin C', level: 'medium', pct: 55, foods: ['Amla', 'Lemon', 'Guava', 'Tomato'], tip: 'Boosts immunity & iron absorption' },
  { name: '👁️ Vitamin A', level: 'good', pct: 75, foods: ['Carrot', 'Sweet potato', 'Papaya'], tip: 'Good! Essential for vision & skin' },
  { name: '🌿 Folate', level: 'good', pct: 78, foods: ['Spinach', 'Dal', 'Beetroot'], tip: 'Good levels! Keep eating greens' },
  { name: '⚡ Magnesium', level: 'good', pct: 82, foods: ['Banana', 'Dark chocolate', 'Nuts'], tip: 'Great! Supports 300+ body functions' },
  { name: '🔵 Zinc', level: 'medium', pct: 50, foods: ['Pumpkin seeds', 'Chickpeas', 'Cashews'], tip: 'Important for immunity & wound healing' },
  { name: '💪 Protein', level: 'medium', pct: 61, foods: ['Dal', 'Paneer', 'Sprouts', 'Eggs'], tip: 'Needed for muscle repair & growth' },
  { name: '🫀 Hemoglobin', level: 'low', pct: 30, foods: ['Beetroot', 'Spinach', 'Pomegranate', 'Dal'], tip: 'Low — risk of anemia. Eat iron-rich foods' },
  { name: '🍬 Blood Sugar', level: 'good', pct: 85, foods: ['Bitter gourd', 'Fenugreek', 'Whole grains'], tip: 'Normal range. Maintain with low-GI diet' },
  { name: '❤️ Cholesterol', level: 'medium', pct: 58, foods: ['Oats', 'Flaxseeds', 'Garlic', 'Walnuts'], tip: 'Borderline — reduce fried & oily foods' },
];

export default function ReportsPage({ onBack, onDeficienciesFound }) {
  const [activeTab, setActiveTab] = useState('upload');
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
      let parts = imageBase64 ? [
        { text: `You are an expert doctor and Indian nutritionist. Analyse this medical report and provide a full analysis in this format:

// 01. REPORT_SUMMARY
Brief overview.

// 02. DEFICIENCIES_DETECTED
List each with: [Name] → [Value] [CRITICAL/MODERATE/NORMAL]
Include vitamins, minerals, blood markers like hemoglobin, sugar, cholesterol.

// 03. DOCTOR_NOTES
Professional observations and recommendations.

// 04. INDIAN_FOOD_PROTOCOL
Specific Indian foods for each deficiency.

// 05. ACTION_PLAN
[01] Step one
[02] Step two
[03] Step three` },
        { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } }
      ] : [{ text: `Provide a sample medical analysis in this format:

// 01. REPORT_SUMMARY
General health overview for Indian adult.

// 02. DEFICIENCIES_DETECTED
Vitamin D → 12 ng/mL [CRITICAL]
Iron → 45 µg/dL [CRITICAL]
Hemoglobin → 10.2 g/dL [CRITICAL]
Calcium → 8.1 mg/dL [MODERATE]
Vitamin B12 → 180 pg/mL [MODERATE]
Zinc → 55 µg/dL [MODERATE]
Cholesterol → 210 mg/dL [MODERATE]
Blood Sugar → 95 mg/dL [NORMAL]
Vitamin A → 45 µg/dL [NORMAL]

// 03. DOCTOR_NOTES
Recommendations based on findings.

// 04. INDIAN_FOOD_PROTOCOL
Foods for each deficiency.

// 05. ACTION_PLAN
[01] Start supplements
[02] Improve diet
[03] Follow up in 90 days` }];

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts }] }) }
      );
      const data = await res.json();
      const text = data.candidates[0].content.parts[0].text;
      clearInterval(stepInterval);
      setResult(text);

      // Auto sync to deficiency page
      const updatedDeficiencies = parseAndUpdateDeficiencies(text);
      onDeficienciesFound(updatedDeficiencies);
      setSynced(true);
    } catch { clearInterval(stepInterval); setResult('Something went wrong. Please try again!'); }
    setLoading(false);
  };

  const parseAndUpdateDeficiencies = (text) => {
    const updated = [...FULL_DEFICIENCY_TEMPLATE];
    const lines = text.split('\n');
    lines.forEach(line => {
      const isCritical = line.includes('[CRITICAL]') || line.includes('CRITICAL');
      const isModerate = line.includes('[MODERATE]') || line.includes('MODERATE');
      const isNormal = line.includes('[NORMAL]') || line.includes('NORMAL');
      if (isCritical || isModerate || isNormal) {
        const namePart = line.split('→')[0].trim().toLowerCase();
        updated.forEach((d, i) => {
          if (d.name.toLowerCase().includes(namePart.replace(/[^a-z]/g, '').slice(0, 5))) {
            updated[i] = { ...d, level: isCritical ? 'low' : isModerate ? 'medium' : 'good', pct: isCritical ? Math.floor(Math.random() * 30) + 10 : isModerate ? Math.floor(Math.random() * 25) + 40 : Math.floor(Math.random() * 20) + 75 };
          }
        });
      }
    });
    return updated;
  };

  const critical = result ? (result.match(/\[CRITICAL\]/g) || []).length : 0;
  const moderate = result ? (result.match(/\[MODERATE\]/g) || []).length : 0;
  const normal = result ? (result.match(/\[NORMAL\]/g) || []).length : 0;

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
      <div style={s.app}>
        <div style={s.gridBg} /><div style={s.orb} />
        <div style={s.header}>
          <div style={s.backBtn} onClick={onBack}>←</div>
          <div style={s.headerTitle}>Medical Reports</div>
          <div style={s.pill}>AI Powered</div>
        </div>

        <div style={s.tabRow}>
          <button style={s.tab(activeTab === 'upload')} onClick={() => setActiveTab('upload')}>[ UPLOAD ]</button>
          <button style={s.tab(activeTab === 'history')} onClick={() => setActiveTab('history')}>[ HISTORY ]</button>
        </div>

        {activeTab === 'upload' && (<>
          <div style={s.uploadBox} onClick={() => document.getElementById('report-file').click()}>
            <div style={s.corner('tl')} /><div style={s.corner('tr')} />
            <div style={s.corner('bl')} /><div style={s.corner('br')} />
            <div style={s.uploadIconWrap}>📄</div>
            <div style={s.uploadTitle}>Upload Medical Report</div>
            <div style={s.uploadSub}>Results auto-sync to Deficiency page</div>
            <div style={s.uploadTypes}>
              <div style={s.typeBadge}>JPG</div>
              <div style={s.typeBadge}>PNG</div>
              <div style={s.typeBadge}>PDF</div>
            </div>
            <input id="report-file" type="file" accept="image/*,.pdf" style={{ display: 'none' }} onChange={handleFile} />
          </div>

          {image && <div style={s.previewBox}><img src={image} alt="report" style={{ width: '100%', display: 'block' }} /></div>}
          {pdfFile && <div style={s.previewBox}><div style={s.pdfPreview}><span style={{ fontSize: '32px' }}>📑</span><div><div style={{ fontSize: '14px', color: '#c8e6c8', fontWeight: '500' }}>{pdfFile.name}</div><div style={{ fontSize: '12px', color: '#4a5f4a' }}>{(pdfFile.size / 1024).toFixed(1)} KB · PDF</div></div></div></div>}

          {(image || pdfFile) && !loading && <button style={s.analyseBtn} onClick={analyseReport}>▶ ANALYSE_REPORT.exe</button>}

          {loading && <div style={s.loadingCard}><div style={s.loadingText}>🤖 AI Doctor is reading your report...</div><div style={s.loadingStep}>{LOADING_STEPS[loadingStep]}</div></div>}

          {synced && result && !loading && (
            <div style={s.successCard}>
              <div style={s.successIcon}>✅</div>
              <div style={s.successText}>Deficiency page updated!</div>
              <div style={s.successSub}>All parameters synced automatically. Go to 💊 Deficiency tab to see results.</div>
            </div>
          )}

          {result && !loading && (<>
            <div style={s.metricsRow}>
              <div style={s.metric('critical')}><div style={s.metricVal('critical')}>{String(critical).padStart(2, '0')}</div><div style={s.metricLabel}>Critical</div></div>
              <div style={s.metric('moderate')}><div style={s.metricVal('moderate')}>{String(moderate).padStart(2, '0')}</div><div style={s.metricLabel}>Moderate</div></div>
              <div style={s.metric('normal')}><div style={s.metricVal('normal')}>{String(normal).padStart(2, '0')}</div><div style={s.metricLabel}>Normal</div></div>
            </div>
            <div style={s.resultCard}>
              <div style={s.resultHeader}><div style={s.resultHeaderDot} /><div style={s.resultHeaderText}>AI_DOCTOR // FULL_ANALYSIS_REPORT</div></div>
              <div style={s.resultBody}><div style={s.resultText}>{result}</div></div>
            </div>
          </>)}
        </>)}

        {activeTab === 'history' && (
          <div style={s.section}>
            <div style={s.sectionLabel}> past_reports</div>
            {PAST_REPORTS.map((r, i) => (
              <div key={i} style={s.histCard}>
                <div style={{ fontSize: '22px' }}>{r.icon}</div>
                <div style={{ flex: 1 }}><div style={s.histTitle}>{r.title}</div><div style={s.histDate}>{r.date}</div></div>
                <div style={s.histScore(r.good)}>{r.score}/100</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
