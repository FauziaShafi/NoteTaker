//1.  require express
const express = require('express');
// 2. create object of express and store inside app variable
const app = express();
//3. 
const PORT = process.env.port || 3001;
const api = require('./routes/apiRoutes.js');
const path = require('path');

//4.  Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//5. route to all files in the "public" folder
app.use(express.static('public'));

// 6.1 Create a route
app.use('/api', api);

// 6.2  GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// 6.3  GET Route for Notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//7.   start the server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


