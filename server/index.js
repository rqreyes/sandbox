const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// set up express server
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

// set up routes
app.use('/users', require('./routes/userRouter'));

// set up mongoose
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  }
);
