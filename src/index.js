const express = require('express');
const cors = require('cors');
const { serverPort } = require('./secret');
const connectDatabase = require('./config/database');
const app = express();


const userRoute = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const announceRoute = require('./routes/announcementRoute');
const paymentRoute = require('./routes/paymentRoute');

// Middlewire
app.use(express.json());
app.use(cors());



// Routes
app.use('/', userRoute)
app.use("/", postRouter )
app.use('/', announceRoute)
app.use('/', paymentRoute)



app.get("/", (req, res) => {
    res.send("Home route is working");
})



app.all('*', (req,res, next) => {
    // console.log('all');
    res.status(404).send({
        message : "Page not founded",
    })
})



app.listen(serverPort , async () => {
    await connectDatabase()
    console.log(`Server is running at port http://localhost:${serverPort}`);
})




