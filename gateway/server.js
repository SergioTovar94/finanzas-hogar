const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;
const BACKEND_URL = 'http://localhost:8081';

app.use(cors());           // Permite llamadas desde el frontend (React)
app.use(express.json());   // Entiende JSON en las peticiones

app.use('/', async (req, res) => {
  try {
    const url = BACKEND_URL + req.originalUrl;
    
    const respuesta = await axios({
      method: req.method,    // POST, GET, etc.
      url: url,
      data: req.body,        // Lo que envió el frontend (ej. email, password)
    });
    
    res.status(respuesta.status).json(respuesta.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    }else if (error.request) {
      res.status(503).json({
        error: 'Backend no disponible',
        message: 'No se pudo conectar con el servidor de autenticación'
      });
    }else{
      res.status(500).json({
        error: 'Error interno del gateway',
        message: error.message
      });
    }
    }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Gateway escuchando en http://localhost:${PORT}`);
});