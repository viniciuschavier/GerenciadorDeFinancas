const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');
const userController = require('../controllers/userController.js')

const authRouter = express.Router();

// POST /auth/cadastro
// Rota para cadastro de usuario
authRouter.post('/cadastro', userController.registerUser);

// POST /auth/login
// Rota para login de usuario
authRouter.post('/login', userController.loginUser);

// GET /auth/verificarAutenticacao
// Rota para verificar a autenticacao do usuario
// Essa rota é protegida e requer um token JWT válido para acesso
authRouter.get('/verificarAutenticacao', authMiddleware, (req, res) => {
  res.json({ message: 'Acesso autorizado!', usuario: req.usuario });
});

module.exports = authRouter;