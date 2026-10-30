const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// ── Internship data (could be in DB, kept static for simplicity) ──
const internships = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'TechCorp Solutions',
    location: 'Bangalore, India',
    duration: '3 months',
    stipend: '₹15,000/month',
    description:
      'Work on building modern web interfaces using React.js and Tailwind CSS. Collaborate with the design team to implement pixel-perfect UI components.',
    requirements: [
      'HTML, CSS, JavaScript fundamentals',
      'Familiarity with React.js',
      'Basic understanding of Git',
    ],
  },
  {
    id: '2',
    title: 'Backend Developer Intern',
    company: 'DataWave Inc.',
    location: 'Chennai, India',
    duration: '6 months',
    stipend: '₹20,000/month',
    description:
      'Develop and maintain REST APIs using Node.js and Express. Work with MongoDB for data storage and implement authentication flows.',
    requirements: [
      'Node.js and Express basics',
      'Database concepts (SQL or NoSQL)',
      'Understanding of REST APIs',
    ],
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'AnalytiQ Labs',
    location: 'Hyderabad, India',
    duration: '4 months',
    stipend: '₹18,000/month',
    description:
      'Analyze large datasets, build predictive models, and create data visualizations. Work closely with the data engineering team.',
    requirements: [
      'Python and Pandas',
      'Statistics and probability',
      'Machine Learning fundamentals',
    ],
  },
  {
    id: '4',
    title: 'Mobile App Developer Intern',
    company: 'AppNest Technologies',
    location: 'Pune, India',
    duration: '3 months',
    stipend: '₹12,000/month',
    description:
      'Build cross-platform mobile applications using React Native. Integrate APIs and implement push notifications.',
    requirements: [
      'JavaScript / React fundamentals',
      'Mobile UI/UX awareness',
      'REST API integration',
    ],
  },
  {
    id: '5',
    title: 'DevOps Intern',
    company: 'CloudSync Systems',
    location: 'Remote',
    duration: '6 months',
    stipend: '₹22,000/month',
    description:
      'Assist in setting up CI/CD pipelines, containerisation with Docker, and cloud deployment on AWS. Monitor system health and automate routine tasks.',
    requirements: [
      'Linux command line',
      'Basic Docker and container concepts',
      'Familiarity with AWS or any cloud provider',
    ],
  },
];

// ── GET all internships ──
router.get('/internships', async (req, res) => {
  try {
    res.json(internships);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch internships' });
  }
});

// ── GET single internship by ID ──
router.get('/internships/:id', async (req, res) => {
  try {
    const internship = internships.find((i) => i.id === req.params.id);
    if (!internship) {
      return res.status(404).json({ error: 'Internship not found' });
    }
    res.json(internship);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch internship details' });
  }
});

// ── POST – submit an application ──
router.post('/applications', async (req, res) => {
  try {
    const { studentName, email, rollNumber, internshipId, internshipTitle } =
      req.body;

    // Server-side validation
    if (!studentName || !email || !rollNumber || !internshipId || !internshipTitle) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check for duplicate application (same email + same internship)
    const existing = await Application.findOne({ email, internshipId });
    if (existing) {
      return res
        .status(409)
        .json({ error: 'You have already applied for this internship' });
    }

    const application = await Application.create({
      studentName,
      email,
      rollNumber,
      internshipId,
      internshipTitle,
    });

    res.status(201).json({
      message: 'Application submitted successfully!',
      application,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    console.error('Application submission error:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// ── GET all applications ──
router.get('/applications', async (req, res) => {
  try {
    const applications = await Application.find().sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Fetch applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

module.exports = router;
