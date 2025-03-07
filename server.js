const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Load Routes Dynamically
const routes = readdirSync('./routes');
routes.forEach((route) => {
    const routePath = `./routes/${route}`;
    try {
        app.use('/api/v1', require(routePath));
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
