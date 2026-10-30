import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || '';

function ApplicationForm() {
  const { id } = useParams(); // optional pre-selected internship
  const [internships, setInternships] = useState([]);
  const [form, setForm] = useState({
    studentName: '',
    email: '',
    rollNumber: '',
    internshipId: id || '',
  });
  const [errors, setErrors] = useState({});
  const [submitMsg, setSubmitMsg] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch internship list for dropdown
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch(`${API_URL}/api/internships`);
        const data = await res.json();
        setInternships(data);
      } catch {
        console.error('Failed to load internships');
      }
    };
    fetchInternships();
  }, []);

  // Update selected internship if navigated via /apply/:id
  useEffect(() => {
    if (id) setForm((prev) => ({ ...prev, internshipId: id }));
  }, [id]);

  // ── Client-side validation ──
  const validate = () => {
    const newErrors = {};

    if (!form.studentName.trim()) {
      newErrors.studentName = 'Name is required';
    } else if (form.studentName.trim().length < 2) {
      newErrors.studentName = 'Name must be at least 2 characters';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!form.rollNumber.trim()) {
      newErrors.rollNumber = 'Roll number is required';
    } else if (form.rollNumber.trim().length < 3) {
      newErrors.rollNumber = 'Roll number must be at least 3 characters';
    }

    if (!form.internshipId) {
      newErrors.internshipId = 'Please select an internship';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear field-level error on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  // ── Submit using fetch() ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMsg('');
    setSubmitError('');

    if (!validate()) return;

    const selectedInternship = internships.find(
      (i) => i.id === form.internshipId
    );

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: form.studentName.trim(),
          email: form.email.trim(),
          rollNumber: form.rollNumber.trim(),
          internshipId: form.internshipId,
          internshipTitle: selectedInternship?.title || 'Unknown',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setSubmitMsg(data.message);
      // Reset form
      setForm({ studentName: '', email: '', rollNumber: '', internshipId: '' });
      setErrors({});
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>📝 Internship Application</h2>

      {submitMsg && <div className="message message-success">{submitMsg}</div>}
      {submitError && (
        <div className="message message-error">{submitError}</div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Student Name */}
        <div className="form-group">
          <label htmlFor="studentName">Full Name</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            placeholder="Enter your full name"
            value={form.studentName}
            onChange={handleChange}
            className={errors.studentName ? 'input-error' : ''}
          />
          {errors.studentName && (
            <div className="field-error">{errors.studentName}</div>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </div>

        {/* Roll Number */}
        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number</label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            placeholder="e.g. 21CS101"
            value={form.rollNumber}
            onChange={handleChange}
            className={errors.rollNumber ? 'input-error' : ''}
          />
          {errors.rollNumber && (
            <div className="field-error">{errors.rollNumber}</div>
          )}
        </div>

        {/* Internship Selection */}
        <div className="form-group">
          <label htmlFor="internshipId">Select Internship</label>
          <select
            id="internshipId"
            name="internshipId"
            value={form.internshipId}
            onChange={handleChange}
            className={errors.internshipId ? 'input-error' : ''}
          >
            <option value="">-- Choose an internship --</option>
            {internships.map((i) => (
              <option key={i.id} value={i.id}>
                {i.title} — {i.company}
              </option>
            ))}
          </select>
          {errors.internshipId && (
            <div className="field-error">{errors.internshipId}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
          style={{ width: '100%', marginTop: '0.5rem' }}
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <Link to="/" className="back-link">
          ← Browse Internships
        </Link>
      </div>
    </div>
  );
}

export default ApplicationForm;
