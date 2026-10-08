import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { AdminSobDemanda } from './admin/AdminSobDemanda';
import { ConteudoProvider } from './conteudo/ConteudoProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={null}>
              <AdminSobDemanda />
            </Suspense>
          }
        />

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
