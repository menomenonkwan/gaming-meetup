import MainNavigation from './MainNavigation'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="app">
      <MainNavigation />
      <main>
        <div className="container">
          { children }
        </div>
      </main>
      <Footer />
    </div>
  )
}
