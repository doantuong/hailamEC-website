import React from 'react';
import { createRoot } from 'react-dom/client';
import FloatingContact from './components/FloatingContact';

// HAI LAM E&C STRATEGIC FLOATING CONTACT WIDGET

function initFloatingContact() {
  const CONTAINER_ID = 'hailamec-floating-contact-root';
  if (document.getElementById(CONTAINER_ID)) return;
  if (!document.body) {
      console.warn("[HAI LAM E&C] document.body not ready. Delaying mount...");
      return;
  }

  const rootEl = document.createElement('div');
  rootEl.id = CONTAINER_ID;
  document.body.appendChild(rootEl);

  const root = createRoot(rootEl);
  root.render(<FloatingContact />);
}

// Ensure execution is safe regardless of when WP injects the script (async/defer)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingContact);
} else {
    initFloatingContact();
}

// Fallback for Flatsome / WP caching mechanisms that might inject the script late
const widgetObserver = new MutationObserver((mutations, obs) => {
    if (document.body && !document.getElementById('hailamec-floating-contact-root')) {
        initFloatingContact();
        if (document.getElementById('hailamec-floating-contact-root')) {
            obs.disconnect();
        }
    }
});

if (document.body) {
    widgetObserver.observe(document.documentElement, { childList: true, subtree: true });
} else {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.body) {
            widgetObserver.observe(document.documentElement, { childList: true, subtree: true });
        }
    });
}

