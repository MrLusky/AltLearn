import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/navbar.jsx'
import Footer from '../components/footer.jsx'
import GameRunner from '../games/GameRunner.jsx'
import { Stars } from '../games/ui.jsx'
import { getActivity, levelsOfYear, YEARS } from '../content/index.js'
import { useProgress } from '../ProgressContext.jsx'
import { useTheme } from '../ThemeContext.jsx'
import { ACTIVITY_IMAGES } from '../components/images.js'
import NotFound from './NotFound.jsx'

export default function GamePage() {
  const { slug } = useParams()
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const { year: savedYear, update } = useTheme()
  const { starsOf, nextFor } = useProgress()
  const [runKey, setRunKey] = useState(0)

  const activity = getActivity(slug)
  if (!activity) return <NotFound />

  const year = YEARS.includes(Number(params.get('ano'))) ? Number(params.get('ano')) : savedYear
  const levels = levelsOfYear(slug, year)
  const levelNumber = Number(params.get('nivel')) || 0
  const level = levels.find((l) => l.level === levelNumber)
  const recommended = nextFor(year)?.slug === slug ? nextFor(year).level : null

  const base = `/jogos/${slug}`
  const toMenu = () => navigate(`${base}?ano=${year}`)
  const toLevel = (n) => navigate(`${base}?ano=${year}&nivel=${n}`)
  const chooseYear = (y) => { update({ year: y }); setParams({ ano: String(y) }) }

  return (
    <div className="site-page game-page">
      <Navbar />
      <main className="game-main">
        <div className="game-container">
          {level ? (
            <GameRunner key={`${year}-${level.level}-${runKey}`} activity={activity} level={level}
              onExit={toMenu} onReplay={() => setRunKey((k) => k + 1)}
              onNext={level.level < levels.length ? () => toLevel(level.level + 1) : null} />
          ) : (
            <section className="game-card is-menu" aria-labelledby="menu-title">
              <Link to="/jogos" className="game-chip"><span aria-hidden="true">←</span> Todos os jogos</Link>
              <div className="menu-hero">
                <img src={ACTIVITY_IMAGES[activity.icon]} alt="" />
                <div>
                  <span className="section-eyebrow">{activity.subject.toUpperCase()}</span>
                  <h1 id="menu-title">{activity.title}</h1>
                  <p>{activity.description}</p>
                </div>
              </div>

              <div className="year-toggle" role="group" aria-label="Escolha o ano">
                {YEARS.map((y) => (
                  <button key={y} type="button" className={y === year ? 'is-active' : ''} aria-pressed={y === year} onClick={() => chooseYear(y)}>{y}º ano</button>
                ))}
              </div>

              <ol className="level-list">
                {levels.map((l) => (
                  <li key={l.level}>
                    <button type="button" className="level-card" onClick={() => toLevel(l.level)}>
                      <span className="level-number" aria-hidden="true">{l.level}</span>
                      <span className="level-copy">
                        <strong>{l.title}</strong>
                        <span>{l.instruction}</span>
                      </span>
                      <span className="level-side">
                        {recommended === l.level && <span className="level-badge">Próxima</span>}
                        <Stars value={starsOf(slug, year, l.level)} />
                      </span>
                    </button>
                  </li>
                ))}
              </ol>

              <details className="adult-note">
                <summary>Para pais e professores</summary>
                <p>{activity.adultNote}</p>
                <p className="adult-bncc">Habilidades da BNCC relacionadas: {activity.bncc.join(', ')}.</p>
                <p className="adult-bncc">O mapeamento é um alinhamento inicial e deve ser revisado por profissionais da educação.</p>
              </details>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
