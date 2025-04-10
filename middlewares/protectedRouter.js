const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

const autenticarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  // Verifica se o token foi fornecido
  if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

  // Verifica se o token fornecido é válido
  jwt.verify(token, jwt_secret, (err, usuario) => {
    if (err) return res.status(403).json({ message: 'Token inválido.' });
    req.usuario = usuario;
    next();
  });
}

module.exports = autenticarToken;