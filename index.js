const express = require('express');
const fs = require('fs');
const cors = require('cors')

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  return res.send('Hello World!');
});

app.get('/api/cats', (req, res) => {
  const files = fs.readdirSync(`${__dirname}/cats`);
  return res.send(files.map((file) => ({ id: file })))
});

app.get('/cat/:catId', (req, res) => {
  const catId = req.params.catId;
  const file = fs.readFileSync(`${__dirname}/cats/${catId}`);
  const extension = catId.split('.')[1];
  return res.contentType(`image/${extension}`).send(file);
})

app.listen(8080, () => {
  console.log(`server running on port 8080`)
})
