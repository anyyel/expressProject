const express = require('express');
const router = express.Router(); // Used to create routes. 
const fs = require('fs');
const uuid = require('uuid/v4'); // Creates unique IDs

// Auth MiddleWare
const auth = require('../middleware/auth')

// Custom error
const CustomError = require('../error/error')


// We are reading the JSON file
const userFile = fs.readFileSync('src/users.json', 'utf-8');
const users = JSON.parse(userFile);

const loginFile = fs.readFileSync('src/login.json', 'utf-8');

router.post('/login', (req, res) => {
  const { userName, pw } = req.body;
  try{
    if(!userName || !pw){
      throw new CustomError('Invalid data');
    }
    const user = users.find(user => user.userName === userName);
    if(!user){
      throw new CustomError('This user does not exist');
    } else if(user.pw !== pw){
      throw new CustomError('Invalid Password');
    }
    const login = {
      token: uuid(),
      user: userName
    };
    const loginObj = JSON.stringify(login);
    fs.writeFileSync('src/login.json', loginObj, 'utf-8');  // write the array in the PDF.
    res.status(200).send('You have logged in');
  } catch(error){
    res.status(error.status || 400).send(error.message || 'Something went wrong');
  }
});

router.post('/logout', (req, res) => {
  const { userName } = req.body;
  try{
    if(!userName){
      throw new CustomError('Invalid data');
    }
    const loginFileParse = JSON.parse(loginFile);
    const user = loginFileParse.user === userName;
    if(!user){
      throw new CustomError('Wops! Something went wrong');
    }
    
    fs.writeFileSync('src/login.json', '', 'utf-8');  // write the array in the PDF.
    res.status(200).send('You have logged out');
  } catch(error){
    res.status(error.status || 400).send(error.message || 'Something went wrong');
  }
});

module.exports = router; 