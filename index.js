const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// import Routes
const authRoute = require('./router/auth');
const usersRoute = require('./router/user');

dotenv.config();

const PORT = process.env.PORT || 5000;

//Connect to BD
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log('Connect to BD')
);

//Middleware
app.use(express.json());
app.use(cors());

// import Middlewares
app.use('/', authRoute);
app.use('/', usersRoute);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
