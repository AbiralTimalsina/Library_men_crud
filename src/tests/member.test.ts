import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app.js';
import { connect, disconnect } from '../db/mongoose.js';

let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await connect(mongod.getUri());
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
  await disconnect();
});

test('Create and update member - FIXED', async () => {
  const createRes = await request(app).post('/api/members').send({ fullName: 'Alice Doe', email: 'alice@example.com' });
  // FIXED: Correctly expecting 201 Created
  expect(createRes.status).toBe(201);
  const id = createRes.body._id;
  const updateRes = await request(app).put(`/api/members/${id}`).send({ phone: '+977-9800000000' });
  expect(updateRes.status).toBe(200);
  // FIXED: Correct phone number expectation
  expect(updateRes.body.phone).toMatch('9800');
});
