const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const transactionModel = require('../models/transactionModel.js')

const transactionController = {
  getTransactions: async (req, res) => {
    try {
      const user_id = req.usuario.id;

      const { data, error } = await transactionModel.getAllTransactionsByUserId(user_id);
  
      if (error) return res.status(400).json({ error: 'Erro ao buscar transações.' });
  
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno no servidor.' })
    }
  },

  createTransaction: async (req, res) => {
    try {
      const { user_id, name, type, amount } = req.body

      if (!name || !type || !amount) return res.status(400).json({ error: 'Campos obrigatórios ausentes' });

      const { data, error } = await transactionModel.insertTransaction(user_id, name, type, amount);

      if (error) return res.status(400).json({ error: 'Erro ao criar transação.' });

      res.status(201).json({ message: "Transação criada com sucesso!", data });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno no servidor.' })
    }
  },

  updateTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, type, amount } = req.body;

      const { data, error } = await transactionModel.updateTransaction(id, name, type, amount);

      if (error) return res.status(400).json({ error: 'Erro ao atualizar transação.' });

      res.status(200).json({ message: "Transação atualizada com sucesso!", data});
    } catch (error) {
      res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  },

  deleteTrasaction: async (req, res) => {
    try {
      const { id } = req.params;

      const error = await transactionModel.deleteTransaction(id);
    
      if (error) return res.status(400).json({ error: 'Erro ao deletar transação.' });
    
      res.status(200).json({ message: 'Transação deletada com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  },

  logout: async (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    });
    res.json({ message: 'Logout feito com sucesso' });
  }
}

module.exports = transactionController