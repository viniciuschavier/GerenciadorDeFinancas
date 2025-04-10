require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const protectedRouter = express.Router();

protectedRouter.post('/create-transaction', async (req, res) => {
  const user_id = req.usuario.id;
  const { name, type, amount } = req.body;
  
  const { data, error } = await supabase
    .from('transactions')
    .insert([{ user_id, name, type, amount }])
    .select();

  if (error) {
    console.error(error.message)
    return res.status(500).json({ error: 'Erro ao criar transação.' });
  }

  res.status(201).json(data);
});

protectedRouter.get('/transactions', async (req, res) => {
  const user_id = req.usuario.id;

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user_id);

  if (error) {
    console.error(error.message)
    return res.status(500).json({ error: 'Erro ao buscar transações.' });
  }

  res.json(data);
});

module.exports = protectedRouter;