/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const StartServer = async () => {
  try {
    await mongoose.connect(envVars.PORT);

    console.log("connected to DB");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

StartServer();

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected... server shutting down", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("uncaught Exception detected... server shutting down", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received... server shutting down");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received... server shutting down");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

/**
 * unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm
 */
