const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/InfoDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Create a schema
const userSchema = new mongoose.Schema({
  name: String,
  age: String,
  phno: String,
  email: String,
  password: String
});

// Create a model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/register', (req, res) => {
  const { name, age, phno, email, password } = req.body;

  const newUser = new User({
    name,
    age,
    phno,
    email,
    password
  });

  newUser.save()
    .then(() => {
      console.log('User registered:', newUser);
      res.send('Registration successful!');
    })
    .catch(err => {
      console.error('Registration failed:', err);
      res.status(500).send('Registration failed!');
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});