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

test('health endpoint returns ok', async () => {
  const res = await request(app).get('/');
  expect(res.status).toBe(200);
  expect(res.body.status).toBe('ok');
});
