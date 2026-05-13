import React, { useState } from 'react';

const s = {
  app: { fontFamily: "'DM Sans', sans-serif", width: '100%', minHeight: '100vh', background: '#0d130d', color: '#e8f0e8', paddingBottom: '80px' },
  header: { padding: '40px 24px 20px', display: 'flex', alignItems: 'center', gap: '12px' },
  backBtn: { width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', color: '#e8f0e8', flexShrink: 0 },
  headerTitle: { fontSize: '18px', fontWeight: '600', color: '#f0faf0' },
  pill: { fontSize: '11px', color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', padding: '4px 12px', borderRadius: '100px', marginLeft: 'auto', whiteSpace: 'nowrap' },
  appleCard: { margin: '0 24px 24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' },
  appleIcon: { width: '56px', height: '56px', borderRadius: '14px', background: 'linear-gradient(135deg,#ff2d55,#ff6b6b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 },
  appleInfo: { flex: 1 },
  appleTitle: { fontSize: '15px', fontWeight: '600', color: '#f0faf0', marginBottom: '4px' },
  appleSub: { fontSize: '12px', color: '#6b7f6b' },
  connectedBadge: { fontSize: '11px', color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', padding: '4px 10px', borderRadius: '100px' },
  section: { padding: '0 24px 20px' },
  sectionLabel: { fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4ade80', fontWeight: '600', marginBottom: '12px' },
  inputCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px', marginBottom: '10px' },
  inputRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' },
  inputIcon: { fontSize: '24px', flexShrink: 0 },
  inputInfo: { flex: 1 },
  inputLabel: { fontSize: '12px', color: '#6b7f6b', marginBottom: '4px' },
  inputField: { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 12px', color: '#e8f0e8', fontSize: '15px', fontFamily: "'DM Sans',sans-serif", outline: 'none' },
  inputUnit: { fontSize: '12px', color: '#4a5f4a', flexShrink: 0 },
  syncBtn: { width: '100%', padding: '16px', background: 'linear-gradient(135deg,#4ade80,#22c55e)', border: 'none', borderRadius: '16px', color: '#0a1f0a', fontSize: '15px', fontWeight: '600', fontFamily: "'DM Sans',sans-serif", cursor: 'pointer', marginBottom: '16px' },
  summaryGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' },
  summaryCard: (color) => ({ background: `rgba(${color},0.06)`, border: `1px solid rgba(${color},0.2)`, borderRadius: '16px', padding: '16px', textAlign: 'center' }),
  summaryIcon: { fontSize: '24px', marginBottom: '8px' },
  summaryVal: (color) => ({ fontSize: '22px', fontWeight: '600', color: `rgb(${color})` }),
  summaryLabel: { fontSize: '11px', color: '#4a5f4a', marginTop: '3px' },
  summaryStatus: (good) => ({ fontSize: '11px', color: good ? '#4ade80' : '#f87171', marginTop: '4px' }),
  successCard: { background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: '16px', padding: '20px', textAlign: 'center', marginBottom: '20px' },
  successIcon: { fontSize: '36px', marginBottom: '10px' },
  successText: { fontSize: '15px', fontWeight: '600', color: '#4ade80', marginBottom: '6px' },
  successSub: { fontSize: '12px', color: '#4a5f4a' },
  historyCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '14px 16px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' },
  histDate: { fontSize: '12px', color: '#4a5f4a', marginTop: '2px', fontFamily: 'monospace' },
  histTitle: { fontSize: '13px', fontWeight: '500', color: '#c8e6c8' },
  tabRow: { display: 'flex', gap: '8px', padding: '0 24px 20px' },
  tab: (a) => ({ flex: 1, padding: '10px', borderRadius: '12px', border: `1px solid ${a ? '#4ade80' : 'rgba(255,255,255,0.06)'}`, background: a ? '#4ade80' : 'transparent', color: a ? '#0a1f0a' : '#6b7f6b', fontSize: '13px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontWeight: a ? '600' : '400', textAlign: 'center' }),
  aiInsightCard: { background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '16px', padding: '16px', marginBottom: '16px' },
  aiLabel: { fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4ade80', fontWeight: '600', marginBottom: '10px' },
  aiText: { fontSize: '13px', color: '#8fa88f', lineHeight: 1.7 },
};

const HISTORY = [
  { date: '2026.05.12', steps: 8432, heart: 72, sleep: 7.2, calories: 1842, oxygen: 98 },
  { date: '2026.05.11', steps: 6219, heart: 76, sleep: 6.8, calories: 2100, oxygen: 97 },
  { date: '2026.05.10', steps: 10234, heart: 68, sleep: 8.1, calories: 1650, oxygen: 99 },
];

export default function HealthSyncPage({ onBack }) {
  const [activeTab, setActiveTab] = useState('sync');
  const [steps, setSteps] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [sleep, setSleep] = useState('');
  const [calories, setCalories] = useState('');
  const [oxygen, setOxygen] = useState('');
  const [stress, setStress] = useState('');
  const [synced, setSynced] = useState(false);
  const [syncedData, setSyncedData] = useState(null);

  const handleSync = () => {
    if (!steps && !heartRate && !sleep && !calories) {
      return alert('Please enter at least one health metric!');
    }
    setSyncedData({ steps, heartRate, sleep, calories, oxygen, stress });
    setSynced(true);
    setActiveTab('summary');
  };

  const getStepStatus = (s) => parseInt(s) >= 10000 ? 'Goal reached! 🎉' : `${10000 - parseInt(s)} steps to goal`;
  const getHeartStatus = (h) => parseInt(h) < 60 ? 'Low — consult doctor' : parseInt(h) > 100 ? 'High — rest needed' : 'Normal range ✅';
  const getSleepStatus = (s) => parseFloat(s) >= 7 ? 'Great sleep! ✅' : 'Need more sleep';
  const getOxygenStatus = (o) => parseInt(o) >= 95 ? 'Normal ✅' : 'Low — see doctor';

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap'); * { box-sizing: border-box; }`}</style>
      <div style={s.app}>
        <div style={s.header}>
          <div style={s.backBtn} onClick={onBack}>←</div>
          <div style={s.headerTitle}>⌚ Health Sync</div>
          <div style={s.pill}>Apple Health</div>
        </div>

        <div style={s.appleCard}>
          <div style={s.appleIcon}>❤️</div>
          <div style={s.appleInfo}>
            <div style={s.appleTitle}>Apple Health</div>
            <div style={s.appleSub}>Import your daily health data</div>
          </div>
          <div style={s.connectedBadge}>● Connected</div>
        </div>

        <div style={s.tabRow}>
          <button style={s.tab(activeTab === 'sync')} onClick={() => setActiveTab('sync')}>📥 Import</button>
          <button style={s.tab(activeTab === 'summary')} onClick={() => setActiveTab('summary')}>📊 Summary</button>
          <button style={s.tab(activeTab === 'history')} onClick={() => setActiveTab('history')}>🕐 History</button>
        </div>

        {activeTab === 'sync' && (
          <div style={s.section}>
            <div style={s.sectionLabel}>✦ Enter Today's Health Data</div>

            <div style={s.inputCard}>
              <div style={s.inputRow}>
                <div style={s.inputIcon}>👟</div>
                <div style={s.inputInfo}>
                  <div style={s.inputLabel}>Steps Today</div>
                  <input style={s.inputField} type="number" placeholder="e.g. 8432" value={steps} onChange={e => setSteps(e.target.value)} />
                </div>
                <div style={s.inputUnit}>steps</div>
              </div>

              <div style={s.inputRow}>
                <div style={s.inputIcon}>❤️</div>
                <div style={s.inputInfo}>
                  <div style={s.inputLabel}>Heart Rate</div>
                  <input style={s.inputField} type="number" placeholder="e.g. 72" value={heartRate} onChange={e => setHeartRate(e.target.value)} />
                </div>
                <div style={s.inputUnit}>bpm</div>
              </div>

              <div style={s.inputRow}>
                <div style={s.inputIcon}>😴</div>
                <div style={s.inputInfo}>
                  <div style={s.inputLabel}>Sleep Duration</div>
                  <input style={s.inputField} type="number" placeholder="e.g. 7.5" value={sleep} onChange={e => setSleep(e.target.value)} />
                </div>
                <div style={s.inputUnit}>hrs</div>
              </div>

              <div style={s.inputRow}>
                <div style={s.inputIcon}>🔥</div>
                <div style={s.inputInfo}>
                  <div style={s.inputLabel}>Calories Burned</div>
                  <input style={s.inputField} type="number" placeholder="e.g. 450" value={calories} onChange={e => setCalories(e.target.value)} />
                </div>
                <div style={s.inputUnit}>kcal</div>
              </div>

              <div style={s.inputRow}>
                <div style={s.inputIcon}>🩸</div>
                <div style={s.inputInfo}>
                  <div style={s.inputLabel}>Blood Oxygen</div>
                  <input style={s.inputField} type="number" placeholder="e.g. 98" value={oxygen} onChange={e => setOxygen(e.target.value)} />
                </div>
                <div style={s.inputUnit}>%</div>
              </div>

              <div style={{ ...s.inputRow, marginBottom: 0 }}>
                <div style={s.inputIcon}>🧘</div>
                <div style={s.inputInfo}>
                  <div style={s.inputLabel}>Stress Level</div>
                  <input style={s.inputField} type="number" placeholder="1-10 (1=low, 10=high)" value={stress} onChange={e => setStress(e.target.value)} />
                </div>
                <div style={s.inputUnit}>/10</div>
              </div>
            </div>

            <button style={s.syncBtn} onClick={handleSync}>
              ⌚ Sync to App →
            </button>
          </div>
        )}

        {activeTab === 'summary' && (
          <div style={s.section}>
            {synced && syncedData && (
              <>
                <div style={s.successCard}>
                  <div style={s.successIcon}>✅</div>
                  <div style={s.successText}>Health data synced!</div>
                  <div style={s.successSub}>Your Profile & Progress pages are updated</div>
                </div>

                <div style={s.sectionLabel}>✦ Today's Health Summary</div>
                <div style={s.summaryGrid}>
                  {syncedData.steps && (
                    <div style={s.summaryCard('74,222,128')}>
                      <div style={s.summaryIcon}>👟</div>
                      <div style={s.summaryVal('74,222,128')}>{parseInt(syncedData.steps).toLocaleString()}</div>
                      <div style={s.summaryLabel}>Steps</div>
                      <div style={s.summaryStatus(parseInt(syncedData.steps) >= 10000)}>{getStepStatus(syncedData.steps)}</div>
                    </div>
                  )}
                  {syncedData.heartRate && (
                    <div style={s.summaryCard('239,68,68')}>
                      <div style={s.summaryIcon}>❤️</div>
                      <div style={s.summaryVal('239,68,68')}>{syncedData.heartRate}</div>
                      <div style={s.summaryLabel}>Heart Rate (bpm)</div>
                      <div style={s.summaryStatus(parseInt(syncedData.heartRate) >= 60 && parseInt(syncedData.heartRate) <= 100)}>{getHeartStatus(syncedData.heartRate)}</div>
                    </div>
                  )}
                  {syncedData.sleep && (
                    <div style={s.summaryCard('96,165,250')}>
                      <div style={s.summaryIcon}>😴</div>
                      <div style={s.summaryVal('96,165,250')}>{syncedData.sleep}</div>
                      <div style={s.summaryLabel}>Sleep (hrs)</div>
                      <div style={s.summaryStatus(parseFloat(syncedData.sleep) >= 7)}>{getSleepStatus(syncedData.sleep)}</div>
                    </div>
                  )}
                  {syncedData.calories && (
                    <div style={s.summaryCard('251,191,36')}>
                      <div style={s.summaryIcon}>🔥</div>
                      <div style={s.summaryVal('251,191,36')}>{syncedData.calories}</div>
                      <div style={s.summaryLabel}>Calories Burned</div>
                      <div style={s.summaryStatus(parseInt(syncedData.calories) >= 300)}>
                        {parseInt(syncedData.calories) >= 300 ? 'Active day! ✅' : 'Try to move more'}
                      </div>
                    </div>
                  )}
                  {syncedData.oxygen && (
                    <div style={s.summaryCard('74,222,128')}>
                      <div style={s.summaryIcon}>🩸</div>
                      <div style={s.summaryVal('74,222,128')}>{syncedData.oxygen}%</div>
                      <div style={s.summaryLabel}>Blood Oxygen</div>
                      <div style={s.summaryStatus(parseInt(syncedData.oxygen) >= 95)}>{getOxygenStatus(syncedData.oxygen)}</div>
                    </div>
                  )}
                  {syncedData.stress && (
                    <div style={s.summaryCard(parseInt(syncedData.stress) <= 4 ? '74,222,128' : '239,68,68')}>
                      <div style={s.summaryIcon}>🧘</div>
                      <div style={s.summaryVal(parseInt(syncedData.stress) <= 4 ? '74,222,128' : '239,68,68')}>{syncedData.stress}/10</div>
                      <div style={s.summaryLabel}>Stress Level</div>
                      <div style={s.summaryStatus(parseInt(syncedData.stress) <= 4)}>
                        {parseInt(syncedData.stress) <= 4 ? 'Low stress ✅' : parseInt(syncedData.stress) <= 7 ? 'Moderate stress' : 'High stress ⚠️'}
                      </div>
                    </div>
                  )}
                </div>

                <div style={s.aiInsightCard}>
                  <div style={s.aiLabel}>🤖 AI Health Insight</div>
                  <div style={s.aiText}>
                    {parseInt(syncedData.steps) >= 10000
                      ? '🎉 Amazing! You hit your step goal today. Keep it up!'
                      : parseInt(syncedData.steps) >= 5000
                      ? '👍 Good effort! Try a 15-min evening walk to hit 10,000 steps.'
                      : '⚠️ Low activity today. Even a 20-min walk can boost your energy and metabolism significantly.'}
                    {syncedData.sleep && parseFloat(syncedData.sleep) < 7
                      ? ' Your sleep is below optimal — try sleeping 30 mins earlier tonight.'
                      : syncedData.sleep ? ' Great sleep duration!' : ''}
                    {syncedData.stress && parseInt(syncedData.stress) >= 7
                      ? ' High stress detected — try 5 mins of deep breathing or a short walk.'
                      : ''}
                  </div>
                </div>
              </>
            )}
            {!synced && (
              <div style={{ textAlign: 'center', padding: '40px 24px', color: '#4a5f4a' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>⌚</div>
                <div style={{ fontSize: '15px', color: '#6b7f6b' }}>No data synced yet</div>
                <div style={{ fontSize: '13px', marginTop: '8px' }}>Go to Import tab to enter your health data</div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div style={s.section}>
            <div style={s.sectionLabel}>✦ Past 3 Days</div>
            {HISTORY.map((h, i) => (
              <div key={i} style={s.historyCard}>
                <div style={{ fontSize: '24px' }}>📅</div>
                <div style={{ flex: 1 }}>
                  <div style={s.histTitle}>{h.date}</div>
                  <div style={s.histDate}>👟 {h.steps.toLocaleString()} · ❤️ {h.heart}bpm · 😴 {h.sleep}hrs</div>
                </div>
                <div style={{ fontSize: '12px', color: h.steps >= 8000 ? '#4ade80' : '#fbbf24' }}>
                  {h.steps >= 8000 ? '✅' : '⚠️'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
