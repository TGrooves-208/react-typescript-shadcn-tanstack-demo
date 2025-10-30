import request from 'supertest';
import express from 'express';
import cors from 'cors';
import usersV1Routes from '../src/routes/v1/users.js';
// Create test app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', usersV1Routes);
describe('Users API v1', () => {
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
            const richard = response.body.data.find((user) => user.email === 'richard@piedpiper.com');
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
        it('should handle duplicate email error', async () => {
            // First, create a user
            await request(app)
                .post('/api/v1/users')
                .send({
                name: 'Test User',
                email: 'test@unique.com'
            });
            // Try to create another user with same email
            const response = await request(app)
                .post('/api/v1/users')
                .send({
                name: 'Another Test User',
                email: 'test@unique.com'
            })
                .expect(409);
            expect(response.body).toHaveProperty('error', 'Email already exists');
        });
    });
    describe('PUT /api/v1/users/:id', () => {
        it('should update an existing user', async () => {
            const updateData = {
                name: 'Richard Hendricks',
                email: 'richard@piedpiper.com',
                profession: 'CEO & Founder (Compression King!)',
                company: 'Pied Piper'
            };
            const response = await request(app)
                .put('/api/v1/users/1')
                .send(updateData)
                .expect(200);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('data');
            expect(response.body.data.profession).toBe(updateData.profession);
        });
        it('should return 404 for non-existent user', async () => {
            const response = await request(app)
                .put('/api/v1/users/999')
                .send({
                name: 'Test',
                email: 'test@test.com'
            })
                .expect(404);
            expect(response.body).toHaveProperty('error', 'User not found');
        });
        it('should require name and email for update', async () => {
            const response = await request(app)
                .put('/api/v1/users/1')
                .send({ profession: 'Developer' })
                .expect(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toContain('Name and email are required');
        });
    });
    describe('DELETE /api/v1/users/:id', () => {
        it('should delete an existing user', async () => {
            // First create a user to delete
            const createResponse = await request(app)
                .post('/api/v1/users')
                .send({
                name: 'User To Delete',
                email: 'delete@test.com'
            });
            const userId = createResponse.body.data.id;
            const response = await request(app)
                .delete(`/api/v1/users/${userId}`)
                .expect(200);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('data');
            expect(response.body).toHaveProperty('message');
        });
        it('should return 404 for non-existent user', async () => {
            const response = await request(app)
                .delete('/api/v1/users/999')
                .expect(404);
            expect(response.body).toHaveProperty('error', 'User not found');
        });
    });
});
//# sourceMappingURL=users.test.js.map