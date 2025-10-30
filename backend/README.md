# Backend API Documentation

A TypeScript Express.js server with dual API architecture: REST v1 and GraphQL v2.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start

# Run tests
npm test
```

## Architecture

### Dual API Approach
- **REST v1**: Traditional RESTful endpoints at `/api/v1`
- **GraphQL v2**: Modern GraphQL endpoint at `/api/v2/graphql`
- **Shared Database**: Both APIs use the same Supabase PostgreSQL database

### Technology Stack
- **Runtime**: Node.js v22+
- **Language**: TypeScript
- **Framework**: Express.js v5
- **Database**: Supabase (PostgreSQL)
- **Testing**: Jest + Supertest
- **GraphQL**: GraphQL Yoga

## Environment Variables

Create a `.env` file in the backend directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3001
NODE_ENV=development
```

## API Documentation

### REST API v1

Base URL: `http://localhost:3001/api/v1`

#### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create new user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

#### Example Requests

**Get All Users:**
```bash
GET http://localhost:3001/api/v1/users
```

**Create User:**
```bash
POST http://localhost:3001/api/v1/users
Content-Type: application/json

{
  "name": "Monica Hall",
  "email": "monica@raviga.com",
  "profession": "Venture Capitalist",
  "company": "Raviga Capital"
}
```

### GraphQL API v2

Endpoint: `http://localhost:3001/api/v2/graphql`

#### Schema

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  profession: String
  company: String
  created_at: String!
  updated_at: String!
}

type Query {
  users: [User!]!
  user(id: ID!): User
  usersByCompany(company: String!): [User!]!
  usersByProfession(profession: String!): [User!]!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): User!
}
```

#### Example Queries

**Get All Users:**
```graphql
query {
  users {
    id
    name
    email
    profession
    company
  }
}
```

**Get Users by Company:**
```graphql
query {
  usersByCompany(company: "Pied Piper") {
    id
    name
    profession
  }
}
```

**Search by Profession:**
```graphql
query {
  usersByProfession(profession: "CEO") {
    id
    name
    company
  }
}
```

**Create User:**
```graphql
mutation {
  createUser(input: {
    name: "Monica Hall"
    email: "monica@raviga.com"
    profession: "Venture Capitalist"
    company: "Raviga Capital"
  }) {
    id
    name
    email
  }
}
```

**Update User:**
```graphql
mutation {
  updateUser(id: "1", input: {
    name: "Richard Hendricks"
    email: "richard@piedpiper.com"
    profession: "CEO & Founder (Updated)"
    company: "Pied Piper"
  }) {
    id
    name
    profession
  }
}
```

## Testing GraphQL with curl

**Query Example:**
```bash
curl -X POST http://localhost:3001/api/v2/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { users { id name email company } }"
  }'
```

**Mutation Example:**
```bash
curl -X POST http://localhost:3001/api/v2/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { createUser(input: { name: \"Test User\", email: \"test@example.com\" }) { id name email } }"
  }'
```

## Testing GraphQL with PowerShell

**The Slick Way (Formatted Table Output):**
```powershell
$body = '{"query": "query { users { id name email profession company } }"}'
$result = Invoke-RestMethod -Uri "http://localhost:3001/api/v2/graphql" -Method POST -Body $body -ContentType "application/json"
$result.data.users | Format-Table
```

**JSON Output:**
```powershell
$body = '{"query": "query { users { id name email profession company } }"}'
$result = Invoke-RestMethod -Uri "http://localhost:3001/api/v2/graphql" -Method POST -Body $body -ContentType "application/json"
$result | ConvertTo-Json -Depth 5
```

## Database Schema

```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  profession TEXT,
  company TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Testing

Run the test suite:
```bash
npm test
```

Current test coverage:
- REST API endpoints (8 tests)
- Error handling and validation
- Response structure validation

## Development

### Project Structure
```
backend/
├── src/
│   ├── config/
│   │   └── supabase.ts
│   ├── graphql/
│   │   ├── typeDefs.ts
│   │   ├── resolvers.ts
│   │   └── server.ts
│   ├── routes/
│   │   └── v1/
│   │       └── users.ts
│   └── index.ts
├── __tests__/
│   └── users.test.ts
├── dist/
├── package.json
├── tsconfig.json
└── jest.config.json
```

### Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## API Comparison

### REST vs GraphQL

**REST v1 - Multiple Requests:**
```bash
# Get all users
GET /api/v1/users

# Get user details
GET /api/v1/users/1

# Multiple requests for related data
```

**GraphQL v2 - Single Request:**
```graphql
query {
  users {
    id
    name
    company
  }
  user(id: "1") {
    email
    profession
  }
}
```

### Advantages by Approach

**REST v1:**
- Simple and familiar
- HTTP caching
- Easy debugging
- Standardized status codes

**GraphQL v2:**
- Single endpoint
- Flexible queries
- No over-fetching
- Strong type system
- Built-in documentation