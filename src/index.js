const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');

// Auth MiddleWare
// const auth = require('./middleware/auth')


// Settings
app.set('port', process.env.PORT || 3001);

// Middleware
// app.use(auth); // this is a custom middleware: un-comment if we want to block all the routes
app.use(morgan('dev'));
app.use(express.json()); // this middleware is use for express to understeand json

// Routes 
app.use('/api/auth', require('./routes/login.routes'));
app.use('/api/tasks', require('./routes/tasks.routes'));
app.use('/api/users', require('./routes/user.routes'));

// Static files 
  app.use(express.static(path.join(__dirname, 'public')))


//Staring server 
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`)
})