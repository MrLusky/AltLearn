import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../ThemeContext.jsx'
import { useAuth } from '../AuthContext.jsx'
import logo from '../assets/logo.png'

function Navbar() {
  const { darkMode, setDarkMode, highContrast, setHighContrast, soundOn, setSoundOn } = useTheme()
  const { user } = useAuth()
  const linkClass = ({ isActive }) => (isActive ? 'is-current' : undefined)

  return (
    <header className="site-navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" aria-label="AltLearn - início">
          <span className="brand-name">AltLearn</span>
        </Link>

        <nav className="main-nav" aria-label="Navegação principal">
          <NavLink to="/jogos" className={linkClass}>Jogos</NavLink>
          <Link to="/#como-funciona">Como funciona</Link>
          <NavLink to="/sobre" className={linkClass}>Sobre nós</NavLink>
        </nav>

        <div className="navbar-actions">
          <label className="theme-switch" title={darkMode ? 'Desativar modo escuro' : 'Ativar modo escuro'}>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(event) => setDarkMode(event.target.checked)}
              aria-label="Ativar ou desativar modo escuro"
            />
            <span className="theme-slider">
              <span className="theme-icon">{darkMode ? '☾' : '☀'}</span>
            </span>
          </label>

          <label
            className="contrast-switch"
            title={highContrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
          >
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(event) => setHighContrast(event.target.checked)}
              aria-label="Ativar ou desativar modo de alto contraste"
            />
            <span className="contrast-slider">
              <span className="contrast-icon" aria-hidden="true">◐</span>
            </span>
          </label>

          <button type="button" className="nav-icon-button" onClick={() => setSoundOn(!soundOn)} aria-pressed={soundOn}
            aria-label={soundOn ? 'Desligar o som' : 'Ligar o som'} title={soundOn ? 'Som ligado' : 'Som desligado'}>
            <span aria-hidden="true">{soundOn ? '🔊' : '🔇'}</span>
          </button>

          <Link to="/acessibilidade" className="nav-icon-button" aria-label="Personalizar: tamanho das letras, cores e sons" title="Personalizar">
            <span aria-hidden="true" className="nav-aa">Aa</span>
          </Link>

          <Link to={user ? '/jogos' : '/login'} className="avatar-link" aria-label={user ? `Área de ${user.name}` : 'Entrar'}>
            <img src={logo} alt="" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
