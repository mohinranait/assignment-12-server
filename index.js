const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser')

const { serverPort } = require('./src/secret');
const connectDatabase = require('./src/config/database');
const postRouter = require('./src/routes/postRouter');
const announceRoute = require('./src/routes/announcementRoute');
const paymentRoute = require('./src/routes/paymentRoute');
const commentRoute = require('./src/routes/CommentRoute');
const userRoute = require('./src/routes/userRouter');
const authenticationRoute = require('./src/routes/authenticaionRoute');
const tagRoute = require('./src/routes/tagRoute');
const { adminAnalityces } = require('./src/controllers/adminAnaliticsController');

// Database connected
connectDatabase()


// Middlewire
app.use(
    cors({
      origin: ['http://localhost:5173'],
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    })
);
app.use(express.json());
app.use(cookieParser())


// Routes
app.use('/', userRoute)
app.use("/", postRouter )
app.use('/', announceRoute)
app.use('/', paymentRoute)
app.use('/', commentRoute)
app.use('/', authenticationRoute)
app.use('/', tagRoute)
app.get('/admin-analitics', adminAnalityces)



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
   
    console.log(`Server is running at port http://localhost:${serverPort}`);
})




