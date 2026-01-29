import IsraelMap from "./components/IsraelMap";

const tabs = [
  { title: "ניהול תיקי רכב", desc: "כל נתוני הרכבים במקום אחד." },
  { title: "ניהול תיקי נהג", desc: "פרופילים, רישיונות והיסטוריה." },
  { title: "ניהול ספקים", desc: "חוזים, שירותים והתקשרויות." },
  { title: "מערכת הזמנות", desc: "ניהול בקשות ונסיעות." },
  { title: "פתרון בקרה להנהלה הבכירה", desc: "דוחות, KPI ותובנות." },
  { title: "אזור אישי לנהגים", desc: "משימות, מסמכים ועדכונים." },
  { title: "ניהול הוצאות", desc: "מעקב, תקציבים והתראות." },
  { title: "מפה", desc: "כניסות פעילות לפי אזור בארץ." }
];

const kpis = [
  { label: "רכבים פעילים", value: "128" },
  { label: "נהגים רשומים", value: "312" },
  { label: "הוצאות החודש", value: "₪ 284,000" }
];

export default function Home() {
  return (
    <div className="page">
      <header className="hero">
        <div className="hero-content">
          <p className="eyebrow">FleetControl</p>
          <h1>מערכת לניהול צי רכב</h1>
          <p className="subtitle">
            ניהול חכם של צי, נהגים וספקים עם תצוגה נוחה להנהלה.
          </p>
          <div className="hero-actions">
            <button className="primary">צפייה בדשבורד</button>
            <button className="ghost">הורדת דוחות</button>
          </div>
        </div>
        <div className="hero-card">
          <h3>סטטוס מהיר</h3>
          <div className="kpi-grid">
            {kpis.map((item) => (
              <div className="kpi" key={item.label}>
                <span className="kpi-label">{item.label}</span>
                <span className="kpi-value">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="hint">* הנתונים לדוגמה בלבד</div>
        </div>
      </header>

      <section className="dashboard">
        <aside className="dashboard-nav">
          <div className="brand">
            <span className="brand-dot" />
            <span>Orion Fleet</span>
          </div>
          <nav className="nav-links">
            <button className="nav-item active">Dashboard</button>
            <button className="nav-item">Analytics</button>
            <button className="nav-item">Fleet</button>
            <button className="nav-item">Drivers</button>
            <button className="nav-item">Suppliers</button>
            <button className="nav-item">Reports</button>
          </nav>
          <div className="nav-footer">ממשק מנהלים</div>
        </aside>

        <div className="dashboard-content">
          <div className="dashboard-top">
            <h2>צפייה בדשבורד</h2>
            <button className="secondary">יצוא דוחות</button>
          </div>

          <div className="dashboard-grid">
            <div className="dash-card wide">
              <h3>נסיעות חודשיות</h3>
              <div className="bar-chart">
                {["72", "95", "88", "110", "96", "120", "134"].map((h) => (
                  <span key={h} style={{ height: `${h}px` }} />
                ))}
              </div>
            </div>
            <div className="dash-card">
              <h3>נהגים פעילים</h3>
              <div className="metric">1,275</div>
              <p>+4.2% מהחודש הקודם</p>
            </div>
            <div className="dash-card">
              <h3>רכבים בשטח</h3>
              <div className="metric">842</div>
              <p>זמינות: 96%</p>
            </div>
            <div className="dash-card">
              <h3>דלק והוצאות</h3>
              <div className="line-chart">
                <span className="line" />
              </div>
              <p>מגמת ירידה שבועית</p>
            </div>
            <div className="dash-card">
              <h3>התראות בטיחות</h3>
              <div className="badge-grid">
                <span>בלימות חדות</span>
                <span>מהירות חריגה</span>
                <span>עייפות נהג</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2>לשוניות מרכזיות</h2>
            <p>כל האזורים החשובים במערכת, זמינים בלחיצה אחת.</p>
          </div>
          <button className="secondary">התאמת תצוגה</button>
        </div>

        <div className="tabs-grid">
          {tabs.map((tab) => (
            <button className="tab" key={tab.title}>
              <div className="tab-title">{tab.title}</div>
              <div className="tab-desc">{tab.desc}</div>
              <span className="tab-action">פתיחה</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section map-section">
        <div className="section-header">
          <div>
            <h2>מפה</h2>
            <p>תצוגת כניסות פעילות על גבי מפת ישראל.</p>
          </div>
          <button className="secondary">תצוגת שכבות</button>
        </div>
        <div className="map-card">
          <div className="map-wrapper">
            <IsraelMap />
          </div>
          <div className="map-legend">
            <h3>כניסות בזמן אמת</h3>
            <div className="legend-row">
              <span className="legend-dot" /> חיפה · 42
            </div>
            <div className="legend-row">
              <span className="legend-dot" /> תל אביב · 88
            </div>
            <div className="legend-row">
              <span className="legend-dot" /> ירושלים · 65
            </div>
            <div className="legend-row">
              <span className="legend-dot" /> באר שבע · 31
            </div>
            <div className="legend-row">
              <span className="legend-dot" /> אילת · 12
            </div>
          </div>
        </div>
      </section>

      <section className="section upload-section">
        <div className="section-header">
          <div>
            <h2>העלאת דוחות ומסמכים</h2>
            <p>לחץ כדי לבחור קבצים ולשמור אותם במערכת.</p>
          </div>
        </div>
        <label className="upload-card">
          <input type="file" multiple />
          <div className="upload-title">בחר קבצים</div>
          <div className="upload-desc">PDF, Excel, Word ועוד</div>
        </label>
      </section>

      <section className="section dark">
        <div className="section-header">
          <div>
            <h2>יכולות מערכת</h2>
            <p>תפעול יומיומי עם בקרה מתקדמת ואזור אישי לנהגים.</p>
          </div>
          <button className="ghost light">מרכז התמיכה</button>
        </div>
        <div className="features">
          <div className="feature-card">
            <h3>התראות חכמות</h3>
            <p>זיהוי חריגות בהוצאות ובפעילות בזמן אמת.</p>
          </div>
          <div className="feature-card">
            <h3>דוחות הנהלה</h3>
            <p>מדדי KPI, השוואות חודשיות ותובנות ניהוליות.</p>
          </div>
          <div className="feature-card">
            <h3>ניהול נהגים</h3>
            <p>מסמכים, משימות והודעות באזור אישי מסודר.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>© 2026 FleetControl</div>
        <div className="footer-actions">
          <button className="ghost">תנאי שימוש</button>
          <button className="ghost">יצירת קשר</button>
        </div>
      </footer>
    </div>
  );
}
