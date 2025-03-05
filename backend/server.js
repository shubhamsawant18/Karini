const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db');
dotenv.config();
const app = express();
const userRoutes = require('./routes/usersRouter');

connectDb();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
