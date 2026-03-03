import { useState, useRef, useEffect, useCallback } from "react";

// ── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --sage: #7A9E7E;
      --sage-light: #A8C4AB;
      --sage-pale: #D4E6D5;
      --sage-deep: #4A7A50;
      --beige: #F5F0E8;
      --beige-dark: #EDE5D6;
      --beige-mid: #D9CEBC;
      --cream: #FAFAF7;
      --bark: #6B5E4E;
      --bark-light: #9C8B79;
      --charcoal: #2C2C2C;
      --charcoal-mid: #444444;
      --warm-white: #FEFEFE;
      --error: #C0392B;
      --gold: #C9A84C;
      --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
      --shadow-md: 0 8px 32px rgba(0,0,0,0.10);
      --shadow-lg: 0 20px 60px rgba(0,0,0,0.14);
      --radius: 16px;
      --radius-sm: 10px;
      --radius-xs: 6px;
      --transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
    }

    [data-theme="dark"] {
      --beige: #1E1E1A;
      --beige-dark: #252520;
      --beige-mid: #333330;
      --cream: #16161A;
      --bark: #C9B89A;
      --bark-light: #A89278;
      --charcoal: #F0EDE6;
      --charcoal-mid: #C8C4BC;
      --warm-white: #1A1A18;
      --shadow-sm: 0 2px 8px rgba(0,0,0,0.3);
      --shadow-md: 0 8px 32px rgba(0,0,0,0.4);
      --shadow-lg: 0 20px 60px rgba(0,0,0,0.5);
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--cream);
      color: var(--charcoal);
      min-height: 100vh;
      transition: background 0.3s ease, color 0.3s ease;
    }

    h1, h2, h3, h4 {
      font-family: 'Fraunces', serif;
      font-weight: 400;
      line-height: 1.15;
    }

    .mono { font-family: 'DM Mono', monospace; }

    /* ── SCROLLBAR ── */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--beige-mid); border-radius: 3px; }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes slideIn {
      from { transform: translateX(-100%); opacity: 0; }
      to   { transform: translateX(0); opacity: 1; }
    }
    @keyframes scaleIn {
      from { transform: scale(0.95); opacity: 0; }
      to   { transform: scale(1); opacity: 1; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    .animate-fade-up { animation: fadeUp 0.6s ease forwards; }
    .animate-fade-up-delay-1 { animation: fadeUp 0.6s ease 0.1s both; }
    .animate-fade-up-delay-2 { animation: fadeUp 0.6s ease 0.2s both; }
    .animate-fade-up-delay-3 { animation: fadeUp 0.6s ease 0.3s both; }
    .animate-fade-up-delay-4 { animation: fadeUp 0.6s ease 0.4s both; }
    .animate-fade-up-delay-5 { animation: fadeUp 0.6s ease 0.5s both; }
    .animate-scale-in { animation: scaleIn 0.3s ease forwards; }
    .animate-float { animation: float 4s ease-in-out infinite; }

    /* ── BUTTONS ── */
    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 24px; border-radius: var(--radius-sm);
      font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
      cursor: pointer; border: none; transition: var(--transition);
      text-decoration: none; white-space: nowrap;
    }
    .btn-primary {
      background: var(--sage); color: white;
    }
    .btn-primary:hover {
      background: var(--sage-deep); transform: translateY(-1px);
      box-shadow: 0 8px 24px rgba(74,122,80,0.35);
    }
    .btn-secondary {
      background: var(--beige-dark); color: var(--charcoal);
    }
    .btn-secondary:hover { background: var(--beige-mid); }
    .btn-outline {
      background: transparent; color: var(--charcoal);
      border: 1.5px solid var(--beige-mid);
    }
    .btn-outline:hover { border-color: var(--sage); color: var(--sage); }
    .btn-ghost {
      background: transparent; color: var(--charcoal-mid);
    }
    .btn-ghost:hover { background: var(--beige-dark); color: var(--charcoal); }
    .btn-danger {
      background: var(--error); color: white;
    }
    .btn-sm { padding: 8px 16px; font-size: 13px; }
    .btn-lg { padding: 16px 32px; font-size: 16px; }
    .btn-xl { padding: 18px 40px; font-size: 17px; border-radius: var(--radius); }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; }

    /* ── CARDS ── */
    .card {
      background: var(--warm-white); border-radius: var(--radius);
      border: 1px solid var(--beige-mid); box-shadow: var(--shadow-sm);
      transition: var(--transition);
    }
    .card:hover { box-shadow: var(--shadow-md); }

    /* ── INPUT ── */
    .input {
      width: 100%; padding: 12px 16px; border-radius: var(--radius-sm);
      border: 1.5px solid var(--beige-mid); background: var(--beige);
      font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--charcoal);
      transition: var(--transition); outline: none;
    }
    .input:focus { border-color: var(--sage); box-shadow: 0 0 0 3px rgba(122,158,126,0.15); }
    .input::placeholder { color: var(--bark-light); }

    /* ── BADGE ── */
    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 500;
    }
    .badge-sage { background: var(--sage-pale); color: var(--sage-deep); }
    .badge-gold { background: #FFF4D9; color: #96700A; }
    .badge-red { background: #FFE8E8; color: #C0392B; }

    /* ── LOADING SPINNER ── */
    .spinner {
      width: 20px; height: 20px; border: 2.5px solid rgba(255,255,255,0.3);
      border-top-color: white; border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    .spinner-dark {
      border-color: var(--beige-mid); border-top-color: var(--sage);
    }

    /* ── PROGRESS BAR ── */
    .progress-bar {
      height: 4px; background: var(--beige-mid); border-radius: 2px; overflow: hidden;
    }
    .progress-fill {
      height: 100%; background: linear-gradient(90deg, var(--sage), var(--sage-light));
      border-radius: 2px; transition: width 0.4s ease;
    }

    /* ── SKELETON ── */
    .skeleton {
      background: linear-gradient(90deg, var(--beige-dark) 25%, var(--beige-mid) 50%, var(--beige-dark) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: var(--radius-sm);
    }

    /* ── TOGGLE ── */
    .toggle {
      position: relative; width: 44px; height: 24px;
      background: var(--beige-mid); border-radius: 12px; cursor: pointer;
      transition: var(--transition); border: none; flex-shrink: 0;
    }
    .toggle.active { background: var(--sage); }
    .toggle::after {
      content: ''; position: absolute; top: 3px; left: 3px;
      width: 18px; height: 18px; background: white; border-radius: 9px;
      transition: var(--transition); box-shadow: var(--shadow-sm);
    }
    .toggle.active::after { left: 23px; }

    /* ── SLIDER ── */
    .slider {
      width: 100%; height: 4px; border-radius: 2px;
      background: var(--beige-mid); appearance: none; cursor: pointer;
      outline: none;
    }
    .slider::-webkit-slider-thumb {
      appearance: none; width: 18px; height: 18px; border-radius: 9px;
      background: var(--sage); border: 2px solid white; box-shadow: var(--shadow-sm);
    }

    /* ── MODAL BACKDROP ── */
    .modal-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.5);
      backdrop-filter: blur(4px); z-index: 1000;
      display: flex; align-items: center; justify-content: center;
      padding: 24px; animation: fadeIn 0.2s ease;
    }
    .modal-box {
      background: var(--warm-white); border-radius: calc(var(--radius) + 4px);
      border: 1px solid var(--beige-mid); box-shadow: var(--shadow-lg);
      width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto;
      animation: scaleIn 0.25s ease;
    }

    /* ── TOAST ── */
    .toast-container {
      position: fixed; bottom: 24px; right: 24px;
      display: flex; flex-direction: column; gap: 8px; z-index: 9999;
    }
    .toast {
      padding: 14px 20px; border-radius: var(--radius-sm);
      background: var(--charcoal); color: white;
      font-size: 14px; box-shadow: var(--shadow-lg);
      animation: slideIn 0.3s ease;
      display: flex; align-items: center; gap: 10px;
      max-width: 320px;
    }
    .toast.success { background: var(--sage-deep); }
    .toast.error { background: var(--error); }
    .toast.warning { background: #C9A84C; }

    /* ── DRAG-DROP ZONE ── */
    .drop-zone {
      border: 2px dashed var(--beige-mid); border-radius: var(--radius);
      background: var(--beige); transition: var(--transition);
      cursor: pointer;
    }
    .drop-zone.active, .drop-zone:hover {
      border-color: var(--sage); background: var(--sage-pale);
    }

    /* ── NAV ── */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; height: 64px; z-index: 500;
      display: flex; align-items: center; padding: 0 40px;
      background: rgba(var(--cream-rgb, 250,250,247), 0.85);
      backdrop-filter: blur(16px) saturate(1.5);
      border-bottom: 1px solid var(--beige-dark);
      transition: var(--transition);
    }

    /* ── BEFORE/AFTER SLIDER ── */
    .before-after {
      position: relative; overflow: hidden; border-radius: var(--radius);
      cursor: ew-resize; user-select: none;
    }
    .before-after-divider {
      position: absolute; top: 0; bottom: 0; width: 2px;
      background: white; z-index: 10;
    }
    .before-after-handle {
      position: absolute; top: 50%; transform: translate(-50%, -50%);
      width: 36px; height: 36px; border-radius: 18px;
      background: white; box-shadow: var(--shadow-md);
      display: flex; align-items: center; justify-content: center;
      z-index: 11; font-size: 14px;
    }

    /* ── TOOL CARD ── */
    .tool-card {
      padding: 24px; border-radius: var(--radius); border: 1px solid var(--beige-mid);
      background: var(--warm-white); cursor: pointer; transition: var(--transition);
      position: relative; overflow: hidden;
    }
    .tool-card::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, var(--sage-pale) 0%, transparent 60%);
      opacity: 0; transition: var(--transition);
    }
    .tool-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); border-color: var(--sage-light); }
    .tool-card:hover::before { opacity: 1; }
    .tool-card.pro-locked { border-style: dashed; }

    /* ── PRICING ── */
    .pricing-card {
      padding: 36px; border-radius: calc(var(--radius) + 4px);
      border: 1.5px solid var(--beige-mid); background: var(--warm-white);
      transition: var(--transition); position: relative;
    }
    .pricing-card.featured {
      border-color: var(--sage); background: var(--sage);
      color: white;
    }
    .pricing-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }

    /* ── EDITOR WORKSPACE ── */
    .editor-workspace {
      display: flex; height: calc(100vh - 64px); overflow: hidden;
    }
    .editor-sidebar {
      width: 280px; flex-shrink: 0; border-right: 1px solid var(--beige-mid);
      background: var(--warm-white); overflow-y: auto;
      display: flex; flex-direction: column;
    }
    .editor-canvas {
      flex: 1; background: var(--beige); display: flex;
      align-items: center; justify-content: center; overflow: hidden;
      position: relative;
    }
    .editor-properties {
      width: 260px; flex-shrink: 0; border-left: 1px solid var(--beige-mid);
      background: var(--warm-white); overflow-y: auto; padding: 20px;
    }

    /* ── FILTER PREVIEW ── */
    .filter-thumb {
      width: 80px; border-radius: var(--radius-sm); overflow: hidden;
      cursor: pointer; transition: var(--transition); border: 2px solid transparent;
    }
    .filter-thumb:hover, .filter-thumb.active { border-color: var(--sage); transform: scale(1.05); }
    .filter-thumb img { width: 100%; height: 60px; object-fit: cover; display: block; }
    .filter-thumb span { display: block; font-size: 11px; text-align: center; padding: 4px 2px; color: var(--bark); }

    /* ── DASHBOARD ── */
    .dash-layout { display: flex; min-height: calc(100vh - 64px); }
    .dash-sidebar {
      width: 240px; flex-shrink: 0; border-right: 1px solid var(--beige-mid);
      background: var(--warm-white); padding: 24px 16px;
    }
    .dash-content { flex: 1; padding: 40px; overflow-y: auto; }
    .dash-nav-item {
      display: flex; align-items: center; gap: 12px; padding: 10px 14px;
      border-radius: var(--radius-sm); font-size: 14px; cursor: pointer;
      transition: var(--transition); color: var(--charcoal-mid);
    }
    .dash-nav-item:hover { background: var(--beige); color: var(--charcoal); }
    .dash-nav-item.active { background: var(--sage-pale); color: var(--sage-deep); font-weight: 500; }

    /* ── ADMIN ── */
    .stat-card {
      padding: 24px; border-radius: var(--radius); border: 1px solid var(--beige-mid);
      background: var(--warm-white);
    }
    .stat-card .stat-number {
      font-family: 'Fraunces', serif; font-size: 36px; font-weight: 300;
      color: var(--sage-deep); line-height: 1;
    }

    /* ── TABLE ── */
    .data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .data-table th {
      padding: 12px 16px; text-align: left; font-weight: 500;
      border-bottom: 1.5px solid var(--beige-mid); color: var(--bark);
      font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;
    }
    .data-table td { padding: 14px 16px; border-bottom: 1px solid var(--beige-dark); }
    .data-table tr:hover td { background: var(--beige); }

    /* ── HERO DECORATIVE ── */
    .hero-blob {
      position: absolute; border-radius: 60% 40% 70% 30% / 50% 60% 40% 70%;
      filter: blur(60px); opacity: 0.18;
      animation: float 8s ease-in-out infinite;
    }

    /* ── SECTION ── */
    .section { padding: 100px 40px; }
    .container { max-width: 1200px; margin: 0 auto; }

    /* ── RESPONSIVE ── */
    @media (max-width: 768px) {
      .nav { padding: 0 20px; }
      .section { padding: 60px 20px; }
      .editor-properties { display: none; }
      .dash-sidebar { width: 60px; }
      .dash-sidebar .dash-label { display: none; }
    }

    /* ── NOTIFICATION DOT ── */
    .notif-dot {
      width: 8px; height: 8px; background: var(--sage);
      border-radius: 4px; position: absolute; top: -2px; right: -2px;
    }

    /* ── TAB ── */
    .tab-bar { display: flex; border-bottom: 1px solid var(--beige-mid); margin-bottom: 24px; }
    .tab-item {
      padding: 12px 20px; cursor: pointer; font-size: 14px;
      color: var(--bark); border-bottom: 2px solid transparent;
      transition: var(--transition); margin-bottom: -1px;
    }
    .tab-item:hover { color: var(--charcoal); }
    .tab-item.active { color: var(--sage-deep); border-bottom-color: var(--sage); font-weight: 500; }

    /* ── RANGE SLIDER ── */
    input[type="range"] {
      -webkit-appearance: none; width: 100%; height: 4px;
      border-radius: 2px; background: var(--beige-mid); cursor: pointer;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none; width: 16px; height: 16px;
      border-radius: 8px; background: var(--sage);
      border: 2px solid white; box-shadow: var(--shadow-sm);
    }
  `}</style>
);

// ── ICONS ─────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 18, style = {} }) => {
  const icons = {
    sun: "☀️", moon: "🌙", menu: "☰", close: "✕",
    upload: "↑", download: "↓", magic: "✦",
    scissors: "✂", wand: "⊹", enhance: "◈",
    color: "◑", portrait: "◉", bg: "⬡",
    generate: "⊕", filter: "◫", crop: "⊞",
    before: "◁", after: "▷", star: "★",
    check: "✓", lock: "⊗", user: "○",
    dash: "⊟", admin: "⊞", logout: "→",
    history: "◷", saved: "◈", billing: "◈",
    settings: "⚙", arrow: "→", back: "←",
    plus: "+", minus: "−", trash: "⊘",
    edit: "✎", eye: "◎", search: "⊙",
    chart: "⟋", users: "◯", coupon: "◈",
    toggle: "◐", batch: "⊞", hd: "◈",
    watermark: "W", speed: "◈", rotate: "↻",
    flip: "⇄", layers: "⊟", zoom: "⊕",
    info: "ⓘ", warning: "⚠", success: "✓",
    google: "G", email: "✉", phone: "◈",
    blog: "✎", faq: "?", privacy: "◈",
    terms: "◈", about: "◈", contact: "◈"
  };
  return <span style={{ fontSize: size, lineHeight: 1, ...style }}>{icons[name] || "•"}</span>;
};

// ── TOAST SYSTEM ──────────────────────────────────────────────────────────────
const ToastContext = ({ toasts }) => (
  <div className="toast-container">
    {toasts.map(t => (
      <div key={t.id} className={`toast ${t.type || ''}`}>
        <span>{t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ⓘ'}</span>
        {t.message}
      </div>
    ))}
  </div>
);

// ── LOADING OVERLAY ───────────────────────────────────────────────────────────
const AILoader = ({ task = "Processing your image..." }) => (
  <div style={{
    position: 'absolute', inset: 0, background: 'rgba(250,250,247,0.92)',
    backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: 20, zIndex: 50,
    borderRadius: 'var(--radius)', animation: 'fadeIn 0.2s ease'
  }}>
    <div style={{ position: 'relative', width: 64, height: 64 }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        border: '3px solid var(--sage-pale)',
        borderTopColor: 'var(--sage)', animation: 'spin 1s linear infinite'
      }} />
      <div style={{
        position: 'absolute', inset: 8, borderRadius: '50%',
        border: '2px solid var(--sage-pale)',
        borderBottomColor: 'var(--sage-light)', animation: 'spin 0.6s linear infinite reverse'
      }} />
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontSize: 20
      }}>✦</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, marginBottom: 6 }}>AI at work</div>
      <div style={{ fontSize: 13, color: 'var(--bark)', animation: 'pulse 2s ease infinite' }}>{task}</div>
    </div>
    <div style={{ width: 200 }}>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: '70%' }} />
      </div>
    </div>
  </div>
);

// ── NAVBAR ────────────────────────────────────────────────────────────────────
const Navbar = ({ page, setPage, theme, setTheme, user, setUser, openModal }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'Home' },
    { id: 'editor', label: 'Editor' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'About' },
  ];

  return (
    <nav className="nav">
      {/* Logo */}
      <div
        onClick={() => setPage('landing')}
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginRight: 40 }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 10, background: 'var(--sage)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 16, fontWeight: 600
        }}>✦</div>
        <span style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 400 }}>PixelMind</span>
        <span className="badge badge-sage" style={{ fontSize: 10, padding: '2px 6px' }}>AI</span>
      </div>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: 4, flex: 1 }}>
        {navLinks.map(l => (
          <button key={l.id} className="btn btn-ghost btn-sm"
            style={{ color: page === l.id ? 'var(--sage-deep)' : 'var(--charcoal-mid)', fontWeight: page === l.id ? 500 : 400 }}
            onClick={() => setPage(l.id)}>{l.label}</button>
        ))}
      </div>

      {/* Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="toggle" style={{ width: 36, height: 20 }}
          onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
          title="Toggle theme">
          <span style={{ position: 'absolute', left: theme === 'dark' ? '18px' : '3px', top: '50%', transform: 'translateY(-50%)', fontSize: 10 }}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </span>
        </button>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {user.role === 'admin' && (
              <button className="btn btn-outline btn-sm" onClick={() => setPage('admin')}>Admin</button>
            )}
            <button className="btn btn-secondary btn-sm" onClick={() => setPage('dashboard')}>Dashboard</button>
            <div
              onClick={() => setPage('dashboard')}
              style={{
                width: 36, height: 36, borderRadius: 18, background: 'var(--sage)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 14, cursor: 'pointer', fontFamily: 'Fraunces, serif'
              }}
            >{user.name?.[0] || 'U'}</div>
          </div>
        ) : (
          <>
            <button className="btn btn-ghost btn-sm" onClick={() => openModal('login')}>Sign in</button>
            <button className="btn btn-primary btn-sm" onClick={() => openModal('register')}>Start free</button>
          </>
        )}
      </div>
    </nav>
  );
};

// ── LANDING PAGE ──────────────────────────────────────────────────────────────
const LandingPage = ({ setPage, openModal, user }) => {
  const tools = [
    { icon: '✂', name: 'Background Remover', desc: '1-click AI background removal with transparent export', badge: null },
    { icon: '⊹', name: 'Object Eraser', desc: 'Erase unwanted objects seamlessly with AI inpainting', badge: null },
    { icon: '◈', name: 'Image Enhancer', desc: 'HD upscaling and sharpening up to 4K resolution', badge: 'Pro' },
    { icon: '◑', name: 'Color Correction', desc: 'Auto lighting, tone balance and white balance fix', badge: null },
    { icon: '◉', name: 'Portrait Retouch', desc: 'Skin smoothing, blemish removal and teeth whitening', badge: null },
    { icon: '⬡', name: 'BG Generator', desc: 'Replace background with AI-generated scenes from text', badge: 'Pro' },
    { icon: '⊕', name: 'Image Generator', desc: 'Generate stunning images from text prompts', badge: 'Pro' },
    { icon: '◫', name: 'AI Filters', desc: 'Cinematic, vintage and aesthetic presets', badge: null },
    { icon: '⊞', name: 'Batch Editing', desc: 'Process hundreds of images simultaneously', badge: 'Pro' },
  ];

  const testimonials = [
    { name: 'Aanya Sharma', role: 'Brand Photographer', text: 'PixelMind cut my retouching workflow by 80%. The background removal is honestly magic.', avatar: 'A' },
    { name: 'Lucas Mendez', role: 'E-commerce Owner', text: 'We process 500+ product photos weekly. Batch editing + HD export is a game changer.', avatar: 'L' },
    { name: 'Sofia Chen', role: 'Social Media Creator', text: 'The AI filters and portrait retouch make my content look ultra-professional every time.', avatar: 'S' },
  ];

  const stats = [
    { num: '2M+', label: 'Images processed' },
    { num: '180k', label: 'Happy creators' },
    { num: '99.2%', label: 'Satisfaction rate' },
    { num: '<3s', label: 'Avg processing time' },
  ];

  return (
    <div style={{ paddingTop: 64 }}>
      {/* HERO */}
      <section style={{
        padding: '120px 40px 80px', textAlign: 'center', position: 'relative',
        overflow: 'hidden', minHeight: '90vh', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        {/* Decorative blobs */}
        <div className="hero-blob" style={{ width: 500, height: 500, background: 'var(--sage)', top: -100, left: -100 }} />
        <div className="hero-blob" style={{ width: 400, height: 400, background: 'var(--gold)', top: 200, right: -80, animationDelay: '2s' }} />
        <div className="hero-blob" style={{ width: 300, height: 300, background: 'var(--sage-light)', bottom: 0, left: '40%', animationDelay: '4s' }} />

        <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto' }}>
          <div className="animate-fade-up" style={{ marginBottom: 20 }}>
            <span className="badge badge-sage" style={{ padding: '6px 14px', fontSize: 13 }}>
              ✦ Powered by Advanced AI Models
            </span>
          </div>

          <h1 className="animate-fade-up-delay-1" style={{
            fontSize: 'clamp(44px, 7vw, 88px)', lineHeight: 1.05,
            marginBottom: 28, letterSpacing: '-2px'
          }}>
            Your photos, <em style={{ color: 'var(--sage)', fontStyle: 'italic' }}>reimagined</em><br />by AI
          </h1>

          <p className="animate-fade-up-delay-2" style={{
            fontSize: 19, color: 'var(--bark)', maxWidth: 560, margin: '0 auto 40px',
            lineHeight: 1.65, fontWeight: 300
          }}>
            Professional AI photo editing in your browser. Remove backgrounds, enhance quality,
            retouch portraits, and generate stunning visuals — in seconds.
          </p>

          <div className="animate-fade-up-delay-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-xl"
              onClick={() => user ? setPage('editor') : openModal('register')}>
              ✦ Start editing free
            </button>
            <button className="btn btn-outline btn-xl" onClick={() => setPage('editor')}>
              See demo →
            </button>
          </div>

          <div className="animate-fade-up-delay-4" style={{
            marginTop: 20, fontSize: 13, color: 'var(--bark-light)'
          }}>
            No credit card · 5 free edits daily · Cancel anytime
          </div>
        </div>

        {/* Hero image mockup */}
        <div className="animate-fade-up-delay-5" style={{
          marginTop: 80, maxWidth: 900, width: '100%',
          background: 'var(--warm-white)', borderRadius: 24,
          border: '1px solid var(--beige-mid)', boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden', position: 'relative'
        }}>
          {/* Fake editor UI */}
          <div style={{
            background: 'var(--beige-dark)', padding: '12px 20px',
            display: 'flex', alignItems: 'center', gap: 8,
            borderBottom: '1px solid var(--beige-mid)'
          }}>
            {['#FF5F57','#FFBD2E','#28C840'].map((c,i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />
            ))}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{
                background: 'var(--beige)', borderRadius: 6, padding: '4px 20px',
                fontSize: 12, color: 'var(--bark)'
              }}>pixelmind.ai/editor</div>
            </div>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '200px 1fr 200px',
            height: 380
          }}>
            {/* Left panel */}
            <div style={{ borderRight: '1px solid var(--beige-mid)', padding: 16, background: 'var(--warm-white)' }}>
              {['Background Remove','Object Erase','Enhance HD','Color Fix','Retouch'].map((t,i) => (
                <div key={i} style={{
                  padding: '10px 12px', borderRadius: 8, marginBottom: 4,
                  background: i === 0 ? 'var(--sage-pale)' : 'transparent',
                  color: i === 0 ? 'var(--sage-deep)' : 'var(--bark)',
                  fontSize: 13, fontWeight: i === 0 ? 500 : 400, cursor: 'default'
                }}>{t}</div>
              ))}
            </div>
            {/* Canvas */}
            <div style={{
              background: 'repeating-conic-gradient(var(--beige-dark) 0% 25%, var(--beige) 0% 50%) 0 0 / 20px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
            }}>
              <div style={{
                width: 200, height: 260, borderRadius: 12, background: 'var(--sage-pale)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 48, boxShadow: 'var(--shadow-md)'
              }}>🌿</div>
              <div style={{
                position: 'absolute', bottom: 16, right: 16,
                background: 'var(--sage)', color: 'white',
                padding: '8px 14px', borderRadius: 8, fontSize: 12
              }}>✦ AI Processing…</div>
            </div>
            {/* Right panel */}
            <div style={{ borderLeft: '1px solid var(--beige-mid)', padding: 16, background: 'var(--warm-white)' }}>
              {['Brightness','Contrast','Saturation','Sharpness'].map((p,i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: 'var(--bark)', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <span>{p}</span><span style={{ color: 'var(--sage)' }}>{60 + i * 8}%</span>
                  </div>
                  <input type="range" defaultValue={60 + i * 8} style={{ width: '100%' }} readOnly />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '60px 40px', background: 'var(--beige-dark)', borderTop: '1px solid var(--beige-mid)', borderBottom: '1px solid var(--beige-mid)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, textAlign: 'center' }}>
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 42, fontWeight: 300, color: 'var(--sage-deep)' }}>{s.num}</div>
              <div style={{ fontSize: 14, color: 'var(--bark)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TOOLS GRID */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="badge badge-sage" style={{ marginBottom: 16 }}>AI Tools</div>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', marginBottom: 16 }}>
              Everything you need to<br /><em style={{ color: 'var(--sage)', fontStyle: 'italic' }}>perfect</em> your images
            </h2>
            <p style={{ color: 'var(--bark)', fontSize: 17, maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>
              State-of-the-art AI models trained on millions of images. Professional results in seconds, not hours.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {tools.map((t, i) => (
              <div key={i} className="tool-card" onClick={() => setPage('editor')}
                style={{ animationDelay: `${i * 0.05}s` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, background: 'var(--sage-pale)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, color: 'var(--sage-deep)'
                  }}>{t.icon}</div>
                  {t.badge && <span className="badge badge-gold">{t.badge}</span>}
                </div>
                <h3 style={{ fontSize: 17, marginBottom: 8, fontFamily: 'Fraunces, serif' }}>{t.name}</h3>
                <p style={{ fontSize: 13, color: 'var(--bark)', lineHeight: 1.55 }}>{t.desc}</p>
                <div style={{ marginTop: 16, fontSize: 13, color: 'var(--sage)', fontWeight: 500 }}>
                  Try now →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER DEMO */}
      <section style={{ padding: '80px 40px', background: 'var(--beige-dark)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="badge badge-sage" style={{ marginBottom: 16 }}>Before & After</div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', marginBottom: 40 }}>
            See the difference AI makes
          </h2>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 700, margin: '0 auto'
          }}>
            <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--beige-mid)' }}>
              <div style={{ background: 'var(--beige)', padding: '8px 14px', fontSize: 12, color: 'var(--bark)', fontWeight: 500 }}>
                Before
              </div>
              <div style={{
                height: 280, background: 'linear-gradient(135deg, #D4C5B0 0%, #B8A89A 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60
              }}>🖼️</div>
            </div>
            <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--sage-light)' }}>
              <div style={{ background: 'var(--sage-pale)', padding: '8px 14px', fontSize: 12, color: 'var(--sage-deep)', fontWeight: 500 }}>
                After ✦ AI Enhanced
              </div>
              <div style={{
                height: 280, background: 'linear-gradient(135deg, var(--sage-pale) 0%, #B8D4BB 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60
              }}>✨</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)' }}>Loved by creators worldwide</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="card" style={{ padding: 28 }}>
                <div style={{ marginBottom: 16, color: 'var(--gold)', fontSize: 16 }}>★★★★★</div>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--charcoal-mid)', marginBottom: 20 }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 20, background: 'var(--sage)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontFamily: 'Fraunces, serif', fontSize: 18
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--bark)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '100px 40px', textAlign: 'center',
        background: 'var(--sage)', color: 'white'
      }}>
        <h2 style={{ fontSize: 'clamp(32px,5vw,64px)', marginBottom: 20, color: 'white' }}>
          Start editing for free
        </h2>
        <p style={{ fontSize: 18, opacity: 0.85, marginBottom: 40, maxWidth: 400, margin: '0 auto 40px' }}>
          Join 180,000+ creators who use PixelMind every day.
        </p>
        <button className="btn btn-xl" style={{ background: 'white', color: 'var(--sage-deep)' }}
          onClick={() => user ? setPage('editor') : openModal('register')}>
          ✦ Get started free
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--charcoal)', color: 'var(--beige)', padding: '60px 40px 40px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 60 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 16 }}>✦</div>
                <span style={{ fontFamily: 'Fraunces, serif', fontSize: 20 }}>PixelMind</span>
              </div>
              <p style={{ fontSize: 14, opacity: 0.65, lineHeight: 1.7, maxWidth: 280 }}>
                The world's most advanced AI photo editor. Professional results for everyone.
              </p>
            </div>
            {[
              { title: 'Product', links: ['Editor', 'Pricing', 'API', 'Changelog'] },
              { title: 'Company', links: ['About', 'Blog', 'Contact', 'Careers'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontWeight: 500, marginBottom: 16, fontSize: 14 }}>{col.title}</div>
                {col.links.map((l, j) => (
                  <div key={j} style={{ fontSize: 13, opacity: 0.65, marginBottom: 10, cursor: 'pointer' }}
                    onMouseEnter={e => e.target.style.opacity = 1}
                    onMouseLeave={e => e.target.style.opacity = 0.65}
                  >{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', fontSize: 13, opacity: 0.5 }}>
            <span>© 2025 PixelMind AI. All rights reserved.</span>
            <span>Made with ✦ and AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ── EDITOR PAGE ───────────────────────────────────────────────────────────────
const EditorPage = ({ user, openModal, addToast }) => {
  const [image, setImage] = useState(null);
  const [processed, setProcessed] = useState(null);
  const [activeTool, setActiveTool] = useState('background');
  const [loading, setLoading] = useState(false);
  const [loadingTask, setLoadingTask] = useState('');
  const [sliderPos, setSliderPos] = useState(50);
  const [showBefore, setShowBefore] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [adjustments, setAdjustments] = useState({ brightness: 50, contrast: 50, saturation: 50, sharpness: 50, warmth: 50 });
  const [activeFilter, setActiveFilter] = useState(null);
  const [exportFormat, setExportFormat] = useState('PNG');
  const [cropMode, setCropMode] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();
  const baRef = useRef();

  const tools = [
    { id: 'background', icon: '✂', label: 'BG Remove', pro: false },
    { id: 'object', icon: '⊹', label: 'Object Erase', pro: false },
    { id: 'enhance', icon: '◈', label: 'Enhance HD', pro: false },
    { id: 'color', icon: '◑', label: 'Color Fix', pro: false },
    { id: 'portrait', icon: '◉', label: 'Retouch', pro: false },
    { id: 'bggen', icon: '⬡', label: 'BG Generate', pro: true },
    { id: 'generate', icon: '⊕', label: 'AI Generate', pro: true },
    { id: 'filters', icon: '◫', label: 'Filters', pro: false },
    { id: 'crop', icon: '⊞', label: 'Crop/Resize', pro: false },
    { id: 'batch', icon: '⬡', label: 'Batch Edit', pro: true },
  ];

  const filters = [
    { id: 'cinematic', label: 'Cinematic', emoji: '🎬' },
    { id: 'vintage', label: 'Vintage', emoji: '📷' },
    { id: 'moody', label: 'Moody', emoji: '🌫️' },
    { id: 'bright', label: 'Bright', emoji: '☀️' },
    { id: 'noir', label: 'Noir', emoji: '🖤' },
    { id: 'pastel', label: 'Pastel', emoji: '🌸' },
  ];

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) loadImage(file);
  };

  const loadImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => { setImage(e.target.result); setProcessed(null); };
    reader.readAsDataURL(file);
  };

  const runAI = async (tool) => {
    if (!user) { openModal('login'); return; }
    if (!image) { addToast('Upload an image first', 'warning'); return; }
    if (tool.pro && user?.plan === 'free') { openModal('upgrade'); return; }

    const tasks = {
      background: 'Removing background with AI…',
      object: 'Detecting and erasing objects…',
      enhance: 'Upscaling to HD quality…',
      color: 'Analyzing and correcting colors…',
      portrait: 'Retouching portrait…',
      bggen: 'Generating new background…',
      generate: 'Generating AI image…',
      filters: `Applying ${activeFilter || 'cinematic'} filter…`,
    };

    setLoading(true);
    setLoadingTask(tasks[tool.id] || 'Processing…');
    await new Promise(r => setTimeout(r, 2500 + Math.random() * 1000));
    setProcessed(image); // Simulated — would call real API
    setLoading(false);
    addToast('AI processing complete!', 'success');
  };

  const handleExport = () => {
    if (!processed && !image) { addToast('No image to export', 'error'); return; }
    if (exportFormat === 'HD' && user?.plan === 'free') { openModal('upgrade'); return; }
    addToast(`Exported as ${exportFormat}!`, 'success');
  };

  // Mouse move for BA slider
  const handleBAMove = (e) => {
    if (!baRef.current) return;
    const rect = baRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, x)));
  };

  return (
    <div style={{ paddingTop: 64, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="editor-workspace">
        {/* LEFT SIDEBAR: TOOLS */}
        <div className="editor-sidebar">
          <div style={{ padding: '16px 12px 8px', borderBottom: '1px solid var(--beige-mid)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--bark)', marginBottom: 8 }}>
              AI Tools
            </div>
          </div>
          <div style={{ padding: '8px 12px', flex: 1 }}>
            {tools.map(t => (
              <div key={t.id}
                onClick={() => { setActiveTool(t.id); if (t.pro && user?.plan === 'free') openModal('upgrade'); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                  borderRadius: 10, marginBottom: 2, cursor: 'pointer',
                  background: activeTool === t.id ? 'var(--sage-pale)' : 'transparent',
                  color: activeTool === t.id ? 'var(--sage-deep)' : 'var(--charcoal-mid)',
                  transition: 'var(--transition)', fontSize: 13,
                  justifyContent: 'space-between'
                }}
                onMouseEnter={e => { if (activeTool !== t.id) e.currentTarget.style.background = 'var(--beige)'; }}
                onMouseLeave={e => { if (activeTool !== t.id) e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 16 }}>{t.icon}</span>
                  <span style={{ fontWeight: activeTool === t.id ? 500 : 400 }}>{t.label}</span>
                </div>
                {t.pro && <span className="badge badge-gold" style={{ fontSize: 10, padding: '2px 6px' }}>Pro</span>}
              </div>
            ))}
          </div>

          {/* Upload Button */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid var(--beige-mid)' }}>
            <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => fileRef.current?.click()}>
              ↑ Upload Image
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
              onChange={e => e.target.files[0] && loadImage(e.target.files[0])} />
          </div>
        </div>

        {/* CENTER: CANVAS */}
        <div className="editor-canvas"
          onDrop={handleDrop}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
        >
          {!image ? (
            <div className={`drop-zone ${dragging ? 'active' : ''}`}
              style={{ width: '90%', maxWidth: 560, padding: '60px 40px', textAlign: 'center' }}
              onClick={() => fileRef.current?.click()}>
              <div style={{ fontSize: 56, marginBottom: 20 }}>🖼️</div>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 24, marginBottom: 10 }}>
                Drop your image here
              </h3>
              <p style={{ color: 'var(--bark)', fontSize: 14, marginBottom: 24 }}>
                Supports JPG, PNG, WEBP · Max 25MB
              </p>
              <button className="btn btn-primary">Choose file</button>
            </div>
          ) : (
            <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '80%' }}>
              {/* Before/After Toggle */}
              {processed && (
                <div style={{
                  position: 'absolute', top: -44, left: 0, right: 0, display: 'flex',
                  justifyContent: 'center', gap: 8, zIndex: 10
                }}>
                  <button className={`btn btn-sm ${!showBefore ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setShowBefore(false)}>After</button>
                  <button className={`btn btn-sm ${showBefore ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setShowBefore(true)}>Before</button>
                  <button className="btn btn-sm btn-secondary">⇄ Compare</button>
                </div>
              )}

              {/* Image display */}
              <div
                ref={baRef}
                onMouseMove={processed ? handleBAMove : undefined}
                style={{
                  position: 'relative', borderRadius: 16, overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  maxHeight: 480, cursor: processed ? 'ew-resize' : 'default'
                }}>
                <img src={showBefore ? image : (processed || image)}
                  alt="Editor canvas"
                  style={{ display: 'block', maxWidth: '100%', maxHeight: 480, objectFit: 'contain' }} />

                {/* Checkerboard overlay for transparency */}
                {processed && activeTool === 'background' && (
                  <div style={{
                    position: 'absolute', inset: 0, opacity: 0.1,
                    backgroundImage: 'repeating-conic-gradient(#aaa 0% 25%, white 0% 50%)',
                    backgroundSize: '16px 16px', pointerEvents: 'none'
                  }} />
                )}

                {loading && <AILoader task={loadingTask} />}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: PROPERTIES */}
        <div className="editor-properties">
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 18, marginBottom: 4 }}>
              {tools.find(t => t.id === activeTool)?.label || 'Properties'}
            </h3>
          </div>

          {/* Tool-specific controls */}
          {activeTool === 'filters' && (
            <div>
              <div style={{ fontSize: 12, color: 'var(--bark)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>Presets</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {filters.map(f => (
                  <div key={f.id} className="filter-thumb" style={{ borderColor: activeFilter === f.id ? 'var(--sage)' : 'transparent' }}
                    onClick={() => setActiveFilter(f.id)}>
                    <div style={{
                      width: 80, height: 56, background: `var(--sage-pale)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24
                    }}>{f.emoji}</div>
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTool === 'color' || activeTool === 'enhance') && (
            <div>
              {Object.entries(adjustments).map(([key, val]) => (
                <div key={key} style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                    <span style={{ textTransform: 'capitalize', color: 'var(--charcoal)' }}>{key}</span>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--sage)' }}>{val}%</span>
                  </div>
                  <input type="range" min={0} max={100} value={val}
                    onChange={e => setAdjustments(a => ({ ...a, [key]: +e.target.value }))} />
                </div>
              ))}
            </div>
          )}

          {(activeTool === 'bggen' || activeTool === 'generate') && (
            <div>
              <div style={{ fontSize: 12, color: 'var(--bark)', marginBottom: 8, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>Text Prompt</div>
              <textarea
                className="input" value={prompt} onChange={e => setPrompt(e.target.value)}
                placeholder={activeTool === 'bggen' ? "A sunny beach with crystal clear water..." : "A majestic mountain landscape at sunset..."}
                style={{ height: 100, resize: 'vertical', marginBottom: 12 }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                {['Studio', 'Nature', 'City', 'Abstract'].map(p => (
                  <button key={p} className="btn btn-secondary btn-sm" style={{ fontSize: 11 }}
                    onClick={() => setPrompt(p + ' background, professional')}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTool === 'crop' && (
            <div>
              <div style={{ fontSize: 12, color: 'var(--bark)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>Aspect Ratio</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
                {['Free', '1:1', '16:9', '4:3', '3:2', '9:16'].map(r => (
                  <button key={r} className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>{r}</button>
                ))}
              </div>
              <div style={{ fontSize: 12, color: 'var(--bark)', marginBottom: 8 }}>Custom Size</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="input" placeholder="W" style={{ textAlign: 'center' }} />
                <input className="input" placeholder="H" style={{ textAlign: 'center' }} />
              </div>
            </div>
          )}

          {/* Run AI Button */}
          {['background','object','enhance','color','portrait','bggen','generate','filters'].includes(activeTool) && (
            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}
              disabled={loading || !image}
              onClick={() => runAI(tools.find(t => t.id === activeTool))}
            >
              {loading ? <><div className="spinner" />Processing…</> : '✦ Apply AI'}
            </button>
          )}

          {/* Export */}
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--beige-mid)' }}>
            <div style={{ fontSize: 12, color: 'var(--bark)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>Export</div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
              {['PNG', 'JPG', 'WEBP'].map(f => (
                <button key={f} className={`btn btn-sm ${exportFormat === f ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setExportFormat(f)}>{f}</button>
              ))}
              <button className={`btn btn-sm ${exportFormat === 'HD' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setExportFormat('HD')}>
                HD <span className="badge badge-gold" style={{ fontSize: 10 }}>Pro</span>
              </button>
            </div>
            <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}
              onClick={handleExport}>
              ↓ Download {exportFormat}
            </button>
            {!user?.isPro && (
              <div style={{ fontSize: 11, color: 'var(--bark)', marginTop: 8, textAlign: 'center', lineHeight: 1.5 }}>
                Free downloads include a watermark.{' '}
                <span style={{ color: 'var(--sage)', cursor: 'pointer' }} onClick={() => openModal('upgrade')}>
                  Upgrade to remove
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── PRICING PAGE ──────────────────────────────────────────────────────────────
const PricingPage = ({ openModal, user }) => {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, annual: 0 },
      desc: 'For casual creators just getting started',
      features: [
        '5 AI edits per day',
        'All basic tools',
        'JPG/PNG/WEBP export',
        'Standard quality',
        'Watermarked downloads',
        'Community support',
      ],
      limits: ['No batch editing', 'No HD export', 'Limited resolution'],
      cta: 'Get started free',
      featured: false,
    },
    {
      name: 'Pro',
      price: { monthly: 19, annual: 15 },
      desc: 'For serious creators and professionals',
      features: [
        'Unlimited AI edits',
        'All AI tools unlocked',
        'HD & 4K export',
        'No watermarks',
        'Batch editing (up to 100)',
        'Priority AI processing',
        'Advanced filters & presets',
        'AI Background Generator',
        'AI Image Generator',
        'Email support',
        '100 AI credits/month',
      ],
      limits: [],
      cta: 'Start Pro free trial',
      featured: true,
    },
    {
      name: 'Team',
      price: { monthly: 49, annual: 39 },
      desc: 'For agencies and growing teams',
      features: [
        'Everything in Pro',
        'Up to 5 team members',
        'Unlimited batch editing',
        'API access',
        'Custom presets & brand kit',
        'White-label exports',
        'Dedicated account manager',
        'Priority support (24h)',
        '500 AI credits/month',
        'Usage analytics dashboard',
      ],
      limits: [],
      cta: 'Start Team trial',
      featured: false,
    },
  ];

  const credits = [
    { amount: '50 Credits', price: '$5', desc: 'For occasional heavy use' },
    { amount: '200 Credits', price: '$15', desc: 'Most popular top-up' },
    { amount: '500 Credits', price: '$30', desc: 'For power users' },
    { amount: '1000 Credits', price: '$50', desc: 'Best value for teams' },
  ];

  const faqs = [
    { q: 'What is a credit?', a: 'Credits are used for heavy AI operations like 4K upscaling, AI image generation, and batch processing. Each operation costs 1-5 credits depending on complexity.' },
    { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time. You\'ll retain Pro access until the end of your billing period.' },
    { q: 'Is there a free trial for Pro?', a: 'Yes! Pro includes a 7-day free trial. No credit card required to start.' },
    { q: 'What happens to my edits if I downgrade?', a: 'Your saved projects remain accessible. You\'ll revert to the 5 edits/day limit and downloads will include a watermark.' },
    { q: 'Do you offer student discounts?', a: 'Yes! Students get 50% off the Pro plan with a valid .edu email address.' },
  ];

  return (
    <div style={{ paddingTop: 64 }}>
      {/* HEADER */}
      <section style={{ padding: '80px 40px 60px', textAlign: 'center', background: 'var(--beige)' }}>
        <div className="badge badge-sage" style={{ marginBottom: 16 }}>Pricing</div>
        <h1 style={{ fontSize: 'clamp(36px,5vw,64px)', marginBottom: 20 }}>
          Simple, honest pricing
        </h1>
        <p style={{ fontSize: 18, color: 'var(--bark)', maxWidth: 440, margin: '0 auto 36px', lineHeight: 1.65 }}>
          Start free, scale when you need to. No hidden fees, no surprises.
        </p>
        {/* Billing toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <span style={{ fontSize: 14, color: annual ? 'var(--bark)' : 'var(--charcoal)', fontWeight: annual ? 400 : 500 }}>Monthly</span>
          <button className={`toggle ${annual ? 'active' : ''}`} onClick={() => setAnnual(a => !a)} />
          <span style={{ fontSize: 14, color: annual ? 'var(--charcoal)' : 'var(--bark)', fontWeight: annual ? 500 : 400 }}>
            Annual <span className="badge badge-sage" style={{ fontSize: 11 }}>Save 20%</span>
          </span>
        </div>
      </section>

      {/* PLANS */}
      <section style={{ padding: '60px 40px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
            {plans.map((p, i) => (
              <div key={i} className="pricing-card" style={{ background: p.featured ? 'var(--sage)' : undefined, color: p.featured ? 'white' : undefined }}>
                {p.featured && (
                  <div style={{
                    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--gold)', color: 'white', padding: '4px 16px',
                    borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap'
                  }}>Most Popular</div>
                )}
                <div style={{ marginBottom: 8, fontSize: 14, fontWeight: 500, opacity: p.featured ? 0.85 : undefined, color: p.featured ? undefined : 'var(--bark)' }}>
                  {p.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: 'Fraunces, serif', fontSize: 48, fontWeight: 300, color: p.featured ? 'white' : 'var(--sage-deep)' }}>
                    ${annual ? p.price.annual : p.price.monthly}
                  </span>
                  {p.price.monthly > 0 && <span style={{ opacity: 0.7, fontSize: 14 }}>/mo</span>}
                </div>
                <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 24, lineHeight: 1.5 }}>{p.desc}</div>
                <button
                  className="btn btn-lg"
                  style={{
                    width: '100%', justifyContent: 'center', marginBottom: 28,
                    background: p.featured ? 'white' : 'var(--sage)',
                    color: p.featured ? 'var(--sage-deep)' : 'white',
                  }}
                  onClick={() => openModal(p.price.monthly === 0 ? 'register' : 'upgrade')}
                >
                  {p.cta}
                </button>
                <div style={{ fontSize: 13 }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: p.featured ? 'rgba(255,255,255,0.8)' : 'var(--sage)', flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ opacity: p.featured ? 0.9 : undefined }}>{f}</span>
                    </div>
                  ))}
                  {p.limits.map((f, j) => (
                    <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start', opacity: 0.5 }}>
                      <span style={{ flexShrink: 0 }}>✕</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREDITS */}
      <section style={{ padding: '60px 40px', background: 'var(--beige)' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 36, marginBottom: 12 }}>AI Credits</h2>
            <p style={{ color: 'var(--bark)', fontSize: 15 }}>
              Need more power? Top up your credits for heavy AI operations.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {credits.map((c, i) => (
              <div key={i} className="card" style={{ padding: 20, textAlign: 'center', cursor: 'pointer' }}
                onClick={() => openModal('upgrade')}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, color: 'var(--sage-deep)', marginBottom: 4 }}>{c.price}</div>
                <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 6 }}>{c.amount}</div>
                <div style={{ fontSize: 12, color: 'var(--bark)' }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 40px' }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <h2 style={{ textAlign: 'center', fontSize: 36, marginBottom: 48 }}>Frequently asked questions</h2>
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>
    </div>
  );
};

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--beige-mid)', marginBottom: 0 }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 0', cursor: 'pointer', fontWeight: 500
        }}
      >
        <span>{q}</span>
        <span style={{ color: 'var(--sage)', transition: 'var(--transition)', transform: open ? 'rotate(45deg)' : 'none', fontSize: 20 }}>+</span>
      </div>
      {open && (
        <div style={{ paddingBottom: 20, fontSize: 14, color: 'var(--bark)', lineHeight: 1.7, animation: 'fadeUp 0.2s ease' }}>
          {a}
        </div>
      )}
    </div>
  );
};

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
const Dashboard = ({ user, setUser, setPage, addToast }) => {
  const [dashView, setDashView] = useState('overview');
  const [usagePercent] = useState(60);

  const navItems = [
    { id: 'overview', icon: '⊟', label: 'Overview' },
    { id: 'uploads', icon: '↑', label: 'Uploads' },
    { id: 'projects', icon: '◈', label: 'Projects' },
    { id: 'history', icon: '◷', label: 'History' },
    { id: 'billing', icon: '◈', label: 'Billing' },
    { id: 'settings', icon: '⚙', label: 'Settings' },
  ];

  const recentProjects = [
    { name: 'Product shoot — Jan', date: '2 days ago', status: 'Complete', size: '4K' },
    { name: 'Portrait session', date: '4 days ago', status: 'Complete', size: 'HD' },
    { name: 'E-commerce batch', date: '1 week ago', status: 'Complete', size: '4K' },
    { name: 'Brand assets', date: '2 weeks ago', status: 'Archived', size: 'HD' },
  ];

  return (
    <div style={{ paddingTop: 64 }}>
      <div className="dash-layout">
        {/* SIDEBAR */}
        <div className="dash-sidebar">
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, marginBottom: 4 }}>
              Hello, {user?.name?.split(' ')[0] || 'Creator'} 👋
            </div>
            <div style={{ fontSize: 12, color: 'var(--bark)' }}>
              {user?.plan === 'pro' ? (
                <span className="badge badge-gold">✦ Pro Member</span>
              ) : (
                <span className="badge badge-sage">Free Plan</span>
              )}
            </div>
          </div>

          {navItems.map(n => (
            <div key={n.id} className={`dash-nav-item ${dashView === n.id ? 'active' : ''}`}
              onClick={() => setDashView(n.id)}>
              <span style={{ fontSize: 16 }}>{n.icon}</span>
              <span className="dash-label">{n.label}</span>
            </div>
          ))}

          <div style={{ marginTop: 'auto', paddingTop: 20 }}>
            <div className="dash-nav-item" onClick={() => { setUser(null); setPage('landing'); addToast('Signed out', 'success'); }}>
              <span>→</span>
              <span className="dash-label">Sign out</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="dash-content">
          {dashView === 'overview' && (
            <div>
              <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, marginBottom: 32 }}>Overview</h1>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 40 }}>
                {[
                  { label: 'Edits today', value: user?.plan === 'free' ? '3 / 5' : '∞', color: 'var(--sage-deep)' },
                  { label: 'This month', value: '47', color: 'var(--sage-deep)' },
                  { label: 'Credits left', value: user?.plan === 'pro' ? '87' : '—', color: 'var(--sage-deep)' },
                  { label: 'Storage used', value: '1.2 GB', color: 'var(--sage-deep)' },
                ].map((s, i) => (
                  <div key={i} className="stat-card">
                    <div className="stat-number">{s.value}</div>
                    <div style={{ fontSize: 13, color: 'var(--bark)', marginTop: 8 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Usage */}
              {user?.plan === 'free' && (
                <div className="card" style={{
                  padding: 24, marginBottom: 32, background: 'linear-gradient(135deg, var(--sage-pale), var(--beige))',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, marginBottom: 6 }}>
                      Upgrade to Pro
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--bark)', maxWidth: 360 }}>
                      Unlock unlimited edits, HD export, batch editing, and no watermarks. Starting at $15/month.
                    </div>
                  </div>
                  <button className="btn btn-primary btn-lg">Upgrade now →</button>
                </div>
              )}

              {/* Daily usage bar */}
              <div className="card" style={{ padding: 24, marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontWeight: 500 }}>Daily edits</span>
                  <span style={{ fontSize: 13, color: 'var(--bark)' }}>3 of {user?.plan === 'pro' ? '∞' : '5'} used</span>
                </div>
                {user?.plan === 'free' && (
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '60%' }} />
                  </div>
                )}
                {user?.plan === 'pro' && (
                  <div style={{ fontSize: 13, color: 'var(--sage)' }}>✓ Unlimited — Pro plan</div>
                )}
              </div>

              {/* Recent projects */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h2 style={{ fontSize: 20 }}>Recent projects</h2>
                  <button className="btn btn-ghost btn-sm" onClick={() => setDashView('projects')}>View all →</button>
                </div>
                <div className="card" style={{ overflow: 'hidden' }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th><th>Date</th><th>Resolution</th><th>Status</th><th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentProjects.map((p, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 500 }}>{p.name}</td>
                          <td style={{ color: 'var(--bark)', fontSize: 13 }}>{p.date}</td>
                          <td><span className="badge badge-sage">{p.size}</span></td>
                          <td><span className={`badge ${p.status === 'Complete' ? 'badge-sage' : 'badge-gold'}`}>{p.status}</span></td>
                          <td>
                            <button className="btn btn-ghost btn-sm">↓ Download</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {dashView === 'billing' && (
            <div>
              <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, marginBottom: 32 }}>Billing</h1>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 700 }}>
                <div className="card" style={{ padding: 24 }}>
                  <div style={{ fontSize: 13, color: 'var(--bark)', marginBottom: 4 }}>Current plan</div>
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, color: 'var(--sage-deep)', marginBottom: 12 }}>
                    {user?.plan === 'pro' ? 'Pro Monthly' : 'Free'}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--bark)', marginBottom: 16 }}>
                    {user?.plan === 'pro' ? 'Next billing: Feb 1, 2026 · $19.00' : 'Limited features'}
                  </div>
                  {user?.plan !== 'pro' && (
                    <button className="btn btn-primary btn-sm">Upgrade to Pro</button>
                  )}
                </div>
                <div className="card" style={{ padding: 24 }}>
                  <div style={{ fontSize: 13, color: 'var(--bark)', marginBottom: 4 }}>AI Credits</div>
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, color: 'var(--sage-deep)', marginBottom: 4 }}>
                    {user?.plan === 'pro' ? '87' : '0'}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--bark)', marginBottom: 16 }}>Credits remaining this month</div>
                  <button className="btn btn-secondary btn-sm">Buy credits</button>
                </div>
              </div>
            </div>
          )}

          {dashView === 'settings' && (
            <div>
              <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, marginBottom: 32 }}>Settings</h1>
              <div style={{ maxWidth: 520 }}>
                {[
                  { label: 'Full name', value: user?.name || '' },
                  { label: 'Email address', value: user?.email || '' },
                ].map((f, i) => (
                  <div key={i} style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 8 }}>{f.label}</label>
                    <input className="input" defaultValue={f.value} />
                  </div>
                ))}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 8 }}>Default export format</label>
                  <select className="input">
                    <option>PNG</option><option>JPG</option><option>WEBP</option>
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--beige-mid)', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>Email notifications</div>
                    <div style={{ fontSize: 12, color: 'var(--bark)' }}>Processing complete, tips & updates</div>
                  </div>
                  <button className="toggle active" />
                </div>
                <button className="btn btn-primary">Save changes</button>
              </div>
            </div>
          )}

          {['uploads','projects','history'].includes(dashView) && (
            <div>
              <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, marginBottom: 32, textTransform: 'capitalize' }}>{dashView}</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                {Array.from({length: 8}).map((_, i) => (
                  <div key={i} className="card" style={{ overflow: 'hidden', cursor: 'pointer' }}>
                    <div style={{
                      height: 140, background: `hsl(${140 + i * 15}, ${30 + i * 5}%, ${80 - i * 3}%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40
                    }}>🌿</div>
                    <div style={{ padding: '12px 14px' }}>
                      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>Image {i + 1}</div>
                      <div style={{ fontSize: 11, color: 'var(--bark)' }}>{i + 1} day{i !== 0 ? 's' : ''} ago</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── ADMIN PANEL ───────────────────────────────────────────────────────────────
const AdminPanel = ({ setPage }) => {
  const [adminView, setAdminView] = useState('overview');
  const [featureToggles, setFeatureToggles] = useState({
    bgRemover: true, objectEraser: true, enhancer: true,
    colorFix: true, retouch: true, bgGenerator: true,
    imageGen: false, batchEdit: true,
  });

  const adminNav = [
    { id: 'overview', icon: '⊟', label: 'Overview' },
    { id: 'users', icon: '◯', label: 'Users' },
    { id: 'revenue', icon: '⟋', label: 'Revenue' },
    { id: 'subscriptions', icon: '◈', label: 'Subscriptions' },
    { id: 'features', icon: '◐', label: 'Feature Flags' },
    { id: 'credits', icon: '◈', label: 'Credits' },
    { id: 'coupons', icon: '◈', label: 'Coupons' },
    { id: 'analytics', icon: '⟋', label: 'Analytics' },
  ];

  const users = [
    { name: 'Aanya Sharma', email: 'aanya@email.com', plan: 'Pro', edits: 234, joined: 'Jan 12', status: 'Active' },
    { name: 'Lucas Mendez', email: 'lucas@email.com', plan: 'Team', edits: 1420, joined: 'Dec 8', status: 'Active' },
    { name: 'Sofia Chen', email: 'sofia@email.com', plan: 'Free', edits: 28, joined: 'Jan 20', status: 'Active' },
    { name: 'Raj Patel', email: 'raj@email.com', plan: 'Pro', edits: 89, joined: 'Nov 15', status: 'Suspended' },
    { name: 'Emma Wilson', email: 'emma@email.com', plan: 'Free', edits: 5, joined: 'Jan 29', status: 'Active' },
  ];

  const revenueData = [
    { month: 'Aug', mrr: 12400 },
    { month: 'Sep', mrr: 15200 },
    { month: 'Oct', mrr: 19800 },
    { month: 'Nov', mrr: 23100 },
    { month: 'Dec', mrr: 28400 },
    { month: 'Jan', mrr: 34200 },
  ];
  const maxMrr = Math.max(...revenueData.map(d => d.mrr));

  return (
    <div style={{ paddingTop: 64 }}>
      <div className="dash-layout">
        {/* Sidebar */}
        <div className="dash-sidebar">
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, marginBottom: 4 }}>Admin Panel</div>
            <span className="badge badge-red">Super Admin</span>
          </div>
          {adminNav.map(n => (
            <div key={n.id} className={`dash-nav-item ${adminView === n.id ? 'active' : ''}`}
              onClick={() => setAdminView(n.id)}>
              <span>{n.icon}</span>
              <span className="dash-label">{n.label}</span>
            </div>
          ))}
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--beige-mid)' }}>
            <div className="dash-nav-item" onClick={() => setPage('dashboard')}>
              <span>←</span>
              <span className="dash-label">Back to Dashboard</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="dash-content">
          {adminView === 'overview' && (
            <div>
              <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, marginBottom: 32 }}>Platform Overview</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 40 }}>
                {[
                  { label: 'Total users', value: '182,430', change: '+12%' },
                  { label: 'Pro subscribers', value: '23,841', change: '+8%' },
                  { label: 'MRR', value: '$34,200', change: '+21%' },
                  { label: 'Images processed', value: '2.1M', change: '+35%' },
                ].map((s, i) => (
                  <div key={i} className="stat-card">
                    <div className="stat-number">{s.value}</div>
                    <div style={{ fontSize: 13, color: 'var(--bark)', marginTop: 6 }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--sage)', marginTop: 4 }}>↑ {s.change} this month</div>
                  </div>
                ))}
              </div>

              {/* MRR Chart */}
              <div className="card" style={{ padding: 28, marginBottom: 32 }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 20, marginBottom: 24 }}>Monthly Recurring Revenue</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160 }}>
                  {revenueData.map((d, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                      <div style={{ fontSize: 11, color: 'var(--bark)' }}>${(d.mrr/1000).toFixed(0)}k</div>
                      <div style={{
                        width: '100%', background: i === revenueData.length - 1 ? 'var(--sage)' : 'var(--sage-pale)',
                        borderRadius: '4px 4px 0 0', height: `${(d.mrr / maxMrr) * 120}px`,
                        transition: 'var(--transition)'
                      }} />
                      <div style={{ fontSize: 11, color: 'var(--bark)' }}>{d.month}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {adminView === 'users' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32 }}>User Management</h1>
                <div style={{ display: 'flex', gap: 12 }}>
                  <input className="input" placeholder="⊙ Search users…" style={{ width: 240 }} />
                  <button className="btn btn-secondary btn-sm">Export CSV</button>
                </div>
              </div>
              <div className="card" style={{ overflow: 'hidden' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>User</th><th>Plan</th><th>Edits</th><th>Joined</th><th>Status</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr key={i}>
                        <td>
                          <div style={{ fontWeight: 500 }}>{u.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--bark)' }}>{u.email}</div>
                        </td>
                        <td>
                          <span className={`badge ${u.plan === 'Team' ? 'badge-gold' : u.plan === 'Pro' ? 'badge-sage' : ''}`}
                            style={{ background: u.plan === 'Free' ? 'var(--beige-mid)' : undefined }}>
                            {u.plan}
                          </span>
                        </td>
                        <td className="mono">{u.edits.toLocaleString()}</td>
                        <td style={{ fontSize: 13, color: 'var(--bark)' }}>{u.joined}</td>
                        <td>
                          <span className={`badge ${u.status === 'Active' ? 'badge-sage' : 'badge-red'}`}>{u.status}</span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button className="btn btn-ghost btn-sm">Edit</button>
                            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }}>
                              {u.status === 'Active' ? 'Suspend' : 'Restore'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {adminView === 'features' && (
            <div>
              <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, marginBottom: 8 }}>Feature Flags</h1>
              <p style={{ color: 'var(--bark)', marginBottom: 32 }}>Enable or disable AI tools platform-wide in real time.</p>
              <div className="card" style={{ overflow: 'hidden' }}>
                {Object.entries(featureToggles).map(([key, val], i) => (
                  <div key={key} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '20px 24px', borderBottom: i < Object.keys(featureToggles).length - 1 ? '1px solid var(--beige-dark)' : 'none'
                  }}>
                    <div>
                      <div style={{ fontWeight: 500, textTransform: 'capitalize', marginBottom: 2 }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--bark)' }}>
                        {val ? '✓ Active and available to users' : '✕ Disabled — hidden from all users'}
                      </div>
                    </div>
                    <button
                      className={`toggle ${val ? 'active' : ''}`}
                      onClick={() => setFeatureToggles(f => ({ ...f, [key]: !f[key] }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {adminView === 'coupons' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32 }}>Coupons</h1>
                <button className="btn btn-primary">+ Create coupon</button>
              </div>
              <div className="card" style={{ overflow: 'hidden' }}>
                <table className="data-table">
                  <thead>
                    <tr><th>Code</th><th>Discount</th><th>Uses</th><th>Expires</th><th>Status</th><th></th></tr>
                  </thead>
                  <tbody>
                    {[
                      { code: 'LAUNCH50', discount: '50% off', uses: '234/500', expires: 'Feb 28', status: 'Active' },
                      { code: 'STUDENT25', discount: '25% off', uses: '1,240/∞', expires: 'Never', status: 'Active' },
                      { code: 'NEWYEAR', discount: '30% off', uses: '892/1000', expires: 'Jan 31', status: 'Expired' },
                    ].map((c, i) => (
                      <tr key={i}>
                        <td><span className="mono" style={{ background: 'var(--beige)', padding: '3px 8px', borderRadius: 4, fontSize: 13 }}>{c.code}</span></td>
                        <td style={{ fontWeight: 500 }}>{c.discount}</td>
                        <td>{c.uses}</td>
                        <td>{c.expires}</td>
                        <td><span className={`badge ${c.status === 'Active' ? 'badge-sage' : 'badge-red'}`}>{c.status}</span></td>
                        <td><button className="btn btn-ghost btn-sm">Edit</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {adminView === 'revenue' && (
            <div>
              <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, marginBottom: 32 }}>Revenue Dashboard</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 36 }}>
                {[
                  { label: 'MRR', value: '$34,200', sub: '↑ +$5,800 vs last month' },
                  { label: 'ARR (projected)', value: '$410,400', sub: 'Based on current MRR' },
                  { label: 'ARPU', value: '$19.20', sub: 'Average revenue per user' },
                ].map((s, i) => (
                  <div key={i} className="stat-card">
                    <div className="stat-number">{s.value}</div>
                    <div style={{ fontSize: 13, color: 'var(--bark)', marginTop: 6 }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--sage)', marginTop: 4 }}>{s.sub}</div>
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 18, marginBottom: 20 }}>Plan Distribution</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { plan: 'Free', count: '158,589', pct: 87, color: 'var(--beige-mid)' },
                    { plan: 'Pro Monthly', count: '18,241', pct: 10, color: 'var(--sage)' },
                    { plan: 'Pro Annual', count: '4,100', pct: 2.2, color: 'var(--sage-deep)' },
                    { plan: 'Team', count: '1,500', pct: 0.8, color: 'var(--gold)' },
                  ].map((r, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                        <span>{r.plan}</span>
                        <span style={{ color: 'var(--bark)' }}>{r.count} users ({r.pct}%)</span>
                      </div>
                      <div className="progress-bar">
                        <div style={{ height: '100%', width: `${r.pct}%`, background: r.color, borderRadius: 2 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {adminView === 'analytics' && (
            <div>
              <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, marginBottom: 32 }}>Usage Analytics</h1>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div className="card" style={{ padding: 24 }}>
                  <h3 style={{ fontFamily: 'Fraunces, serif', marginBottom: 20 }}>Top AI Tools</h3>
                  {[
                    { tool: 'Background Remover', uses: '842K', pct: 100 },
                    { tool: 'Image Enhancer', uses: '623K', pct: 74 },
                    { tool: 'Portrait Retouch', uses: '412K', pct: 49 },
                    { tool: 'Color Correction', uses: '389K', pct: 46 },
                    { tool: 'AI Filters', uses: '201K', pct: 24 },
                  ].map((t, i) => (
                    <div key={i} style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                        <span>{t.tool}</span><span className="mono">{t.uses}</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${t.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card" style={{ padding: 24 }}>
                  <h3 style={{ fontFamily: 'Fraunces, serif', marginBottom: 20 }}>Conversion Funnel</h3>
                  {[
                    { stage: 'Visitors', count: '1.2M', pct: 100 },
                    { stage: 'Registered', count: '182K', pct: 15 },
                    { stage: 'Active free', count: '92K', pct: 8 },
                    { stage: 'Trial started', count: '18K', pct: 1.5 },
                    { stage: 'Converted Pro', count: '8.4K', pct: 0.7 },
                  ].map((s, i) => (
                    <div key={i} style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                        <span>{s.stage}</span>
                        <span>{s.count} <span style={{ color: 'var(--bark)', fontSize: 12 }}>({s.pct}%)</span></span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${s.pct * 0.67}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {adminView === 'subscriptions' && (
            <div>
              <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, marginBottom: 32 }}>Subscription Management</h1>
              <div className="card" style={{ overflow: 'hidden' }}>
                <table className="data-table">
                  <thead>
                    <tr><th>User</th><th>Plan</th><th>Amount</th><th>Next billing</th><th>Status</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {[
                      { user: 'Aanya S.', plan: 'Pro Monthly', amount: '$19', next: 'Feb 12', status: 'Active' },
                      { user: 'Lucas M.', plan: 'Team Annual', amount: '$468/yr', next: 'Dec 8', status: 'Active' },
                      { user: 'Raj P.', plan: 'Pro Annual', amount: '$180/yr', next: 'Nov 15', status: 'Paused' },
                    ].map((s, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 500 }}>{s.user}</td>
                        <td>{s.plan}</td>
                        <td className="mono">{s.amount}</td>
                        <td>{s.next}</td>
                        <td><span className={`badge ${s.status === 'Active' ? 'badge-sage' : 'badge-gold'}`}>{s.status}</span></td>
                        <td>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button className="btn btn-ghost btn-sm">Manage</button>
                            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }}>Cancel</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {adminView === 'credits' && (
            <div>
              <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, marginBottom: 32 }}>Credit Management</h1>
              <div style={{ display: 'flex', gap: 20, marginBottom: 32 }}>
                <div className="card" style={{ padding: 24, flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--bark)', marginBottom: 4 }}>Total credits sold</div>
                  <div className="stat-number">1.24M</div>
                </div>
                <div className="card" style={{ padding: 24, flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--bark)', marginBottom: 4 }}>Credits used this month</div>
                  <div className="stat-number">384K</div>
                </div>
                <div className="card" style={{ padding: 24, flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--bark)', marginBottom: 4 }}>Credit revenue</div>
                  <div className="stat-number">$6,240</div>
                </div>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', marginBottom: 20 }}>Issue Credits to User</h3>
                <div style={{ display: 'flex', gap: 12, maxWidth: 480 }}>
                  <input className="input" placeholder="User email…" style={{ flex: 2 }} />
                  <input className="input" placeholder="Amount" style={{ flex: 1 }} type="number" />
                  <button className="btn btn-primary">Issue</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── BLOG PAGE ─────────────────────────────────────────────────────────────────
const BlogPage = ({ setPage }) => {
  const posts = [
    { title: '10 AI Photo Editing Tricks That Save Hours', excerpt: 'Discover the most powerful AI tools in PixelMind and how professionals use them to cut editing time by 80%.', date: 'Jan 28, 2026', tag: 'Tutorial', readTime: '6 min', emoji: '🎨' },
    { title: 'The Complete Guide to Background Removal in 2026', excerpt: 'From product photography to portrait editing — everything you need to know about AI background removal.', date: 'Jan 20, 2026', tag: 'Guide', readTime: '9 min', emoji: '✂️' },
    { title: 'How E-commerce Brands Use Batch AI Editing', excerpt: 'Case study: How one Shopify store went from 3 days to 2 hours for their monthly product catalog update.', date: 'Jan 14, 2026', tag: 'Case Study', readTime: '7 min', emoji: '📦' },
    { title: 'AI Portrait Retouching: Ethics & Best Practices', excerpt: 'A balanced look at when AI retouching enhances vs. distorts authenticity, with practical guidelines for creators.', date: 'Jan 5, 2026', tag: 'Opinion', readTime: '5 min', emoji: '◉' },
    { title: 'Understanding AI Upscaling: 2x vs 4x vs 8x', excerpt: 'Technical breakdown of different upscaling algorithms and which resolution multiplier is right for your use case.', date: 'Dec 29, 2025', tag: 'Technical', readTime: '8 min', emoji: '◈' },
    { title: 'New Feature: AI Image Generator is Here', excerpt: 'Introducing text-to-image generation directly in PixelMind. Create unique backgrounds and visuals from prompts.', date: 'Dec 15, 2025', tag: 'Update', readTime: '3 min', emoji: '✦' },
  ];

  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ padding: '80px 40px 60px', background: 'var(--beige)', textAlign: 'center' }}>
        <div className="badge badge-sage" style={{ marginBottom: 16 }}>Blog</div>
        <h1 style={{ fontSize: 'clamp(36px,5vw,60px)', marginBottom: 16 }}>
          Stories & guides<br /><em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>for creators</em>
        </h1>
        <p style={{ color: 'var(--bark)', fontSize: 17, maxWidth: 440, margin: '0 auto' }}>
          Tutorials, case studies, and insights from the world of AI photography.
        </p>
      </section>
      <section style={{ padding: '60px 40px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {posts.map((p, i) => (
              <div key={i} className="card" style={{ overflow: 'hidden', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                <div style={{
                  height: 160, background: `hsl(${130 + i * 20}, ${25 + i * 5}%, ${80 - i * 3}%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52
                }}>{p.emoji}</div>
                <div style={{ padding: '20px 24px 24px' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    <span className="badge badge-sage" style={{ fontSize: 11 }}>{p.tag}</span>
                    <span style={{ fontSize: 12, color: 'var(--bark)' }}>{p.readTime} read</span>
                  </div>
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 18, marginBottom: 10, lineHeight: 1.3 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--bark)', lineHeight: 1.6, marginBottom: 16 }}>{p.excerpt}</p>
                  <div style={{ fontSize: 12, color: 'var(--bark-light)' }}>{p.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ── ABOUT PAGE ────────────────────────────────────────────────────────────────
const AboutPage = ({ openModal }) => (
  <div style={{ paddingTop: 64 }}>
    <section style={{ padding: '100px 40px', textAlign: 'center', background: 'var(--beige)' }}>
      <div className="badge badge-sage" style={{ marginBottom: 20 }}>About</div>
      <h1 style={{ fontSize: 'clamp(36px,5vw,68px)', maxWidth: 700, margin: '0 auto 24px', lineHeight: 1.1 }}>
        We're building the future of <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>visual creation</em>
      </h1>
      <p style={{ fontSize: 18, color: 'var(--bark)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
        PixelMind was founded in 2024 with a simple belief: professional image editing should be accessible to everyone, powered by the best AI available.
      </p>
    </section>
    <section style={{ padding: '80px 40px' }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', marginBottom: 80 }}>
          <div>
            <h2 style={{ fontSize: 36, marginBottom: 20 }}>Our mission</h2>
            <p style={{ color: 'var(--bark)', lineHeight: 1.8, marginBottom: 16 }}>
              We believe every creator — whether you're a solo photographer, a growing brand, or a Fortune 500 company — deserves access to world-class image editing tools.
            </p>
            <p style={{ color: 'var(--bark)', lineHeight: 1.8 }}>
              By combining cutting-edge AI with an intuitive interface, PixelMind puts professional-grade editing in the hands of anyone with a browser and an image.
            </p>
          </div>
          <div style={{
            height: 320, borderRadius: 24, background: 'var(--sage-pale)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80
          }}>🌿</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginBottom: 80 }}>
          {[
            { name: 'Arjun Kapoor', role: 'CEO & Co-founder', bg: '#D4E6D5', emoji: 'A' },
            { name: 'Chen Wei', role: 'CTO & Co-founder', bg: '#EDE5D6', emoji: 'C' },
            { name: 'Priya Sharma', role: 'Head of AI Research', bg: '#E8DDD0', emoji: 'P' },
          ].map((m, i) => (
            <div key={i} className="card" style={{ padding: 24, textAlign: 'center' }}>
              <div style={{
                width: 80, height: 80, borderRadius: 40, background: m.bg,
                margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Fraunces, serif', fontSize: 36, color: 'var(--sage-deep)'
              }}>{m.emoji}</div>
              <div style={{ fontWeight: 500, marginBottom: 4 }}>{m.name}</div>
              <div style={{ fontSize: 13, color: 'var(--bark)' }}>{m.role}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '60px', background: 'var(--beige)', borderRadius: 24 }}>
          <h2 style={{ fontSize: 32, marginBottom: 16 }}>Ready to join us?</h2>
          <p style={{ color: 'var(--bark)', marginBottom: 32 }}>We're hiring exceptional people across engineering, design, and growth.</p>
          <button className="btn btn-primary btn-lg">View open roles →</button>
        </div>
      </div>
    </section>
  </div>
);

// ── AUTH MODALS ───────────────────────────────────────────────────────────────
const AuthModal = ({ type, setModal, setUser, addToast }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const isLogin = type === 'login';

  const handleSubmit = async () => {
    if (!form.email || !form.password) { addToast('Please fill all fields', 'error'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const isAdmin = form.email.includes('admin');
    setUser({
      name: isLogin ? (form.email.split('@')[0]) : form.name,
      email: form.email,
      plan: 'free',
      role: isAdmin ? 'admin' : 'user',
    });
    addToast(isLogin ? 'Welcome back!' : 'Account created!', 'success');
    setModal(null);
    setLoading(false);
  };

  return (
    <div className="modal-backdrop" onClick={() => setModal(null)}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div style={{ padding: '32px 32px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
            <div>
              <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 28, marginBottom: 6 }}>
                {isLogin ? 'Welcome back' : 'Get started free'}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--bark)' }}>
                {isLogin ? 'Sign in to your PixelMind account' : 'Create your free account today'}
              </p>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setModal(null)} style={{ padding: 8 }}>✕</button>
          </div>

          {/* Google Sign in */}
          <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', marginBottom: 20, gap: 12 }}>
            <span style={{ fontWeight: 700, color: '#4285F4' }}>G</span> Continue with Google
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--beige-mid)' }} />
            <span style={{ fontSize: 12, color: 'var(--bark)' }}>or continue with email</span>
            <div style={{ flex: 1, height: 1, background: 'var(--beige-mid)' }} />
          </div>

          {!isLogin && (
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Full name</label>
              <input className="input" placeholder="Aanya Sharma"
                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
          )}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Email</label>
            <input className="input" type="email" placeholder="you@example.com"
              value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Password</label>
            <input className="input" type="password" placeholder="••••••••"
              value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
          </div>

          <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}
            onClick={handleSubmit} disabled={loading}>
            {loading ? <><div className="spinner" />Please wait…</> : (isLogin ? 'Sign in →' : 'Create free account →')}
          </button>

          <div style={{ textAlign: 'center', marginTop: 20, paddingBottom: 32, fontSize: 13, color: 'var(--bark)' }}>
            {isLogin ? (
              <>Don't have an account?{' '}
                <span style={{ color: 'var(--sage)', cursor: 'pointer', fontWeight: 500 }}
                  onClick={() => setModal('register')}>Sign up free</span>
              </>
            ) : (
              <>Already have an account?{' '}
                <span style={{ color: 'var(--sage)', cursor: 'pointer', fontWeight: 500 }}
                  onClick={() => setModal('login')}>Sign in</span>
              </>
            )}
          </div>
          {!isLogin && (
            <div style={{ textAlign: 'center', paddingBottom: 24, fontSize: 11, color: 'var(--bark-light)' }}>
              By signing up you agree to our Terms of Service & Privacy Policy
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const UpgradeModal = ({ setModal, addToast }) => {
  const [plan, setPlan] = useState('monthly');
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    addToast('Welcome to Pro! 🎉', 'success');
    setModal(null);
    setLoading(false);
  };

  return (
    <div className="modal-backdrop" onClick={() => setModal(null)}>
      <div className="modal-box" style={{ maxWidth: 520 }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: 32 }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✦</div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 30, marginBottom: 8 }}>Upgrade to Pro</h2>
            <p style={{ color: 'var(--bark)', fontSize: 14 }}>Unlock unlimited power for your creative work</p>
          </div>

          {/* Plan toggle */}
          <div style={{ display: 'flex', background: 'var(--beige)', borderRadius: 12, padding: 4, marginBottom: 24 }}>
            {[
              { id: 'monthly', label: 'Monthly · $19/mo' },
              { id: 'annual', label: 'Annual · $15/mo', badge: 'Save 20%' },
            ].map(p => (
              <button key={p.id} onClick={() => setPlan(p.id)} style={{
                flex: 1, padding: '10px 16px', border: 'none', cursor: 'pointer',
                borderRadius: 10, fontSize: 13, fontWeight: 500,
                background: plan === p.id ? 'var(--warm-white)' : 'transparent',
                color: plan === p.id ? 'var(--charcoal)' : 'var(--bark)',
                boxShadow: plan === p.id ? 'var(--shadow-sm)' : 'none',
                transition: 'var(--transition)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}>
                {p.label}
                {p.badge && plan === p.id && <span className="badge badge-sage" style={{ fontSize: 10 }}>{p.badge}</span>}
              </button>
            ))}
          </div>

          {/* Features */}
          <div style={{ marginBottom: 28 }}>
            {[
              '✓ Unlimited AI edits',
              '✓ HD & 4K export (no watermark)',
              '✓ Batch editing — up to 100 images',
              '✓ All AI tools: BG Generator, Image AI',
              '✓ Priority processing speed',
              '✓ 100 AI credits per month',
            ].map((f, i) => (
              <div key={i} style={{ fontSize: 14, padding: '7px 0', color: 'var(--charcoal)', display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--sage)' }}>✓</span>
                <span>{f.replace('✓ ', '')}</span>
              </div>
            ))}
          </div>

          {/* Stripe-like payment */}
          <div style={{ background: 'var(--beige)', padding: 20, borderRadius: 12, marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: 'var(--bark)', marginBottom: 8, fontWeight: 500 }}>Payment details</div>
            <input className="input" placeholder="Card number" style={{ marginBottom: 8 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="input" placeholder="MM/YY" />
              <input className="input" placeholder="CVC" />
            </div>
          </div>

          <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}
            onClick={handleUpgrade} disabled={loading}>
            {loading ? <><div className="spinner" />Processing…</> : `Start Pro — ${plan === 'monthly' ? '$19' : '$180'}/yr →`}
          </button>
          <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: 'var(--bark-light)' }}>
            7-day free trial · Cancel anytime · Secured by Stripe
          </div>
        </div>
      </div>
    </div>
  );
};

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('landing');
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const openModal = (type) => {
    if ((type === 'login' || type === 'register') && user) return;
    setModal(type);
  };

  const navigateTo = (p) => {
    if ((p === 'dashboard' || p === 'admin') && !user) {
      setModal('login');
      return;
    }
    setPage(p);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <GlobalStyles />
      <Navbar
        page={page} setPage={navigateTo}
        theme={theme} setTheme={setTheme}
        user={user} setUser={setUser}
        openModal={openModal}
      />

      {/* Pages */}
      {page === 'landing' && <LandingPage setPage={navigateTo} openModal={openModal} user={user} />}
      {page === 'editor' && <EditorPage user={user} openModal={openModal} addToast={addToast} />}
      {page === 'pricing' && <PricingPage openModal={openModal} user={user} />}
      {page === 'dashboard' && user && <Dashboard user={user} setUser={setUser} setPage={navigateTo} addToast={addToast} />}
      {page === 'admin' && user?.role === 'admin' && <AdminPanel setPage={navigateTo} />}
      {page === 'blog' && <BlogPage setPage={navigateTo} />}
      {page === 'about' && <AboutPage openModal={openModal} />}

      {/* Modals */}
      {(modal === 'login' || modal === 'register') && (
        <AuthModal type={modal} setModal={setModal} setUser={setUser} addToast={addToast} />
      )}
      {modal === 'upgrade' && (
        <UpgradeModal setModal={setModal} addToast={addToast} />
      )}

      {/* Toasts */}
      <ToastContext toasts={toasts} />
    </>
  );
}
