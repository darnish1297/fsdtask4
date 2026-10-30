import { Routes, Route, Link } from 'react-router-dom';
import InternshipList from './components/InternshipList.jsx';
import InternshipDetails from './components/InternshipDetails.jsx';
import ApplicationForm from './components/ApplicationForm.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          🎓 Student Internship Portal
        </Link>
        <div className="nav-links">
          <Link to="/">Internships</Link>
          <Link to="/apply">Apply</Link>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<InternshipList />} />
          <Route path="/internship/:id" element={<InternshipDetails />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/apply/:id" element={<ApplicationForm />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© 2026 Student Internship Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
