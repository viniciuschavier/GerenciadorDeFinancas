require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const protectedRouter = express.Router();

// POST /protected/create-transaction
// Rota para criar uma nova transação
protectedRouter.post('/create-transaction', async (req, res) => {
  const user_id = req.usuario.id;
  const { name, type, amount } = req.body;
  
  const { data, error } = await supabase
    .from('transactions')
    .insert([{ user_id, name, type, amount }])
    .select();

  if (error) {
    return res.status(500).json({ error: 'Erro ao criar transação.' });
  }

  res.status(201).json({ message: "Transação salva com sucesso!", data });
});

// GET /protected/transactions
// Rota para buscar transações do usuário autenticado
protectedRouter.get('/transactions', async (req, res) => {
  const user_id = req.usuario.id;

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user_id);

  if (error) {
    return res.status(500).json({ error: 'Erro ao buscar transações.' });
  }

  res.status(200).json(data);
});

// PUT /protected/edit-transaction/:id
// Rota para editar uma transação existente
protectedRouter.put('/edit-transaction/:id', async (req, res) => {
  const { id } = req.params;
  const { name, type, amount } = req.body;

  const { data, error } = await supabase
    .from('transactions')
    .update({ name, type, amount })
    .eq('id', id)
    .select();

  if (error) {
    return res.status(500).json({ error: 'Erro ao atualizar transação.' });
  }

  res.status(200).json({ message: "Transação atualizada com sucesso!", data});
});

//DELETE /protected/delete-transaction/:id
// Rota para deletar uma transação existente
protectedRouter.delete('/delete-transaction/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: 'Erro ao deletar transação.' });
  }

  res.status(200).json({ message: 'Transação deletada com sucesso!' });
});

module.exports = protectedRouter;