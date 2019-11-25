const express = require('express');
const router = express.Router(); // Used to create routes. 
const fs = require('fs');
const uuid = require('uuid/v4'); // Creates unique IDs

// Auth MiddleWare
const auth = require('../middleware/auth')

// Custom error
const CustomError = require('../error/error')

// We are reading the JSON file
const tasksFile = fs.readFileSync('src/tasks.json', 'utf-8');
const tasks = JSON.parse(tasksFile);

router.get('/', (req, res) => {
  try {
    res.json(tasks); 
  } catch (error) {
    res.status(error.status || 400).send(error.message || 'Something went wrong');
  }
})
.post('/', auth, (req, res) => {
  const { name, content, description } = req.body;
  try {
    if ( !name || !content || !description ) {
      throw new CustomError('Invalid data');
    }
    const newTask = {
      id: uuid(),
      name,
      content,
      description
    };
    tasks.push(newTask);
    const tasksObj = JSON.stringify(tasks);
    fs.writeFileSync('src/tasks.json', tasksObj, 'utf-8');  // write the array in the PDF. 
    res.status(200).send('Task was saved successfully')
  } catch (error) {
    res.status(error.status || 400).send(error.message || 'Something went wrong');
  }
  if ( !name, !content, !description ) {

  }
})
.delete('/:id', (req, res) => {
  try {
    const task = tasks.find(task => task.id === req.params.id);
    if(!task){
      throw new CustomError('Invalid ID')
    }
    const filterTasks = tasks.filter(task => task.id != req.params.id);
    const tasksObj = JSON.stringify(filterTasks);
    fs.writeFileSync('src/tasks.json', tasksObj, 'utf-8');  // write the array in the PDF.
    res.status(200).send('Task was saved successfully')
  } catch (error) {
    res.status(error.status || 400).send(error.message || 'Something went wrong');
  }
})
.put('/:id', (req, res) => {
  const { name, content, description } = req.body;
  try {
    const taskToUpdate = tasks.find(task => task.id === req.params.id);
    if (!taskToUpdate){
      throw new CustomError('Invalid ID')
    } else if(!name || !content || !description) {
      throw new CustomError('Invalid data')
    }
    const filterTasks = tasks.filter(task => task.id !== req.params.id);
    const newTask = {
      id: taskToUpdate.id,
      name,
      content,
      description
    };
    filterTasks.push(newTask)
    const tasksObj = JSON.stringify(filterTasks);
    fs.writeFileSync('src/tasks.json', tasksObj, 'utf-8');  // write the array in the PDF.
    res.status(200).send('The task was update');
  } catch (error) {
    res.status(error.status || 400).send(error.message || 'Something went wrong');
  }
});

module.exports = router; 