const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;
const BACKEND_URL = 'http://localhost:8081';

app.use(cors());           // Permite llamadas desde el frontend (React)
app.use(express.json());   // Entiende JSON en las peticiones

app.use('/api', async (req, res) => {
  try {
    // Construye la URL del backend: http://localhost:8081 + /api/login
    const url = BACKEND_URL + req.originalUrl;
    
    // Reenvía la misma petición al backend
    const respuesta = await axios({
      method: req.method,    // POST, GET, etc.
      url: url,
      data: req.body,        // Lo que envió el frontend (ej. email, password)
    });
    
    // Devuelve al frontend lo que respondió el backend
    res.status(respuesta.status).json(respuesta.data);
  } catch (error) {
    // Si algo falló, devolvemos error 500
    res.status(500).json({ error: 'Error en el gateway' });
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Gateway escuchando en http://localhost:${PORT}`);
});