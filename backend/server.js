const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Replace with your Google Client ID
const CLIENT_ID = '805206297313-pk485lau3ldgemv2tspqtpful0u272al.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

// Replace with your MySQL credentials
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'user_database'
};

// Connect to the database
async function createDBConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Successfully connected to MySQL database.');
        return connection;
    } catch (error) {
        console.error('Failed to connect to MySQL:', error);
        throw error;
    }
}

app.post('/api/google-signin', async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ message: 'ID token is missing.' });
    }

    try {
        // 1. Verify the Google ID Token
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub, email, name } = payload;
       
        // 2. Connect to the database
        const connection = await createDBConnection();

        // 3. Check if the user already exists
        const [rows] = await connection.execute(
            'SELECT * FROM userstasks WHERE google_id = ?',
            [sub]
        );

        if (rows.length > 0) {
            // User exists: Update their last_login timestamp
            await connection.execute(
                'UPDATE userstasks SET last_login = NOW() WHERE google_id = ?',
                [sub]
            );
            console.log(`User ${name} updated successfully.`);
        } else {
            // New user: Insert into the database
            await connection.execute(
                'INSERT INTO userstasks (google_id, name, email) VALUES (?, ?, ?)',
                [sub, name, email]
            );
            console.log(`New user ${name} created successfully.`);
        }
       
        await connection.end();

        // Send a success response back to the client
        res.status(200).json({ name: name, email: email, message: 'Authentication successful' });

    } catch (error) {
        console.error('Authentication Error:', error);
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});