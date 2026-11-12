import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';

const routes = [
  { id: 'stopwatch', label: 'Stopwatch', icon: '◷' },
  { id: 'timer', label: 'Timer', icon: '◴' },
  { id: 'calendar', label: 'Calendar', icon: '▦' },
  { id: 'scores', label: 'Scores', icon: '↗' },
];

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true">t</span>;
}

function RouteLink({ route, active, children, className = '' }) {
  return (
    <a
      href={`#${route.id}`}
      data-route={route.id}
      className={`${className}${active ? ' active' : ''}`}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </a>
  );
}

function App() {
  const [ui, setUi] = useState({
    route: location.hash.slice(1) || 'stopwatch',
    html: '',
    date: '',
    points: 0,
    weekTime: 'Start a session to earn points',
    progress: 0,
    toast: '',
    toastVisible: false,
    dialog: '',
  });

  useEffect(() => {
    window.taskTrackRender = (next) => setUi((current) => ({ ...current, ...next }));
    window.taskTrackToast = (message, visible = true) => setUi((current) => ({ ...current, toast: message, toastVisible: visible }));
    import('../app.js').then(({ initTaskTrack }) => initTaskTrack());
    return () => {
      delete window.taskTrackRender;
      delete window.taskTrackToast;
    };
  }, []);

  const currentRoute = ui.route;
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <a className="brand" href="#stopwatch" data-route="stopwatch" aria-label="Task Track home">
          <BrandMark /><span>task track</span>
        </a>
        <div className="nav-label">Workspace</div>
        <nav className="primary-nav">
          {routes.map((route) => (
            <RouteLink key={route.id} route={route} active={currentRoute === route.id} className="nav-item">
              <span className="nav-icon" aria-hidden="true">{route.icon}</span>{route.label}
            </RouteLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="week-mini">
            <span className="eyebrow">THIS WEEK</span>
            <strong>{ui.points} <small>pts</small></strong>
            <span>{ui.weekTime}</span>
            <div className="mini-track"><i style={{ width: `${ui.progress}%` }} /></div>
          </div>
          <a href="#settings" data-route="settings" className={`nav-item settings-link${currentRoute === 'settings' ? ' active' : ''}`} aria-current={currentRoute === 'settings' ? 'page' : undefined}>
            <span className="nav-icon" aria-hidden="true">⚙</span> Settings
          </a>
        </div>
        <div className="local-note"><span className="local-dot" /> Your data stays on this device</div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <a className="mobile-brand" href="#stopwatch" data-route="stopwatch"><BrandMark /> Task Track</a>
          <div className="top-context"><span className="context-dot" /><span>Personal workspace</span></div>
          <div className="top-actions">
            <span className="today-label">{ui.date}</span>
            <a className="icon-button" href="#settings" data-route="settings" aria-label="Open settings">⚙</a>
            <div className="avatar" aria-hidden="true">TT</div>
          </div>
        </header>
        <div id="view" className="view" tabIndex={-1} dangerouslySetInnerHTML={{ __html: ui.html }} />
      </main>

      <nav className="bottom-nav" aria-label="Primary navigation">
        {routes.map((route) => (
          <RouteLink key={route.id} route={route} active={currentRoute === route.id} className="bottom-nav-link">
            <span aria-hidden="true">{route.icon}</span>{route.label}
          </RouteLink>
        ))}
      </nav>
      <div id="dialog-root" dangerouslySetInnerHTML={{ __html: ui.dialog }} />
      <div id="toast" className={`toast${ui.toastVisible ? ' show' : ''}`} role="status" aria-live="polite">{ui.toast}</div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
