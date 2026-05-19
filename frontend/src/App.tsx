import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PlayerDetail from './components/Player/PlayerDetail';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/player/:id" element={<PlayerDetail />} />
    </Routes>
  );
};

export default App;