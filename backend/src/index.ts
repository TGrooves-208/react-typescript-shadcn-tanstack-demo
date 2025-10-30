import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersV1Routes from './routes/v1/users.js';
import { graphqlServer } from './graphql/server.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend server is running',
    timestamp: new Date().toISOString()
  });
});

// API versioning info endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Full-Stack TypeScript API',
    version: '1.0.0',
    description: 'Express.js + TypeScript + Supabase with REST v1 and GraphQL v2',
    apis: {
      'REST v1': {
        base: '/api/v1',
        endpoints: {
          users: '/api/v1/users',
          health: '/health'
        }
      },
      'GraphQL v2': {
        base: '/api/v2/graphql',
        playground: '/api/v2/graphql',
        description: 'Modern GraphQL API with advanced querying'
      }
    }
  });
});

// REST v1 routes
app.use('/api/v1', usersV1Routes);

// GraphQL v2 route
app.use('/api/v2/graphql', graphqlServer);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API info: http://localhost:${PORT}/api`);
  console.log(`REST v1: http://localhost:${PORT}/api/v1/users`);
  console.log(`GraphQL v2: http://localhost:${PORT}/api/v2/graphql`);
  console.log('🚀 Both REST and GraphQL APIs are live!');
});