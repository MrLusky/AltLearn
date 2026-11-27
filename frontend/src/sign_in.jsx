import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar.jsx'
import bee from './assets/bee.png'
import girafa from './assets/girafa.png'
import logo from './assets/logo.png'
import { useAuth } from './AuthContext.jsx'
import GoogleButton from './components/GoogleButton.jsx'

function Sign_in() {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const set = (field) => (event) => setForm({ ...form, [field]: event.target.value })

  async function withGoogle(credential) {
    setError('')
    try {
      await loginWithGoogle(credential)
      navigate('/jogos')
    } catch (err) {
      setError(err.offline ? 'Sem internet no momento.' : err.message)
    }
  }

  async function submit(event) {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(form.email.trim(), form.password)
      navigate('/jogos')
    } catch (err) {
      setError(err.offline ? 'Sem internet no momento. Você ainda pode jogar sem entrar.' : err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="site-page auth-page">
      <Navbar />
      <main className="auth-main">
        <form className="auth-card" onSubmit={submit} noValidate>
          <img className="auth-decoration auth-bee" src={bee} alt="" aria-hidden="true" />
          <img className="auth-decoration auth-giraffe" src={girafa} alt="" aria-hidden="true" />
          <img className="auth-logo" src={logo} alt="AltLearn" />
          <span className="section-eyebrow">VOLTAR A APRENDER</span>
          <h1>Entrar</h1>
          <p>Acesse suas atividades e continue sua descoberta.</p>

          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" placeholder="seu@email.com" autoComplete="email" value={form.email} onChange={set('email')} required />

          <label htmlFor="password">Senha</label>
          <input id="password" type="password" placeholder="Sua senha" autoComplete="current-password" value={form.password} onChange={set('password')} required />

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button type="submit" className="primary-button auth-button" disabled={busy}>{busy ? 'ENTRANDO…' : 'ENTRAR'}</button>
          <p className="auth-or">ou</p>
          <GoogleButton onCredential={withGoogle} />

          <p className="auth-footer-text">Ainda não tem uma conta? <Link to="/cadastro">Criar conta</Link></p>
          <p className="auth-footer-text"><Link to="/jogos">Jogar sem entrar</Link></p>
        </form>
      </main>
    </div>
  )
}

export default Sign_in
