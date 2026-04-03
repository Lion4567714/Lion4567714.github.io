import './App.css'
import Home from './Home'
import github from './assets/github.svg'
import linkedin from './assets/linkedin.svg'
import dog from './assets/kelso-peek.png'

function Header() {
  return (
    <header>
      <nav>
        <a id="name-button">ANDERS GILLILAND</a>
        <span>
          <a href="https://github.com/Lion4567714" target="_blank"><img className="nav-button" src={github}/></a>
          <a href="https://www.linkedin.com/in/anders-gilliland/" target="_blank"><img className="nav-button" src={linkedin}/></a>
        </span>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer>
      <span>· ―― · · · ―― ·</span>
    </footer>
  )
}

function App() {
  return (
    <main>
      <Header/>
      <div id="page-content">
        <Home/>
        <img id="dog" src={dog}/>
      </div>
      <Footer/>
    </main>
  )
}

export default App
