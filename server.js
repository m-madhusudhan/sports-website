const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const twilio = require('twilio');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Initialize SQLite database
const db = new sqlite3.Database('./database/database.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            phone TEXT
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            sport TEXT,
            timeSlot TEXT
        )`);
    }
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/register', (req, res) => {
    const { username, password, phone } = req.body;
    db.run(`INSERT INTO users (username, password, phone) VALUES (?, ?, ?)`, [username, password, phone], (err) => {
        if (err) {
            return res.json({ success: false, message: 'Username already exists' });
        }
        res.json({ success: true });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, row) => {
        if (err || !row) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }
        res.json({ success: true });
    });
});

app.post('/book', (req, res) => {
    const { username, sport, timeSlot } = req.body;
    db.run(`INSERT INTO bookings (username, sport, timeSlot) VALUES (?, ?, ?)`, [username, sport, timeSlot], (err) => {
        if (err) {
            return res.json({ success: false, message: 'Booking failed' });
        }
        const message = `Booking confirmed for ${sport} at ${timeSlot}`;
        db.get(`SELECT phone FROM users WHERE username = ?`, [username], (err, row) => {
            if (err || !row) {
                return res.json({ success: false, message: 'Failed to send confirmation message' });
            }
            twilioClient.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: row.phone
            })
            .then(() => {
                res.json({ success: true, message });
            })
            .catch(err => {
                console.error(err);
                res.json({ success: false, message: 'Failed to send confirmation message' });
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
