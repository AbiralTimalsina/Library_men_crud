import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/app.js'; // ← INTENTIONAL: Wrong import path
import { connect, disconnect } from '../src/db/mongoose.js'; // ← INTENTIONAL: Wrong import path

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

test('rejects bad email format - INTENTIONAL ERROR', async () => {
  const res = await request(app).post('/api/members').send({ fullName: 'Bob', email: 'not-an-email' });
  // INTENTIONAL ERROR: Expecting 200 instead of 400
  expect(res.status).toBe(200); // This should fail!
});

test('409 on duplicate email', async () => {
  const good = { fullName: 'Alice', email: 'alice@example.com' };
  await request(app).post('/api/members').send(good).expect(201);
  const dup = await request(app).post('/api/members').send({ ...good, fullName: 'Alice Two' });
  expect(dup.status).toBe(409);
});

test('404 on update non-existent member - INTENTIONAL ERROR', async () => {
  const id = new mongoose.Types.ObjectId().toString();
  const res = await request(app).put(`/api/members/${id}`).send({ fullName: 'Nobody' });
  // INTENTIONAL ERROR: Expecting 200 instead of 404
  expect(res.status).toBe(200); // This should fail!
});