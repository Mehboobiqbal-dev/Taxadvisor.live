const http = require('http');
const https = require('https');

function log(message) {
  const logOptions = {
    hostname: 'logs.example.com', // Replace with your logging service
    port: 443,
    path: '/logs',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(message),
    },
  };

  const logReq = https.request(logOptions);
  logReq.on('error', () => {}); // Ignore logging errors
  logReq.write(message);
  logReq.end();
}

const protocol = process.env.NODE_ENV === 'production' ? https : http;

const options = {
  hostname: process.env.NODE_ENV === 'production' ? 'www.taxadvisor.live' : 'localhost',
  port: process.env.NODE_ENV === 'production' ? 443 : 3000,
  path: '/api/generate-post',
  method: 'GET'
};

const req = protocol.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    log(JSON.stringify({ statusCode: res.statusCode, body: data }));
  });
});

req.on('error', (error) => {
  log(JSON.stringify({ error: error.message }));
});

req.end();
