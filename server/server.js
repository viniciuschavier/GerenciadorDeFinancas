require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('../routes/authRouter.js');
const protectedRouter = require('../routes/protected.js');
const authMiddleware = require('../middlewares/protectedRouter.js');
const path = require('path');

const port = process.env.PORT;

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/protected', authMiddleware, protectedRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'auth.html'));
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});