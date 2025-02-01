import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {}; // Singleton connection object

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  const dbUri = process.env.MONGOD_URI;
  if (!dbUri) {
    throw new Error("MONGOD_URI environment variable is not defined.");
  }

  try {
    // Check if there is an existing connection in the Mongoose connection pool
    if (mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState;

      if (connection.isConnected === 1) {
        console.log("Reusing existing database connection");
        return;
      }

      // If connection is not ready, disconnect to prevent multiple instances
      await mongoose.disconnect();
    }

    // Establish new connection
    const db = await mongoose.connect(dbUri);
    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    throw new Error("Failed to connect to MongoDB. Please check your connection string.");
  }
}

async function dbDisconnect(): Promise<void> {
  if (connection.isConnected) {
    await mongoose.disconnect();
    connection.isConnected = 0; // Reset connection status
    console.log("Database disconnected successfully");
  } else {
    console.log("No active database connection to disconnect");
  }
}

// Check if the connection is still active
function checkConnection(): boolean {
  if (connection.isConnected && connection.isConnected === 1) {
    return true;
  }
  return false;
}

export { dbConnect, dbDisconnect, checkConnection };
