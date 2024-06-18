const jwt = require('jsonwebtoken');
require('dotenv').config();

const authentication = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).send("Token not provided");
    }

    const splitToken = token.split(' ');
    const token2 = splitToken[1];
    const decodedToken = jwt.verify(token2, process.env.JWT_TOKEN);

    if (!decodedToken) {
      return res.status(401).send("Invalid token");
    }

    const currentTime = Math.floor(new Date().getTime() / 1000);
    if (currentTime > decodedToken.exp) {
      return res.status(401).send("Token expired");
    }

    req.user = decodedToken.sub;

    console.log('Authenticated user:', req.user);

    next();
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

module.exports = { authentication };
