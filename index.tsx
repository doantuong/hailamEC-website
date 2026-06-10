import React from 'react';
import { createRoot } from 'react-dom/client';
import FloatingContact from './components/FloatingContact';
import FAQSection from './src/components/FAQSection';
import ProjectsSection from './src/components/ProjectsSection';
import Calculators from './src/components/Calculators';
import { companyProfile } from './src/config/company';

// Helper to determine language from path
function getLang(): 'vi' | 'en' {
  if (window.location.pathname.startsWith('/en')) return 'en';
  return 'vi'; // Default to vietnamese for root / and /vi/
}

function initCompanyProfileLinks() {
  const profileIframe = document.getElementById('company-profile-iframe') as HTMLIFrameElement;
  if (profileIframe && profileIframe.src !== companyProfile.embedUrl) {
    profileIframe.src = companyProfile.embedUrl;
  }

  const profileLinks = document.querySelectorAll('.company-profile-link');
  profileLinks.forEach(link => {
    (link as HTMLAnchorElement).href = companyProfile.viewUrl;
  });
}

function initFloatingContact() {
  const CONTAINER_ID = 'hailamec-floating-contact-root';
  if (document.getElementById(CONTAINER_ID)) return;
  if (!document.body) return;

  const rootEl = document.createElement('div');
  rootEl.id = CONTAINER_ID;
  document.body.appendChild(rootEl);

  const root = createRoot(rootEl);
  root.render(<FloatingContact />);
}

function initReactComponents() {
  const lang = getLang();

  const projectsRoot = document.getElementById('react-projects-root');
  if (projectsRoot && !projectsRoot.hasAttribute('data-mounted')) {
    projectsRoot.setAttribute('data-mounted', 'true');
    createRoot(projectsRoot).render(<ProjectsSection lang={lang} />);
  }

  const faqRoot = document.getElementById('react-faq-root');
  if (faqRoot && !faqRoot.hasAttribute('data-mounted')) {
    faqRoot.setAttribute('data-mounted', 'true');
    createRoot(faqRoot).render(<FAQSection lang={lang} />);
  }
  
  const calculatorsRoot = document.getElementById('react-calculators-root');
  if (calculatorsRoot && !calculatorsRoot.hasAttribute('data-mounted')) {
    calculatorsRoot.setAttribute('data-mounted', 'true');
    // For tools page we default to english but can pass lang
    createRoot(calculatorsRoot).render(<Calculators lang={lang} />);
  }
}

function initializeAll() {
  initCompanyProfileLinks();
  initFloatingContact();
  initReactComponents();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    initializeAll();
}

const widgetObserver = new MutationObserver((mutations, obs) => {
    if (document.body) {
        initializeAll();
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


