import './App.css'
import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import Lmain from './components/lmain.jsx'
import Rmain from './components/rmain.jsx'
import Card from './components/card.jsx'
import Carousel from './components/carousel.jsx'
import Features from './components/features.jsx'

import astronaut from './assets/astronaut.png'
import lunar from './assets/lunar.png'
import clouds from './assets/clouds.png'
import readguy from './assets/readguy.png'
import letras from './assets/letras.png'
import numeros from './assets/numeros.png'
import formas from './assets/formas.png'
import sun from './assets/sun.png'
import bee from './assets/bee.png'
import aprendendo from './assets/aprendendo.png'

function App() {
  const activities = [
    {
      id: 1,
      title: 'Imagem e Palavra',
      description: 'Veja a figura, ouça a palavra e encontre como ela se escreve.',
      image: letras,
      subject: 'Português',
      to: '/jogos/imagem-palavra',
    },
    {
      id: 2,
      title: 'Arrastar e Soltar',
      description: 'Leve bichos, frutas, formas e cores para o grupo certo.',
      image: formas,
      subject: 'Classificação',
      to: '/jogos/arrastar-soltar',
    },
    {
      id: 3,
      title: 'Sequência de Rotina',
      description: 'Organize os cartões do dia a dia na ordem em que acontecem.',
      image: sun,
      subject: 'Organização',
      to: '/jogos/rotina',
    },
    {
      id: 4,
      title: 'Matemática Visual',
      description: 'Conte, complete sequências, junte e compare com desenhos.',
      image: numeros,
      subject: 'Matemática',
      to: '/jogos/matematica-visual',
    },
    {
      id: 5,
      title: 'Caça aos Sons',
      description: 'Escute com atenção e encontre letras, sons e sílabas.',
      image: bee,
      subject: 'Consciência fonológica',
      to: '/jogos/caca-sons',
    },
    {
      id: 6,
      title: 'Meu jeito de aprender',
      description: 'Escolha o tamanho das letras, as cores e os sons que fazem bem para você.',
      image: aprendendo,
      subject: 'Personalização',
      to: '/acessibilidade',
      cta: 'Ajustar',
    },
  ]

  return (
    <div className="site-page">
      <Navbar />

      <main>
        <Lmain
          eyebrow="ALTLEARN"
          title="Toda descoberta começa com um pequeno passo."
          description="Atividades visuais e jogos interativos para praticar leitura, matemática e novas habilidades com curiosidade e autonomia."
          image={astronaut}
          imageAlt="Ilustração de uma criança explorando o espaço"
          sectionClass="section-hero"
          buttonText="Começar a aprender"
          buttonHref="/jogos"
        />

        <Carousel />

        <Rmain
          eyebrow="APRENDER NO SEU RITMO"
          title="Seu ritmo também é um jeito de aprender."
          description="A AltLearn transforma os conteúdos do 1º e 2º ano em experiências curtas para praticar, tentar de novo e reconhecer cada conquista."
          image={lunar}
          imageAlt="Ilustração de uma lua com estrelas"
          sectionClass="section-blue"
        />

        <Card items={activities} />

        <Lmain
          eyebrow="PEQUENOS PASSOS"
          title="Um desafio de cada vez."
          description="Escolha uma atividade, experimente uma solução e avance quando se sentir pronto. Aprender também pode ser calmo."
          image={clouds}
          imageAlt="Ilustração de nuvens"
          sectionClass="section-lavender"
          reverse
        />

        <Rmain
          eyebrow="LEITURA E ATENÇÃO"
          title="Leia, jogue e descubra."
          description="Histórias curtas, desafios visuais e atividades interativas transformam o estudo em uma experiência mais próxima, leve e significativa."
          image={readguy}
          imageAlt="Ilustração de uma criança lendo"
          sectionClass="section-dark"
        />

        <Features />
      </main>

      <Footer />
    </div>
  )
}

export default App
