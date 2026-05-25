import React from 'react';
import { createRoot } from 'react-dom/client';
import DashboardApp from './DashboardDemo.tsx';

const rootEl = document.getElementById('dashboard-demo-root');
if (rootEl) {
    const root = createRoot(rootEl);
    root.render(<DashboardApp />);
}
