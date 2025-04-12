const express = require('express');
const transactionController = require('../controllers/transactionController');

const protectedRouter = express.Router();

// POST /protected/create-transaction
// Rota para criar uma nova transação
protectedRouter.post('/create-transaction', transactionController.createTransaction);

// GET /protected/transactions
// Rota para buscar transações do usuário autenticado
protectedRouter.get('/transactions', transactionController.getTransactions);

// PUT /protected/edit-transaction/:id
// Rota para editar uma transação existente
protectedRouter.put('/edit-transaction/:id', transactionController.updateTransaction);

// DELETE /protected/delete-transaction/:id
// Rota para deletar uma transação existente
protectedRouter.delete('/delete-transaction/:id', transactionController.deleteTrasaction);

// GET /protected/logout
// Rota para fazer logout do usuario
protectedRouter.post('/logout', transactionController.logout);

module.exports = protectedRouter;