
#  2K25 Tour Management – Backend

A **scalable**, **modular**, and **production-ready** backend boilerplate for managing tour operations built with **Express.js**, **TypeScript**, and **Mongoose**.

---

##  Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **Zod** (Schema validation)
- **JWT** (Authentication)
- **ESLint** (Code linting)

---

##  Project Setup

### 1️ Initialize the Project

```bash
# Initialize Node project
npm init -y
````

### 2️ Install Dependencies

```bash
# Production dependencies
npm install express mongoose zod jsonwebtoken cors dotenv

# Development dependencies
npm install -D typescript ts-node-dev @types/express @types/cors @types/jsonwebtoken @types/node @types/dotenv
```

### 3️ Initialize TypeScript

```bash
tsc --init
```

---

##  Folder Structure

```
2k25-tour-management/
├── src/
│   ├── app.ts              # Express app config (middlewares, routes)
│   ├── server.ts           # Entry point of the application
│   └── app/
│       └── config/         # Environment & Database configuration
├── .env                    # Environment variables
├── .env.example            # Sample env file for reference
├── .gitignore              # Git ignored files/folders
├── package.json
├── package-lock.json
├── tsconfig.json           # TypeScript compiler config
├── eslint.config.mjs       # ESLint configuration
└── README.md               # Project documentation
```

---

##  TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

---

##  `.gitignore`

```
node_modules/
dist/
.env
```

---

##  NPM Scripts

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only ./src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "lint": "npx eslint ./src"
}
```

---

##  Example Files

### `src/app.ts`

```ts
import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to tour management system server",
  });
});

export default app;
```

---

### `src/server.ts`

```ts
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

```

---

##  Environment Variables

Create a `.env` file in the root and configure like below:

```
PORT=5000
DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/db_name
NODE_ENV=development
```

Refer to `.env.example` for structure.

---

##  ESLint Setup

### Install ESLint

```bash
npm install --save-dev eslint @eslint/js typescript typescript-eslint
```

### Create ESLint Config

`eslint.config.mjs`

```js
// eslint.config.mjs
// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    rules: {
      "no-console": "warn"
    }
  }
);
```

### Run Linter

```bash
npx eslint ./src
```

---

##  Build and Run

### Start in Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

---

##  Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature/feature-name`
5. Create a Pull Request


---

# 👨‍💻 Author

**Md Monjur Bakth Mazumder**   
**Software Engineer | Lead Frontend Developer | Technical Instructor**

Software Engineer & Lead Frontend Developer at [Qrinux](https://www.qrinux.com/)  
Web Developer at Velocity Digital Inc.  


📧 [Email me](mailto:md.monjurmbm2001@gmail.com)  
🌐 [Portfolio](https://mdmonjurbakthmazumder.netlify.app)

Passionate about building clean, maintainable, and scalable applications.