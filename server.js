require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const authRouter = require('./routes/authRouter.js');
const transactionRouter = require('./routes/transactionRouter.js');
const authMiddleware = require('./middlewares/authMiddleware.js');

const port = process.env.PORT;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/protected', authMiddleware, transactionRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/app', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'auth/app.html'));
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});