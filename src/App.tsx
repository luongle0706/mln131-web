import { Hero } from './components/Hero'
import { ContentSection } from './components/ContentSection'
import { Game } from './components/Game'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-yellow-50">
      <Hero />
      <ContentSection />
      <Game />
      <Footer />
    </div>
  )
}

export default App
