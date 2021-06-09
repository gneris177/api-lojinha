const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) res.status(401).send({error: 'Token inesxistente'});
  const parts = authHeader.split(' ');

  if(!parts.length === 2) res.status(401).send({error: 'Token error'});
  const [ scheme, token ] = parts;

  if(!/Bearer$/i.test(scheme)) res.status(401).send({error: 'Token mal formado'});

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if(err) res.status(401).send({error: 'Token inválido'});
    req.userId = decode.id;
    return next(); 
  })
}