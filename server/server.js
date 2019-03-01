const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.send('hello'));

app.listen(PORT, function() {
  console.log('server is listening on port ', PORT);
});
