import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app.js'; // ← FIXED: Correct import path
import { connect, disconnect } from '../db/mongoose.js'; // ← FIXED: Correct import path

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

test('rejects bad email format - FIXED', async () => {
  const res = await request(app).post('/api/members').send({ fullName: 'Bob', email: 'not-an-email' });
  // FIXED: Correctly expecting 400 Bad Request
  expect(res.status).toBe(400);
});

test('409 on duplicate email', async () => {
  const good = { fullName: 'Alice', email: 'alice@example.com' };
  await request(app).post('/api/members').send(good).expect(201);
  const dup = await request(app).post('/api/members').send({ ...good, fullName: 'Alice Two' });
  expect(dup.status).toBe(409);
});

test('404 on update non-existent member - FIXED', async () => {
  const id = new mongoose.Types.ObjectId().toString();
  const res = await request(app).put(`/api/members/${id}`).send({ fullName: 'Nobody' });
  // FIXED: Correctly expecting 404 Not Found
  expect(res.status).toBe(404);
});