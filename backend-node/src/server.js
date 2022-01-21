const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const cors = require("cors")
require("dotenv").config()

const petRoutes = require('./routes/pet');
const petTypeRoutes = require('./routes/petType');
const userRoutes = require('./routes/user');

const app = express()

app.use(cors());
app.use(express.json());
app.use('/api/pet', petRoutes);
app.use('/api/pettype', petTypeRoutes);
app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('*', (req, res) => {
  res.send('This route does not exist')
})

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  
  if (process.env.NODE_ENV !== 'test') {
    const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
  };
  
  module.exports=app