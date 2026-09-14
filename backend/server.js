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

const allowedOrigins = [
  "https://gerenciador-de-financas-eta.vercel.app",
  "https://gerenciador-de-financas-q0e0o6sz5-vinicius-projects-a79e52ee.vercel.app"
];

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/protected', authMiddleware, transactionRouter);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
