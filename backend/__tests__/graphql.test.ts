import request from 'supertest';
import express from 'express';
import { graphqlServer } from '../src/graphql/server';

// Create test app with just GraphQL
const app = express();
app.use(express.json());
app.use('/api/v2/graphql', graphqlServer);

describe('GraphQL API v2', () => {
  // Test data for creating users
  const testUser = {
    name: 'Test GraphQL User',
    email: 'test.graphql@example.com',
    profession: 'Test Engineer',
    company: 'Test Corp'
  };

  let createdUserId: string;

  describe('Queries', () => {
    test('should get all users', async () => {
      const query = `
        query {
          users {
            id
            name
            email
            profession
            company
            created_at
            updated_at
          }
        }
      `;

      const response = await request(app)
        .post('/api/v2/graphql')
        .send({ query })
        .expect(200);

      expect(response.body.data).toBeDefined();
      expect(response.body.data.users).toBeInstanceOf(Array);
      expect(response.body.errors).toBeUndefined();
    });

    test('should get user by id', async () => {
      // First get all users to get a valid ID
      const allUsersQuery = `
        query {
          users {
            id
          }
        }
      `;

      const allUsersResponse = await request(app)
        .post('/api/v2/graphql')
        .send({ query: allUsersQuery });

      const userId = allUsersResponse.body.data.users[0]?.id;
      
      if (userId) {
        const query = `
          query {
            user(id: "${userId}") {
              id
              name
              email
              profession
              company
            }
          }
        `;

        const response = await request(app)
          .post('/api/v2/graphql')
          .send({ query })
          .expect(200);

        expect(response.body.data.user).toBeDefined();
        expect(response.body.data.user.id).toBe(userId);
        expect(response.body.errors).toBeUndefined();
      }
    });

    test('should return null for non-existent user', async () => {
      const query = `
        query {
          user(id: "999999") {
            id
            name
          }
        }
      `;

      const response = await request(app)
        .post('/api/v2/graphql')
        .send({ query })
        .expect(200);

      expect(response.body.data.user).toBeNull();
      expect(response.body.errors).toBeUndefined();
    });

    test('should get users by company', async () => {
      const query = `
        query {
          usersByCompany(company: "Pied Piper") {
            id
            name
            company
          }
        }
      `;

      const response = await request(app)
        .post('/api/v2/graphql')
        .send({ query })
        .expect(200);

      expect(response.body.data.usersByCompany).toBeInstanceOf(Array);
      expect(response.body.errors).toBeUndefined();
      
      // If there are results, they should all contain "Pied Piper"
      if (response.body.data.usersByCompany.length > 0) {
        response.body.data.usersByCompany.forEach((user: any) => {
          expect(user.company).toContain('Pied Piper');
        });
      }
    });

    test('should get users by profession', async () => {
      const query = `
        query {
          usersByProfession(profession: "CEO") {
            id
            name
            profession
          }
        }
      `;

      const response = await request(app)
        .post('/api/v2/graphql')
        .send({ query })
        .expect(200);

      expect(response.body.data.usersByProfession).toBeInstanceOf(Array);
      expect(response.body.errors).toBeUndefined();
      
      // If there are results, they should all contain "CEO"
      if (response.body.data.usersByProfession.length > 0) {
        response.body.data.usersByProfession.forEach((user: any) => {
          expect(user.profession).toContain('CEO');
        });
      }
    });
  });

  describe('Mutations', () => {
    test('should create a new user', async () => {
      const mutation = `
        mutation {
          createUser(input: {
            name: "${testUser.name}"
            email: "${testUser.email}"
            profession: "${testUser.profession}"
            company: "${testUser.company}"
          }) {
            id
            name
            email
            profession
            company
            created_at
            updated_at
          }
        }
      `;

      const response = await request(app)
        .post('/api/v2/graphql')
        .send({ query: mutation })
        .expect(200);

      expect(response.body.data.createUser).toBeDefined();
      expect(response.body.data.createUser.name).toBe(testUser.name);
      expect(response.body.data.createUser.email).toBe(testUser.email);
      expect(response.body.data.createUser.profession).toBe(testUser.profession);
      expect(response.body.data.createUser.company).toBe(testUser.company);
      expect(response.body.data.createUser.id).toBeDefined();
      expect(response.body.errors).toBeUndefined();

      // Store the ID for later tests
      createdUserId = response.body.data.createUser.id;
    });

    test('should fail to create user with duplicate email', async () => {
      const mutation = `
        mutation {
          createUser(input: {
            name: "Another User"
            email: "${testUser.email}"
            profession: "Another Profession"
            company: "Another Company"
          }) {
            id
            name
            email
          }
        }
      `;

      const response = await request(app)
        .post('/api/v2/graphql')
        .send({ query: mutation })
        .expect(200);

      expect(response.body.errors).toBeDefined();
      // GraphQL Yoga masks error messages, so just check that there's an error
      expect(response.body.errors[0].message).toBeDefined();
    });

    test('should update an existing user', async () => {
      const updatedData = {
        name: 'Updated GraphQL User',
        profession: 'Senior Test Engineer',
        company: 'Updated Corp'
      };

      const mutation = `
        mutation {
          updateUser(id: "${createdUserId}", input: {
            name: "${updatedData.name}"
            profession: "${updatedData.profession}"
            company: "${updatedData.company}"
          }) {
            id
            name
            email
            profession
            company
          }
        }
      `;

      const response = await request(app)
        .post('/api/v2/graphql')
        .send({ query: mutation })
        .expect(200);

      expect(response.body.data.updateUser).toBeDefined();
      expect(response.body.data.updateUser.id).toBe(createdUserId);
      expect(response.body.data.updateUser.name).toBe(updatedData.name);
      expect(response.body.data.updateUser.profession).toBe(updatedData.profession);
      expect(response.body.data.updateUser.company).toBe(updatedData.company);
      expect(response.body.data.updateUser.email).toBe(testUser.email); // Should remain unchanged
      expect(response.body.errors).toBeUndefined();
    });

    test('should fail to update non-existent user', async () => {
      const mutation = `
        mutation {
          updateUser(id: "999999", input: {
            name: "Non-existent User"
          }) {
            id
            name
          }
        }
      `;

      const response = await request(app)
        .post('/api/v2/graphql')
        .send({ query: mutation })
        .expect(200);

      expect(response.body.errors).toBeDefined();
      // GraphQL Yoga masks error messages, so just check that there's an error
      expect(response.body.errors[0].message).toBeDefined();
    });

    test('should delete an existing user', async () => {
      const mutation = `
        mutation {
          deleteUser(id: "${createdUserId}") {
            id
            name
            email
          }
        }
      `;

      const response = await request(app)
        .post('/api/v2/graphql')
        .send({ query: mutation })
        .expect(200);

      expect(response.body.data.deleteUser).toBeDefined();
      expect(response.body.data.deleteUser.id).toBe(createdUserId);
      expect(response.body.data.deleteUser.name).toBeDefined(); // Name should exist
      expect(response.body.errors).toBeUndefined();

      // Verify user is deleted by trying to fetch it
      const verifyQuery = `
        query {
          user(id: "${createdUserId}") {
            id
          }
        }
      `;

      const verifyResponse = await request(app)
        .post('/api/v2/graphql')
        .send({ query: verifyQuery });

      expect(verifyResponse.body.data.user).toBeNull();
    });

    test('should fail to delete non-existent user', async () => {
      const mutation = `
        mutation {
          deleteUser(id: "999999") {
            id
            name
          }
        }
      `;

      const response = await request(app)
        .post('/api/v2/graphql')
        .send({ query: mutation })
        .expect(200);

      expect(response.body.errors).toBeDefined();
      // GraphQL Yoga masks error messages, so just check that there's an error
      expect(response.body.errors[0].message).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    test('should handle malformed queries', async () => {
      const malformedQuery = `
        query {
          users {
            id
            invalidField
          }
        }
      `;

      const response = await request(app)
        .post('/api/v2/graphql')
        .send({ query: malformedQuery })
        .expect(200);

      expect(response.body.errors).toBeDefined();
    });

    test('should handle missing required fields in mutations', async () => {
      const incompleteQuery = `
        mutation {
          createUser(input: {
            name: "Incomplete User"
          }) {
            id
            name
          }
        }
      `;

      const response = await request(app)
        .post('/api/v2/graphql')
        .send({ query: incompleteQuery })
        .expect(200);

      expect(response.body.errors).toBeDefined();
    });
  });
});