const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cityRoutes = require('./routes/city');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://akulajayaram96:Harry123@user-logins.2czbbuy.mongodb.net/cityDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/cities', cityRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
