import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar.jsx'
import Footer from '../components/footer.jsx'
import { Stars } from '../games/ui.jsx'
import { ACTIVITIES, MAX_STARS_PER_YEAR, YEARS, getActivity } from '../content/index.js'
import { ACTIVITY_IMAGES } from '../components/images.js'
import { useAuth } from '../AuthContext.jsx'
import { useProgress } from '../ProgressContext.jsx'
import { useTheme } from '../ThemeContext.jsx'
import astronaut from '../assets/astronaut.png'

// Área do estudante (artigo, seção 4.2): acesso às atividades e acompanhamento do progresso.
export default function StudentArea() {
  const { user, logout } = useAuth()
  const { yearStars, nextFor, totalStars } = useProgress()
  const { year, update } = useTheme()
  const navigate = useNavigate()
  const next = nextFor(year)
  const nextActivity = next && getActivity(next.slug)
  const yearTotal = ACTIVITIES.reduce((sum, a) => sum + yearStars(a.slug, year), 0)
  const yearMax = ACTIVITIES.length * MAX_STARS_PER_YEAR

  return (
    <div className="site-page student-page">
      <Navbar />
      <main>
        <section className="student-hero">
          <div className="student-hero-inner">
            <img src={astronaut} alt="" className="student-mascot" />
            <div className="student-hero-copy">
              <span className="section-eyebrow">ÁREA DO ESTUDANTE</span>
              <h1>{user ? `Olá, ${user.name.split(' ')[0]}!` : 'Olá! Vamos aprender?'}</h1>
              <p>{next ? 'Escolha um jogo ou continue de onde parou. Sem pressa, no seu ritmo.' : 'Você completou todas as fases deste ano. Que conquista! Pode jogar de novo quando quiser.'}</p>

              <div className="student-actions">
                {next && (
                  <button type="button" className="primary-button" onClick={() => navigate(`/jogos/${next.slug}?ano=${next.year}&nivel=${next.level}`)}>
                    Continuar: {nextActivity.title}
                  </button>
                )}
                {user
                  ? <button type="button" className="ghost-button" onClick={logout}>Sair da conta</button>
                  : <Link to="/login" className="ghost-button">Entrar para salvar meu progresso</Link>}
              </div>
            </div>
          </div>
        </section>

        <section className="student-progress">
          <div className="content-container">
            <div className="progress-summary">
              <div>
                <span className="section-eyebrow">MEU PROGRESSO</span>
                <h2>{yearTotal} de {yearMax} estrelas no {year}º ano</h2>
                <div className="progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={yearMax} aria-valuenow={yearTotal} aria-label="Estrelas conquistadas neste ano">
                  <span style={{ width: `${(yearTotal / yearMax) * 100}%` }} />
                </div>
                <p className="progress-note">Total em todos os anos: {totalStars} estrelas.</p>
              </div>
              <div className="year-toggle" role="group" aria-label="Escolha o ano">
                {YEARS.map((y) => (
                  <button key={y} type="button" className={y === year ? 'is-active' : ''} aria-pressed={y === year} onClick={() => update({ year: y })}>{y}º ano</button>
                ))}
              </div>
            </div>

            <div className="activity-grid student-grid">
              {ACTIVITIES.map((activity) => {
                const got = yearStars(activity.slug, year)
                return (
                  <article className="activity-card" key={activity.slug}>
                    <div className="activity-image"><img src={ACTIVITY_IMAGES[activity.icon]} alt="" /></div>
                    <span className="activity-subject">{activity.subject}</span>
                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>
                    <div className="activity-progress">
                      <Stars value={Math.round(got / 3)} max={3} />
                      <span>{got}/{MAX_STARS_PER_YEAR}</span>
                    </div>
                    <Link className="card-button" to={`/jogos/${activity.slug}?ano=${year}`}>{got ? 'Continuar' : 'Vamos lá'}</Link>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
