import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar.jsx'
import blueStar from './assets/blue_star.png'
import logo from './assets/logo.png'
import rocket from './assets/rocket.png'
import { useAuth } from './AuthContext.jsx'
import GoogleButton from './components/GoogleButton.jsx'
import { useTheme } from './ThemeContext.jsx'

function Sign_up() {
  const { register, loginWithGoogle } = useAuth()
  const { year } = useTheme()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', repeat: '', grade_year: String(year) })
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
    if (form.password.length < 8) return setError('A senha precisa ter pelo menos 8 caracteres.')
    if (form.password !== form.repeat) return setError('As senhas não são iguais.')
    setBusy(true)
    try {
      await register({ name: form.name.trim(), email: form.email.trim(), password: form.password, password_confirmation: form.repeat, grade_year: Number(form.grade_year) })
      navigate('/jogos')
    } catch (err) {
      setError(err.offline ? 'Sem internet no momento. Tente de novo quando estiver conectado.' : err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="site-page auth-page">
      <Navbar />
      <main className="auth-main">
        <form className="auth-card" onSubmit={submit} noValidate>
          <img className="auth-decoration auth-star" src={blueStar} alt="" aria-hidden="true" />
          <img className="auth-decoration auth-rocket" src={rocket} alt="" aria-hidden="true" />
          <img className="auth-logo" src={logo} alt="AltLearn" />
          <span className="section-eyebrow">COMEÇAR A APRENDER</span>
          <h1>Criar conta</h1>
          <p>Crie seu acesso e acompanhe cada nova descoberta.</p>

          <label htmlFor="name">Nome</label>
          <input id="name" type="text" placeholder="Seu nome" autoComplete="name" value={form.name} onChange={set('name')} required />

          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" placeholder="seu@email.com" autoComplete="email" value={form.email} onChange={set('email')} required />

          <label htmlFor="grade">Ano escolar</label>
          <select id="grade" value={form.grade_year} onChange={set('grade_year')}>
            <option value="1">1º ano</option>
            <option value="2">2º ano</option>
          </select>

          <label htmlFor="password">Senha</label>
          <input id="password" type="password" placeholder="Crie uma senha (mín. 8 caracteres)" autoComplete="new-password" value={form.password} onChange={set('password')} required />

          <label htmlFor="repeat-password">Repetir senha</label>
          <input id="repeat-password" type="password" placeholder="Repita sua senha" autoComplete="new-password" value={form.repeat} onChange={set('repeat')} required />

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button type="submit" className="primary-button auth-button" disabled={busy}>{busy ? 'CRIANDO…' : 'CRIAR CONTA'}</button>
          <p className="auth-or">ou</p>
          <GoogleButton onCredential={withGoogle} />

          <p className="auth-footer-text">Já tem uma conta? <Link to="/login">Entrar</Link></p>
        </form>
      </main>
    </div>
  )
}

export default Sign_up
