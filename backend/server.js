const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const EFACT_BASE = 'https://odin-dev.efact.pe/api-efact-ose';

// -------------------- LOGIN --------------------
app.post('/api/login', async (req, res) => {
  try {
    const form = new URLSearchParams();
    form.append('grant_type', 'password');
    form.append('username', req.body.username);
    form.append('password', req.body.password);

    const response = await axios.post(`${EFACT_BASE}/oauth/token`, form, {
      headers: {
        'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    res.json(response.data);

  } catch (error) {
    console.log("Error backend a EFACT:", error.response?.data);
    res.status(500).json({ error: "Error autenticando con EFACT" });
  }
});


// -------------------- DOCUMENTOS --------------------
app.get('/api/:type/:ticket', async (req, res) => {
  try {
    const { type, ticket } = req.params;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'No token provided' });

    let endpoint;
    let contentType;

    switch (type) {
      case 'pdf':
        endpoint = `${EFACT_BASE}/v1/pdf/${ticket}`;
        contentType = 'application/pdf';
        break;

      case 'xml':
        endpoint = `${EFACT_BASE}/v1/xml/${ticket}`;
        contentType = 'application/xml';
        break;

      case 'cdr':
        endpoint = `${EFACT_BASE}/v1/cdr/${ticket}`;
        contentType = 'application/zip';
        break;

      default:
        return res.status(400).json({ error: 'Tipo inválido' });
    }

    const response = await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'arraybuffer'
    });

    res.setHeader('Content-Type', contentType);
    res.send(response.data);

  } catch (error) {
    console.log('Error obteniendo documento:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error obteniendo documento' });
  }
});


// -------------------- START SERVER --------------------
app.listen(3000, () => {
  console.log("Backend corriendo en http://localhost:3000");
});
