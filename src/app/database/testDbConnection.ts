"use server"

import { dbConnect, dbDisconnect, checkConnection } from "../../database"

export async function connectToDatabase() {
  try {
    const isConnected = checkConnection();

    if(isConnected){
        return {success: true, message: "Database is already disconnected. Please try disconnecting first :)"}
    } else {
        await dbConnect()
        return { success: true, message: "Database connected successfully." }
    }
    
  } catch (error) {
    console.error("Database connection failed:", error)
    return { success: false, message: "Database connection failed." }
  }
}

export async function disconnectFromDatabase() {
  try {
    const isConnected = checkConnection();

    if(!isConnected){
        return {success: true, message: "Database is already disconnected. Please try making the connection first :)"}
    } else {
        await dbDisconnect()
        return { success: true, message: "Database disconnected successfully." }
    }
  } catch (error) {
    console.error("Database disconnection failed:", error)
    return { success: false, message: "Database disconnection failed." }
  }
}



