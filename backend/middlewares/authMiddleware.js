const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

const autenticarToken = (req, res, next) => {
  const token = req.cookies.token;

  // Verifica se o token foi fornecido
  if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

  try {
    // Verifica se o token fornecido é válido
    const decoded = jwt.verify(token, jwt_secret);
    
    req.usuario = decoded;
    next();
  } catch (error) {
    // Se o token não for válido, redireciona para a página de login
    return res.status(401).json({ message: 'Token inválido.' });
  }
}

module.exports = autenticarToken;