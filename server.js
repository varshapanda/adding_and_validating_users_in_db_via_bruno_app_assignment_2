require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./route/user.route.js');

const app = express();
app.use(express.json());
app.use(cors());

mongoose
.connect(process.env.DB_URL)
.then(()=>console.log(`Database connected successfully`))
.catch((err)=>console.log(`Database connection failed`, err))


app.use('/auth', userRouter);

const PORT = process.env.PORT||8080;

app.listen(PORT,()=>{
    console.log(`Server is running on port  http://localhost:${PORT}`);
})