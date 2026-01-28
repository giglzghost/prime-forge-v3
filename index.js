const express = require('express');
const cors = require('cors');
const paypal = require('@paypal/checkout-server-sdk');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => res.json({ok: true, version: 'V3', autonomy: true, agents: ['AI7V3', 'Swarm'], memory: 'transferred from V2'}));

const env = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID || 'demo', process.env.PAYPAL_CLIENT_SECRET || 'demo');
const client = new paypal.core.PayPalHttpClient(env);

app.post('/api/paypal', async (req, res) => {
  res.json({status: 'approved', amount: req.body.amount || 10, swarm_triggered: true});
});

app.post('/api/swarm/init', (req, res) => {
  res.json({swarm: 'active', auth: 'full', actions: 'web/docs/filings/realworld'});
});

module.exports = app;

if (!process.env.VERCEL) app.listen(4000, '0.0.0.0', () => console.log('Prime Forge V3 Empire on 4000'));
