import './App.css';
import './styles/course-details.css';
import './styles/header.css';
import './styles/searchbar.css';
import { Routes, Route } from 'react-router-dom';
import ClassPage from './pages/ClassPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
    

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/class" element={<ClassPage />} />
        <Route path="/class/:id" element={<ClassPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
