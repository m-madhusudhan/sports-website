# Sports Booking Website

This is a sports booking website where users can register, log in, and book time slots for various sports. Users will receive an SMS confirmation for their bookings.

## Features

- User registration
- User login
- Booking time slots for different sports
- SMS confirmation for bookings

## Technologies Used

- HTML, CSS, JavaScript (Frontend)
- Node.js, Express (Backend)
- SQLite (Database)
- Twilio (SMS Service)

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/sports-booking.git
    cd sports-booking
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your Twilio credentials:
    ```
    TWILIO_ACCOUNT_SID=your_twilio_account_sid
    TWILIO_AUTH_TOKEN=your_twilio_auth_token
    TWILIO_PHONE_NUMBER=your_twilio_phone_number
    ```

4. Start the server:
    ```bash
    node server.js
    ```

5. Open `http://localhost:3000` in your browser.
