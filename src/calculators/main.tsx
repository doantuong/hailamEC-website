import React from 'react';
import { createRoot } from 'react-dom/client';
import CalculatorApp from './CalculatorApp';

const rootEl = document.getElementById('calculators-root');
if (rootEl) {
    const root = createRoot(rootEl);
    root.render(<CalculatorApp />);
}
