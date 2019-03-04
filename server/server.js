const express = require('express');
const app = express();
const PORT = 3000;

// com.okta.dev-321403:/callback

// client id
// 0oabumqx3KFWXdo0h356

// auth0 client id
// 4bAv72XiiovvX56Df8D7cYj1RwHGrdNk

// dev-8cfvojsc.auth0.com

app.get('/', (req, res) => res.send('hello'));

app.listen(PORT, function() {
  console.log('server is listening on port ', PORT);
});
