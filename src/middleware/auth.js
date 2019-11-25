const fs = require('fs');

// Custom error
const CustomError = require('../error/error')

const loginFile = fs.readFileSync('src/login.json', 'utf-8');

const auth = async (req, res, next) => {
    //console.log(`Route recived: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    try {
        const loginDB = JSON.parse(loginFile);
        const token = req.header('Authorization').replace('Bearer ', '');
        const auth = loginDB.token === token;
        if (!auth){
            throw new CustomError('Ivalid Token');
        }
        req.user = loginDB.user;
        req.token = loginDB.token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized user' })
    }
  }

  module.exports = auth
  