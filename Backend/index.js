const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Middleware to parse JSON requests
app.use(express.json());

// Simple API endpoint
app.get('/', (req, res) => {
  res.send('Hello from Node.js API connected to MongoDB!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
