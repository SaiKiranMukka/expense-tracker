import mongoose from "mongoose";
import { config } from "./config";

let database: mongoose.Connection;

export const connectDatabase = () => {

  if (database) return;

  const dbConfig = config.DATABASE;

  mongoose.connect(dbConfig.mongoUrl);

  database = mongoose.connection;

  database.once("open", async () => {
    console.log("Connected to database");
  });

  database.on("error", () => {
    console.log("Error connecting to database");
  });
}

export const disconnectDatabase = () => {
  if (!database) return;

  mongoose.disconnect();
}
