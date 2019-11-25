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

router.get('/', (req, res) => {
  res.json(users);
})
  .post('/', (req, res) => {
    const { userName, name, pw } = req.body;
    try {
      if (!name || !userName || !pw) {
        throw new CustomError('Invalid data');
      }
      const newUser = {
        id: uuid(),
        name,
        userName,
        pw
      };
      users.push(newUser);
      const userObj = JSON.stringify(users);
      fs.writeFileSync('src/users.json', userObj, 'utf-8');  // write the array in the PDF.
      res.status(200).send('User was saved successfully')
    } catch (error) {
      res.status(error.status || 400).send(error.message || 'Something went wrong');
    }
  })
  .delete('/:id', (req, res) => {
    try {
      const task = users.find(user => user.id === req.params.id);
      if(!task){
        throw new CustomError('Invalid ID')
      }
      const filterUsers = users.filter(user => user.id != req.params.id);
      const usersObj = JSON.stringify(filterUsers);
      fs.writeFileSync('src/users.json', usersObj, 'utf-8');  // write the array in the PDF.
      res.status(200).send('User was deleted successfully')
    } catch (error) {
      res.status(error.status || 400).send(error.message || 'Something went wrong');
    }
  })
  .put('/:id', (req, res) => {
    const { userName, name } = req.body;
    try {
      const userToUpdate = users.find(user => user.id === req.params.id);
      if (!userToUpdate){
        throw new CustomError('Invalid ID')
      } else if(!name || !userName) {
        throw new CustomError('Invalid data')
      }
      const filterUsers = users.filter(user => user.id !== req.params.id);
      const newUser = {
        id: userToUpdate.id,
        name,
        userName,
        pw: userToUpdate.pw
      };
      filterUsers.push(newUser)
      const usersObj = JSON.stringify(filterUsers);
      fs.writeFileSync('src/users.json', usersObj, 'utf-8');  // write the array in the PDF.
      res.status(200).send('The task was update');
    } catch (error) {
      res.status(error.status || 400).send(error.message || 'Something went wrong');
    }
  });

module.exports = router; 