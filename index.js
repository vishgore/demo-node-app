var express = require('express');
var app = express();

// 1. Insecure use of eval()
app.get('/eval', function(req, res) {
  try {
    // Directly evaluating user input is extremely dangerous
    let userInput = req.query.code; 
    let result = eval(userInput); 
    res.send(`{"response": "${result}"}`); 
  } catch (error) {
    res.status(500).send(`{"error": "${error.message}"}`);
  }
});

// 2. Path Traversal Vulnerability
app.get('/download', function(req, res) {
  let filePath = './' + req.query.file; // Potential for '../' to access files outside intended directory
  res.download(filePath); 
});

// 3. SQL Injection (Hypothetical - no database connection)
// Assuming a database connection and query building
app.get('/search', function(req, res) {
  let searchTerm = req.query.q; 
  // Unsafe: Directly inserting user input into SQL query
  let sql = `SELECT * FROM users WHERE name LIKE '%${searchTerm}%'`; 
  // ... (execute the SQL query) ...
});

// 4. Cross-Site Scripting (XSS)
app.get('/profile', function(req, res) {
  let username = req.query.username;
  res.send(`<html>
    <head><title>User Profile</title></head>
    <body>
      <h1>Welcome, ${username}!</h1> 
    </body>
  </html>`); 
  // Usernames could contain malicious JavaScript 
});


app.get('/', function(req, res) {
    res.send('{"response": "Hello from Snyk!"}');
});

app.get('/will', function(req, res) {
    res.send('{"response": "Hello World!"}');
});

app.get('/ready', function(req, res) {
    res.send('{"response": "Great, It works!"}');
});

app.listen(process.env.port || 3000);
module.exports = app;