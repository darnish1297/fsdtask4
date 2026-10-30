import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || '';

function InternshipList() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await fetch(`${API_URL}/api/internships`);
        if (!response.ok) throw new Error('Failed to fetch internships');
        const data = await response.json();
        setInternships(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, []);

  if (loading) return <div className="loading">Loading internships...</div>;
  if (error) return <div className="message message-error">{error}</div>;

  return (
    <div>
      <h1 className="page-title">Available Internships</h1>
      <div className="internship-grid">
        {internships.map((internship) => (
          <Link
            to={`/internship/${internship.id}`}
            className="internship-card"
            key={internship.id}
          >
            <div className="card-header">
              <span className="card-title">{internship.title}</span>
              <span className="card-stipend">{internship.stipend}</span>
            </div>
            <div className="card-company">{internship.company}</div>
            <div className="card-meta">
              <span>📍 {internship.location}</span>
              <span>⏱ {internship.duration}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default InternshipList;
