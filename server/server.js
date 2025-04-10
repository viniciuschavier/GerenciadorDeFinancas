require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('../routes/authRouter.js');
const protectedRouter = require('../routes/protected.js');
const authMiddleware = require('../middlewares/protectedRouter.js');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.use('/auth', authRouter);
app.use('/protected', authMiddleware, protectedRouter);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});