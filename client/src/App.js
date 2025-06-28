import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MatchList from './pages/MatchList';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar'; // if you have one

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/matches" element={<MatchList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
