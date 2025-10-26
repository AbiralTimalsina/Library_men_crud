import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app.js';
import { connect, disconnect } from '../src/db/mongoose.js';

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

test('Create and list books', async () => {
  const payload = { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', copies: 3 };
  const createRes = await request(app).post('/api/books').send(payload);
  expect(createRes.status).toBe(201);
  
  const listRes = await request(app).get('/api/books');
  expect(listRes.status).toBe(200);
  expect(Array.isArray(listRes.body)).toBe(true);
  expect(listRes.body.length).toBeGreaterThanOrEqual(1);
});

test('Reject duplicate ISBN - FIXED', async () => {
  const payload = { title: 'Book A', author: 'X', isbn: '9780131101630' };
  await request(app).post('/api/books').send(payload).expect(201);
  const dup = await request(app).post('/api/books').send({ ...payload, title: 'Book B' });
  // FIXED: Now correctly expecting 409 Conflict
  expect(dup.status).toBe(409);
});
