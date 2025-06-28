import Header from './components/Header/Header'
import Banner from './components/Banner/Banner'
import ChatBot from './components/ChatBot/ChatBot'
import PortfolioCarousel from './components/PortfolioCarousel/PortfolioCarousel'
import AcademicWork from './components/AcademicWork/AcademicWork'
import GetInTouch from './components/GetInTouch/GetInTouch'
import Welcome from './components/Welcome/Welcome'
import ParticleBackground from './components/ParticleBackground/ParticleBackground'
import PersonalInfo from './components/PersonalInfo/PersonalInfo'

import './App.css'

function App() {
  return (
    <div className="App">
      <PersonalInfo/>
      {/* <Header /> */}
      <Welcome />
      {/* <Banner /> */}
      <ChatBot />
      <PortfolioCarousel />
      <AcademicWork />
      <GetInTouch />
      <ParticleBackground/>
    </div>
  )
}

export default App
