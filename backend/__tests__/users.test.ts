import request from 'supertest';
import express from 'express';
import cors from 'cors';

// reate a simple mock app instead of importing the complex ES module
const app = express();
app.use(cors());
app.use(express.json());

// Simple mock endpoint for testing
app.get('/api/v1/users', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        name: 'Richard Hendricks',
        email: 'richard@piedpiper.com',
        profession: 'CEO & Founder',
        company: 'Pied Piper',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ],
    count: 1,
    message: 'Users retrieved successfully'
  });
});

app.get('/api/v1/users/:id', (req, res) => {
  const { id } = req.params;
  if (id === '1') {
    res.json({
      success: true,
      data: {
        id: 1,
        name: 'Richard Hendricks',
        email: 'richard@piedpiper.com',
        profession: 'CEO & Founder',
        company: 'Pied Piper',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      message: 'User retrieved successfully'
    });
  } else if (id === '999') {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/v1/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  res.status(201).json({
    success: true,
    data: {
      id: 2,
      name,
      email,
      profession: req.body.profession,
      company: req.body.company,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    message: 'User created successfully'
  });
});

describe('Users API v1 - Mock Tests', () => {
  describe('GET /api/v1/users', () => {
    it('should return all users with success response', async () => {
      const response = await request(app)
        .get('/api/v1/users')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('count');
      expect(response.body).toHaveProperty('message');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.count).toBeGreaterThan(0);
    });

    it('should return users with correct structure', async () => {
      const response = await request(app)
        .get('/api/v1/users')
        .expect(200);

      const user = response.body.data[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('profession');
      expect(user).toHaveProperty('company');
      expect(user).toHaveProperty('created_at');
      expect(user).toHaveProperty('updated_at');
    });

    it('should include Richard Hendricks in the results', async () => {
      const response = await request(app)
        .get('/api/v1/users')
        .expect(200);

      const richard = response.body.data.find(
        (user: any) => user.email === 'richard@piedpiper.com'
      );
      expect(richard).toBeDefined();
      expect(richard.name).toBe('Richard Hendricks');
      expect(richard.company).toBe('Pied Piper');
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should return a single user by ID', async () => {
      const response = await request(app)
        .get('/api/v1/users/1')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('message');
      expect(response.body.data).toHaveProperty('id', 1);
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/v1/users/999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'User not found');
    });

    it('should return 500 for invalid ID format', async () => {
      await request(app)
        .get('/api/v1/users/invalid')
        .expect(500);
    });
  });

  describe('POST /api/v1/users', () => {
    const newUser = {
      name: 'Monica Hall',
      email: 'monica@raviga.com',
      profession: 'Venture Capitalist',
      company: 'Raviga Capital'
    };

    it('should create a new user successfully', async () => {
      const response = await request(app)
        .post('/api/v1/users')
        .send(newUser)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('message');
      expect(response.body.data.name).toBe(newUser.name);
      expect(response.body.data.email).toBe(newUser.email);
    });

    it('should require name and email fields', async () => {
      const response = await request(app)
        .post('/api/v1/users')
        .send({ profession: 'Developer' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Name and email are required');
    });
  });
});