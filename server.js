import express from 'express';
import cors from 'cors';
import db from './db/db.js';
import { readdirSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Load Routes Dynamically (ES Module Fix)
const routes = readdirSync('./routes');
routes.forEach(async (route) => {
    const routePath = `./routes/${route}`;
    try {
        const module = await import(routePath);
        app.use('/api/v1', module.default);
        console.log(`✅ Route Loaded: ${route}`);
    } catch (error) {
        console.error(`❌ Error loading route: ${route}`, error);
    }
});

// Start Server
const server = () => {
    db();  // Connect to Database
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port: ${PORT}`);
    });
};

server();
