import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/app.js';
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

test('rejects invalid payload (missing title, bad isbn)', async () => {
  const res = await request(app).post('/api/books').send({ author: 'Someone', isbn: '123' });
  // FIXED: Correctly expecting 400 Bad Request
  expect(res.status).toBe(400);
  expect(res.body.error).toBeTruthy();
});

test('404 on get non-existent book', async () => {
  const id = new mongoose.Types.ObjectId().toString();
  const res = await request(app).get(`/api/books/${id}`);
  expect(res.status).toBe(404);
});

test('409 on updating to an existing ISBN', async () => {
  const a = await request(app).post('/api/books').send({ title: 'A', author:'X', isbn:'9780132350884' });
  const b = await request(app).post('/api/books').send({ title: 'B', author:'Y', isbn:'9780131101630' });
  const res = await request(app).put(`/api/books/${b.body._id}`).send({ isbn: '9780132350884' });
  expect(res.status).toBe(409);
});