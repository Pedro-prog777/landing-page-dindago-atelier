import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { AdminApp } from './admin/AdminApp';
import { ConteudoProvider } from './conteudo/ConteudoProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/*
          O painel fica fora do ConteudoProvider: é outra aplicação, com outra
          linguagem visual, e não deve carregar o conteúdo público.
        */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/*
          A landing page recebe o conteúdo já na primeira renderização (do
          arquivo local) e o substitui quando a API responde.
        */}
        <Route
          path="*"
          element={
            <ConteudoProvider>
              <App />
            </ConteudoProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
