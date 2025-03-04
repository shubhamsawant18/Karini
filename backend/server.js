const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
dotenv.config();
const app  = express();
const routes = require('./routes/index');

connectDb();
const port = process.env.PORT;


app.use(routes);

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})