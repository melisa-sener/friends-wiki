import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import CastPage from './pages/CastPage.jsx'
import EpisodeDetailPage from './pages/EpisodeDetailPage.jsx'
import EpisodesPage from './pages/EpisodesPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LocationsPage from './pages/LocationsPage.jsx'
import PersonDetailPage from './pages/PersonDetailPage.jsx'
import SeasonDetailPage from './pages/SeasonDetailPage.jsx'
import SeasonsPage from './pages/SeasonsPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="characters" element={<CastPage />} />
          <Route path="characters/:personId" element={<PersonDetailPage />} />
          <Route path="seasons" element={<SeasonsPage />} />
          <Route path="seasons/:seasonId" element={<SeasonDetailPage />} />
          <Route path="episodes" element={<EpisodesPage />} />
          <Route path="episodes/:episodeId" element={<EpisodeDetailPage />} />
          <Route path="locations" element={<LocationsPage />} />
          <Route path="cast" element={<CastPage />} />
          <Route path="cast/:personId" element={<PersonDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
