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

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors({
  origin: 'https://gerenciador-de-financas-eta.vercel.app',
  credentials: true
}));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/protected', authMiddleware, transactionRouter);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
