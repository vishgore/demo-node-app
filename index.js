var express = require('express');
var app = express();
const https = require('https');
const { exec } = require('child_process');

// 1. Insecure use of eval()
app.get('/eval', function(req, res) {
  try {
    // Directly evaluating user input is extremely dangerous
    let userInput = req.query.code; 
    let result = Function('return ' + userInput)(); 
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

// 5. Server-Side Request Forgery (SSRF)
app.get('/ssrf', function(req, res) {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('{"error": "URL parameter is required"}');
  }

  try {
    https.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        res.send(data);
      });
    }).on('error', (err) => {
      res.status(500).send(`{"error": "${err.message}"}`);
    });
  } catch (error) {
    res.status(500).send(`{"error": "${error.message}"}`);
  }
});

// 6. Remote Code Execution (RCE)
app.get('/rce', function(req, res) {
  const cmd = req.query.cmd;
  if (!cmd) {
    return res.status(400).send('{"error": "Command parameter is required"}');
  }

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`{"error": "${error.message}"}`);
    }
    res.send(`{"stdout": "${stdout}", "stderr": "${stderr}"}`);
  });
});

app.listen(process.env.port || 3000);
module.exports = app;
