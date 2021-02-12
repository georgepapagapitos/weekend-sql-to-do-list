const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('server/public'));

const todoRouter = require('./routes/todo_router');
app.use('/todoList', todoRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
