import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global as typeof global & {
  mongooseConnection?: mongoose.Connection | null;
  mongoosePromise?: Promise<mongoose.Connection>;
};

if (!cached.mongooseConnection) {
  cached.mongooseConnection = null;
}

async function connectDB() {
  if (cached.mongooseConnection) {
    return cached.mongooseConnection;
  }

  if (!cached.mongoosePromise) {
    const opts = {
      bufferCommands: false,
    };

    cached.mongoosePromise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }
  cached.mongooseConnection = await cached.mongoosePromise;
  return cached.mongooseConnection;
}

export default connectDB;
