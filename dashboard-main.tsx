import React from 'react';
import { createRoot } from 'react-dom/client';
import DashboardApp from './DashboardDemo.tsx';

function mountDashboard() {
    const rootEl = document.getElementById('dashboard-demo-root');
    if (rootEl) {
        if (rootEl.dataset.mounted) return;
        rootEl.dataset.mounted = 'true';
        
        const root = createRoot(rootEl);
        root.render(<DashboardApp />);
        console.log('[HAI LAM E&C] Dashboard Demo successfully mounted.');
    }
}

// Ensure execution is safe regardless of when WP injects the script (async/defer)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountDashboard);
} else {
    mountDashboard();
}

const observer = new MutationObserver((mutations, obs) => {
    const rootEl = document.getElementById('dashboard-demo-root');
    if (rootEl && !rootEl.dataset.mounted) {
        mountDashboard();
        obs.disconnect();
    }
});
if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
} else {
    document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, { childList: true, subtree: true });
    });
}
