import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Aboutus from './Aboutus.jsx'
import Sign_in from './sign_in.jsx'
import Sign_up from './sign_up.jsx'
import StudentArea from './pages/StudentArea.jsx'
import GamePage from './pages/GamePage.jsx'
import Accessibility from './pages/Accessibility.jsx'
import NotFound from './pages/NotFound.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import PreferencesSync from './PreferencesSync.jsx'
import { ThemeProvider } from './ThemeContext.jsx'
import { AuthProvider } from './AuthContext.jsx'
import { ProgressProvider } from './ProgressContext.jsx'
import './index.css'
import './App.css'
import './styles/games.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || undefined}>
            <ScrollManager />
            <PreferencesSync />
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/sobre" element={<Aboutus />} />
              <Route path="/login" element={<Sign_in />} />
              <Route path="/cadastro" element={<Sign_up />} />
              <Route path="/jogos" element={<StudentArea />} />
              <Route path="/jogos/:slug" element={<GamePage />} />
              <Route path="/acessibilidade" element={<Accessibility />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

// PWA: registra o service worker (manifesto + cache do app para abrir sem internet).
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => { /* sem SW o app segue funcionando online */ })
  })
}
