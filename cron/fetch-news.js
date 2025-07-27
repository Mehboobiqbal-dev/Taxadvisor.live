const protocol = process.env.NODE_ENV === 'production' ? require('https') : require('http');

const options = {
  hostname: process.env.NODE_ENV === 'production' ? 'www.taxadvisor.live' : 'localhost',
  port: process.env.NODE_ENV === 'production' ? 443 : 3000,
  path: '/api/fetch-news',
  method: 'GET'
};

const req = protocol.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();
