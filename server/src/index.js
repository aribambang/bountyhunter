require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middleware/authRequire');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = `mongodb+srv://admin:${process.env.PASSWD}@cluster0.wxp6g.gcp.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connection to MongoDB Atlas', err);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
