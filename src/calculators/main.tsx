import React from 'react';
import { createRoot } from 'react-dom/client';
import CalculatorApp from './CalculatorApp';

function mountCalculator() {
    const rootEl = document.getElementById('calculators-root');
    if (rootEl) {
        // Prevent double mounting
        if (rootEl.dataset.mounted) return;
        rootEl.dataset.mounted = 'true';
        
        const root = createRoot(rootEl);
        root.render(<CalculatorApp />);
        console.log('[HAI LAM E&C] Engineering Calculator successfully mounted.');
    }
}

// Ensure execution is safe regardless of when WP injects the script (async/defer)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountCalculator);
} else {
    mountCalculator();
}

// Fallback for Flatsome / WP caching mechanisms that might inject the root late
const observer = new MutationObserver((mutations, obs) => {
    const rootEl = document.getElementById('calculators-root');
    if (rootEl && !rootEl.dataset.mounted) {
        mountCalculator();
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
