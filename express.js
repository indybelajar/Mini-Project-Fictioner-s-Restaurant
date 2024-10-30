import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());

async function initializeDatabaseConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'backend'
    });

    try {
        await connection.connect();
        console.log("Connected to MySQL!!!");
        return connection; // This return is valid because it's inside a function
    } catch (err) {
        console.error("Error connecting to MySQL:", err);
        process.exit(1);
    }
}

const connection = await initializeDatabaseConnection(); // This should be awaited properly

// Route for testing
app.get('/', (req, res) => {
    res.send("again!");
});

// Route to fetch users
app.get('/users', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM UPNVJ');
        res.json(results);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
    await connection.end();
    console.log('MySQL connection closed.');
    process.exit(0);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});