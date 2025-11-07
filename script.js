document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, phone }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful!');
            window.location.href = 'login.html';
        } else {
            alert('Registration failed: ' + data.message);
        }
    });
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login successful!');
            localStorage.setItem('username', username);
            window.location.href = 'dashboard.html';
        } else {
            alert('Login failed: ' + data.message);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('usernameDisplay').textContent = username;
    }

    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const sport = document.getElementById('sport').value;
        const timeSlot = document.getElementById('timeSlot').value;

        fetch('/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, sport, timeSlot }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Booking successful!');
                sendConfirmation(username, data.message);
            } else {
                alert('Booking failed: ' + data.message);
            }
        });
    });
});

function sendConfirmation(username, message) {
    console.log('Sending confirmation to ' + username + ': ' + message);
}
