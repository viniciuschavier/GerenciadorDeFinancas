const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel.js')

const jwt_secret = process.env.JWT_SECRET;

const userController = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const { data: existente, erro } = await userModel.getUser(username, email);

      if (existente.length > 0) return res.status(409).json({ error: 'Usuário ou email já cadastrado.' });

      const senhaHash = await bcrypt.hash(password, 10);

      await userModel.insertUser(username, email, senhaHash);

      res.status(201).json({ message: 'Cadastro concluido com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao cadastrar usuário.' })
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      const { data, error } = await userModel.getUser(username);

      const senhaValida = await bcrypt.compare(password, data[0].password);
      if(!senhaValida) return res.status(400).json({ error: 'Username ou senha inválidos.' });

      const token = jwt.sign({ id: data[0].id, username: data[0].username }, jwt_secret, { expiresIn: '2h' });

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge:  2 * 60 * 60 * 1000 // 2 horas
      });

      res.json({ message: 'Login realizado com sucesso!', redirect:'/app' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Erro ao fazer login.' });
    }
  }
}

module.exports = userController;
