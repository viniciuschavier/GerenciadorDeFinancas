require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const autenticarToken = require('../middlewares/protectedRouter.js');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const jwt_secret = process.env.JWT_SECRET;

// Rota para cadastro de usuario
app.post('/cadastro', async (req, res) => {
  const { username, email, password } = req.body;

  const { data: existente, erro } = await supabase
  .from('users')
  .select('id')
  .or(`username.eq.${username},email.eq.${email}`);

  if (existente.length > 0) {
    return res.status(409).json({
      error: 'Usuário ou email já cadastrado.'
    });
  }

  const senhaHash = await bcrypt.hash(password, 10);

  const { error } = await supabase
    .from('users')
    .insert([{ username, email, password: senhaHash }]);

  if(error) return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });

  res.status(201).json({ message: 'Cadastro concluido com sucesso!' });
});

//Rota para login de usuario
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if(error) return res.status(400).json({ error: 'Username ou senha inválidos.' });

  const senhaValida = await bcrypt.compare(password, data.password);
  if(!senhaValida) return res.status(400).json({ error: 'Username ou senha inválidos.' });

  const token = jwt.sign({ id: data.id, username: data.username }, jwt_secret, { expiresIn: '2h' });

  res.json({ message: 'Login realizado com sucesso!', redirect:'/public/index.html', id: data.id, token });
});

//Rota para verificar a autenticacao do usuario
// Essa rota é protegida e requer um token JWT válido para acesso
app.get('/verificarAutenticacao', autenticarToken,(req, res) => {
  res.json({ message: 'Acesso autorizado!', usuario: req.usuario });
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});