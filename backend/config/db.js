// backend/config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/healthlink';

// Mock database for development without MongoDB
class MockDatabase {
  constructor() {
    this.data = new Map();
    this.counter = 1;
  }

  async connect() {
    console.log('✅ Using in-memory database (development mode)');
    return true;
  }

  async create(modelName, data) {
    const id = this.counter++;
    const record = { _id: id, ...data, createdAt: new Date(), updatedAt: new Date() };
    this.data.set(`${modelName}_${id}`, record);
    return record;
  }

  async find(modelName, query = {}) {
    const records = [];
    for (const [key, value] of this.data.entries()) {
      if (key.startsWith(`${modelName}_`)) {
        if (Object.keys(query).length === 0 || this.matchesQuery(value, query)) {
          records.push(value);
        }
      }
    }
    return records;
  }

  async findOne(modelName, query = {}) {
    for (const [key, value] of this.data.entries()) {
      if (key.startsWith(`${modelName}_`) && this.matchesQuery(value, query)) {
        return value;
      }
    }
    return null;
  }

  async findById(modelName, id) {
    return this.data.get(`${modelName}_${id}`) || null;
  }

  async updateOne(modelName, query, update) {
    let updated = 0;
    for (const [key, value] of this.data.entries()) {
      if (key.startsWith(`${modelName}_`) && this.matchesQuery(value, query)) {
        Object.assign(value, update, { updatedAt: new Date() });
        this.data.set(key, value);
        updated++;
      }
    }
    return { modifiedCount: updated };
  }

  async deleteOne(modelName, query) {
    let deleted = 0;
    for (const key of this.data.keys()) {
      if (key.startsWith(`${modelName}_`)) {
        const value = this.data.get(key);
        if (this.matchesQuery(value, query)) {
          this.data.delete(key);
          deleted++;
        }
      }
    }
    return { deletedCount: deleted };
  }

  matchesQuery(record, query) {
    return Object.keys(query).every(key => record[key] === query[key]);
  }
}

export async function connectDB() {
  try {
    // Check if we're using local MongoDB
    if (MONGO_URI.includes('127.0.0.1') || MONGO_URI.includes('localhost')) {
      try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB connected');
        return;
      } catch (localErr) {
        console.log('⚠️ Local MongoDB not available, using in-memory database');
        // Fall back to mock database
        global.mockDb = global.mockDb || new MockDatabase();
        await global.mockDb.connect();
        return;
      }
    }
    
    // Try to connect to cloud MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.log('⚠️ MongoDB connection failed, using in-memory database');
    global.mockDb = global.mockDb || new MockDatabase();
    await global.mockDb.connect();
  }
}
