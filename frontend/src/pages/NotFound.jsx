import { Link } from 'react-router-dom'
import Navbar from '../components/navbar.jsx'
import Footer from '../components/footer.jsx'
import clouds from '../assets/clouds.png'

export default function NotFound() {
  return (
    <div className="site-page">
      <Navbar />
      <main className="notfound-main">
        <img src={clouds} alt="" />
        <span className="section-eyebrow">PÁGINA NÃO ENCONTRADA</span>
        <h1>Ops! Esse caminho não existe.</h1>
        <p>Vamos voltar para um lugar conhecido?</p>
        <Link to="/jogos" className="primary-button">Ir para os jogos</Link>
      </main>
      <Footer />
    </div>
  )
}
