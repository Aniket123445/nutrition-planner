import React, { useState } from 'react';

const s = {
  app: { fontFamily: "'DM Sans', sans-serif", maxWidth: '420px', margin: '0 auto', minHeight: '100vh', background: '#0d130d', color: '#e8f0e8', paddingBottom: '40px', position: 'relative', overflowX: 'hidden' },
  orb: { position: 'absolute', width: '280px', height: '280px', background: 'radial-gradient(circle,rgba(34,197,94,0.1) 0%,transparent 70%)', borderRadius: '50%', top: '-60px', right: '-80px', pointerEvents: 'none' },
  header: { padding: '40px 24px 20px', display: 'flex', alignItems: 'center', gap: '12px' },
  backBtn: { width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', color: '#e8f0e8' },
  headerTitle: { fontSize: '18px', fontWeight: '600', color: '#f0faf0', display: 'flex', alignItems: 'center', gap: '10px' },
  pill: { fontSize: '11px', color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', padding: '4px 12px', borderRadius: '100px', marginLeft: 'auto' },
  periodTabs: { display: 'flex', gap: '6px', padding: '0 24px 20px' },
  periodTab: (a) => ({ flex: 1, padding: '8px', borderRadius: '10px', border: `1px solid ${a ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.06)'}`, background: a ? 'rgba(74,222,128,0.08)' : 'transparent', color: a ? '#4ade80' : '#4a5f4a', fontSize: '12px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", textAlign: 'center' }),
  summaryGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '0 24px 20px' },
  summaryCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px' },
  summaryIcon: { fontSize: '20px', marginBottom: '8px' },
  summaryVal: { fontSize: '22px', fontWeight: '600', color: '#4ade80' },
  summaryLabel: { fontSize: '11px', color: '#4a5f4a', marginTop: '3px' },
  summaryChange: (good) => ({ fontSize: '11px', color: good ? '#4ade80' : '#f87171', marginTop: '4px' }),
  section: { padding: '0 24px 20px' },
  sectionLabel: { fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4ade80', fontWeight: '600', marginBottom: '14px' },
  chartCard: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px', marginBottom: '14px' },
  chartTitle: { fontSize: '13px', fontWeight: '500', color: '#c8e6c8', marginBottom: '14px' },
  barChart: { display: 'flex', alignItems: 'flex-end', gap: '6px', height: '80px' },
  barWrap: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' },
  bar: (h, active) => ({ width: '100%', height: `${h}%`, borderRadius: '4px 4px 0 0', background: active ? '#4ade80' : 'rgba(74,222,128,0.3)' }),
  barLabel: { fontSize: '10px', color: '#3a5f3a' },
  macroBarWrap: { marginBottom: '12px' },
  macroName: { fontSize: '12px', color: '#8fa88f', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' },
  macroTrack: { height: '6px', background: 'rgba(255,255,255,0.07)', borderRadius: '100px', overflow: 'hidden' },
  macroFill: (w, color) => ({ height: '100%', width: `${w}%`, borderRadius: '100px', background: color }),
  mealCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '14px 16px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' },
  mealIcon: { fontSize: '22px' },
  mealName: { fontSize: '13px', fontWeight: '500', color: '#c8e6c8' },
  mealTime: { fontSize: '11px', color: '#3a5f3a', marginTop: '2px' },
  mealCal: { fontSize: '13px', fontWeight: '600', color: '#4ade80', marginLeft: 'auto' },
  streakCard: { background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' },
  streakNum: { fontSize: '36px', fontWeight: '600', color: '#4ade80' },
  streakLabel: { fontSize: '13px', fontWeight: '500', color: '#c8e6c8' },
  streakSub: { fontSize: '12px', color: '#4a5f4a', marginTop: '3px' },
  weekDots: { display: 'flex', gap: '6px', marginTop: '10px' },
  weekDot: (done) => ({ width: '28px', height: '28px', borderRadius: '50%', background: done ? '#4ade80' : 'rgba(74,222,128,0.1)', border: `1px solid ${done ? '#4ade80' : 'rgba(74,222,128,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: done ? '#0a1f0a' : '#4a5f4a', fontWeight: done ? '600' : '400' }),
};

const WEEK_DATA = {
  Week: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], values: [65, 80, 55, 90, 72, 40, 30], activeIndex: 4 },
  Month: { labels: ['W1', 'W2', 'W3', 'W4'], values: [70, 65, 80, 72], activeIndex: 3 },
  '3 Months': { labels: ['Jan', 'Feb', 'Mar'], values: [60, 75, 72], activeIndex: 2 },
};

const MEALS = [
  { icon: '🌅', name: 'Poha + Masala Chai', time: 'Today · 8:30 AM', cal: 280 },
  { icon: '☀️', name: 'Dal + Roti + Sabzi', time: 'Today · 1:00 PM', cal: 520 },
  { icon: '🌙', name: 'Khichdi + Raita', time: 'Yesterday · 8:00 PM', cal: 380 },
  { icon: '🌅', name: 'Idli + Sambar', time: 'Yesterday · 8:00 AM', cal: 220 },
];

const LogoSVG = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
    <rect x="6" y="30" width="8" height="12" rx="2" fill="none" stroke="#4ade80" strokeWidth="1.5"/>
    <rect x="20" y="20" width="8" height="22" rx="2" fill="#4ade80" opacity="0.5"/>
    <rect x="34" y="10" width="8" height="32" rx="2" fill="#4ade80"/>
    <polyline points="10,28 24,18 38,8" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2"/>
  </svg>
);

export default function ProgressPage({ onBack }) {
  const [period, setPeriod] = useState('Week');
  const chart = WEEK_DATA[period];

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
      <div style={s.app}>
        <div style={s.orb} />

        <div style={s.header}>
          <div style={s.backBtn} onClick={onBack}>←</div>
          <div style={s.headerTitle}>
            <LogoSVG />
            Progress
          </div>
          <div style={s.pill}>This Week</div>
        </div>

        <div style={s.periodTabs}>
          {['Week', 'Month', '3 Months'].map(p => (
            <button key={p} style={s.periodTab(period === p)} onClick={() => setPeriod(p)}>{p}</button>
          ))}
        </div>

        <div style={s.summaryGrid}>
          <div style={s.summaryCard}>
            <div style={s.summaryIcon}>🔥</div>
            <div style={s.summaryVal}>1,842</div>
            <div style={s.summaryLabel}>Avg. Calories/day</div>
            <div style={s.summaryChange(true)}>↓ 120 from last week</div>
          </div>
          <div style={s.summaryCard}>
            <div style={s.summaryIcon}>💪</div>
            <div style={s.summaryVal}>64g</div>
            <div style={s.summaryLabel}>Avg. Protein/day</div>
            <div style={s.summaryChange(true)}>↑ 8g from last week</div>
          </div>
          <div style={s.summaryCard}>
            <div style={s.summaryIcon}>🥗</div>
            <div style={s.summaryVal}>18</div>
            <div style={s.summaryLabel}>Meals Logged</div>
            <div style={s.summaryChange(true)}>↑ 3 from last week</div>
          </div>
          <div style={s.summaryCard}>
            <div style={s.summaryIcon}>⚖️</div>
            <div style={s.summaryVal}>71.2</div>
            <div style={s.summaryLabel}>Weight (kg)</div>
            <div style={s.summaryChange(false)}>↑ 0.2 from last week</div>
          </div>
        </div>

        <div style={s.section}>
          <div style={s.sectionLabel}>✦ Daily Calories</div>
          <div style={s.chartCard}>
            <div style={s.chartTitle}>Calorie intake — {period}</div>
            <div style={s.barChart}>
              {chart.labels.map((label, i) => (
                <div key={label} style={s.barWrap}>
                  <div style={s.bar(chart.values[i], i === chart.activeIndex)} />
                  <div style={s.barLabel}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={s.sectionLabel}>✦ Macro Balance (today)</div>
          <div style={s.chartCard}>
            <div style={s.macroBarWrap}>
              <div style={s.macroName}><span>Carbohydrates</span><span style={{ color: '#4ade80' }}>240g / 300g</span></div>
              <div style={s.macroTrack}><div style={s.macroFill(80, '#4ade80')} /></div>
            </div>
            <div style={s.macroBarWrap}>
              <div style={s.macroName}><span>Protein</span><span style={{ color: '#60a5fa' }}>64g / 80g</span></div>
              <div style={s.macroTrack}><div style={s.macroFill(80, '#60a5fa')} /></div>
            </div>
            <div style={s.macroBarWrap}>
              <div style={s.macroName}><span>Fats</span><span style={{ color: '#fbbf24' }}>48g / 60g</span></div>
              <div style={s.macroTrack}><div style={s.macroFill(80, '#fbbf24')} /></div>
            </div>
            <div style={{ ...s.macroBarWrap, marginBottom: 0 }}>
              <div style={s.macroName}><span>Fiber</span><span style={{ color: '#f87171' }}>12g / 30g</span></div>
              <div style={s.macroTrack}><div style={s.macroFill(40, '#f87171')} /></div>
            </div>
          </div>

          <div style={s.sectionLabel}>✦ Streak</div>
          <div style={s.streakCard}>
            <div style={s.streakNum}>🔥 5</div>
            <div>
              <div style={s.streakLabel}>Day streak!</div>
              <div style={s.streakSub}>Keep logging meals daily</div>
              <div style={s.weekDots}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <div key={i} style={s.weekDot(i < 5)}>{d}</div>
                ))}
              </div>
            </div>
          </div>

          <div style={s.sectionLabel}>✦ Recent Meals</div>
          {MEALS.map((m, i) => (
            <div key={i} style={s.mealCard}>
              <div style={s.mealIcon}>{m.icon}</div>
              <div>
                <div style={s.mealName}>{m.name}</div>
                <div style={s.mealTime}>{m.time}</div>
              </div>
              <div style={s.mealCal}>{m.cal} kcal</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
