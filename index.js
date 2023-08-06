const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = process.env.PORT || 3000;

// Create a PostgreSQL pool
const pool = new Pool({
  user: 'wfahmwhm',
  host: 'bubble.db.elephantsql.com',
  database: 'wfahmwhm',
  password: 'Mr73vlDpngbtfF9FJwdyPQvGPdzHhv8k',
  port: 5432,
});

// Middleware
app.use(cors()); // Use CORS middleware
app.use(bodyParser.json());

// Route to handle POST requests to /submit     
app.post('/submit', async (req, res) => {
  try {
    const { userID, email } = req.body;

    // Validate the user email and ID
    let re = /\S+@\S+\.\S+/;
    if (!userID || !email || !re.test(email) || userID.length < 32) {
      return res.status(403).json({ error: 'Invalid userID or email' });
    }

    // Insert the email to the database
    const query = 'INSERT INTO email_list (userID, email) VALUES ($1, $2)';
    const values = [userID, email];

    await pool.query(query, values);

    return res.status(200).json({ status: 200, message: 'Data submitted successfully'});
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({"status": 500, error: 'Internal Server Error with error message: \n ' + error });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
