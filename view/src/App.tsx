import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import TrackListPage from './pages/TrackListPage';
import TrackDetailsPage from './pages/TrackDetailsPage';
import './styles/global.scss';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TrackListPage />} />
        <Route path="/tracks/:id" element={<TrackDetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
