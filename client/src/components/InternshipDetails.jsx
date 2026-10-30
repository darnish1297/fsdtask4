import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || '';

function InternshipDetails() {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/api/internships/${id}`);
        if (!response.ok) throw new Error('Internship not found');
        const data = await response.json();
        setInternship(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading details...</div>;
  if (error) return <div className="message message-error">{error}</div>;
  if (!internship) return null;

  return (
    <div>
      <Link to="/" className="back-link">
        ← Back to Internships
      </Link>

      <div className="details-page">
        <div className="details-header">
          <h1>{internship.title}</h1>
          <p>{internship.company}</p>
        </div>

        <div className="details-info">
          <div className="info-item">
            <div className="label">Location</div>
            <div className="value">{internship.location}</div>
          </div>
          <div className="info-item">
            <div className="label">Duration</div>
            <div className="value">{internship.duration}</div>
          </div>
          <div className="info-item">
            <div className="label">Stipend</div>
            <div className="value">{internship.stipend}</div>
          </div>
        </div>

        <div className="details-description">
          <h3>Description</h3>
          <p>{internship.description}</p>
        </div>

        <div className="details-requirements">
          <h3>Requirements</h3>
          <ul>
            {internship.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="details-actions">
          <Link to={`/apply/${internship.id}`} className="btn btn-primary">
            Apply Now
          </Link>
          <Link to="/" className="btn btn-outline">
            View Other Internships
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InternshipDetails;
