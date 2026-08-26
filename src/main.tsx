import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { applySeo, applyTheme } from './lib/theme';

// Aplica as cores e o SEO definidos em src/data/clientData.ts antes de renderizar.
applyTheme();
applySeo();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
