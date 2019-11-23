const express = require('express');
const morgan = require('morgan');
const app = express();

const middleWare = (req, res, next) => {
  //console.log(`Route recived: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  console.log('Function middleWare')
  next();
}

app.use(express.json());
app.use(middleWare);
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello guys');
});

app.all('/user', (req, res, next) => {
  console.log('passed here guys');
  next();
})

app.get('/user', (req, res) => {
  console.log('user Here')
  res.json({
    userName: 'amora',
    password: '****',
  });
});

app.post('/user/:id', (req, res) => {
  res.send('User resived'); 
  console.log(req.params); // printing the params
  console.log(req.body);
});

app.delete('/user/:id', (req, res) => {
  res.send(`user ${req.params.id}`);
  console.log(req.body);
});

app.put('/user/:id', (req, res) => {
  res.send(`user ${req.params.id} updated`);  
  console.log(req.body);
});

app.post('/about', (req, res) => {
  res.send('It is me Post');
});

app.put('/aboutPost', (req, res) => {
  res.send('It is me Put');
});

app.delete('/aboutDelete', (req, res) => {
  res.send('It is me delete');
});

app.listen(3001, () => {
  console.log('Server Running')
})