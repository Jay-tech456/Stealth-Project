import express from 'express';
import httpProxy from 'http-proxy';

const app = express();
const port = process.env.PORT || 5052;

// Create a proxy server
const apiProxy = httpProxy.createProxyServer();

// Middleware to parse JSON
app.use(express.json());

// Routes configuration
const loginService = 'http://localhost:5050/';
const restaurantService = 'http://localhost:5051';


app.all('/Login/*', (req, res) => {
    console.log("Get Request summoned")
  apiProxy.web(req, res, { target: loginService });
});

app.all('/restaurant/*', (req, res) => {
  apiProxy.web(req, res, { target: restaurantService });
});

// Error handling
apiProxy.on('error', (error, req, res) => {
  res.status(500).send({ error: 'An error occurred while processing the request.' });
});

app.listen(port, () => {
  console.log(`API Gateway is running on http://localhost:${port}`);
});
