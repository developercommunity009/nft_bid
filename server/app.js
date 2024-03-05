const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss    = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const path = require('path')


const AppError = require("./Utils/appError");
const globalErrorHandler = require("./controller/errorController");

const nftsRouter = require("./routes/nftRouter");
const usersRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const uploadRouter = require("./routes/uploadRouter");
const transactionRouter = require("./routes/transcationRoute");



dotenv.config({path : "./config.env"});
const app = express();

app.use(express.json({limit : "10kb"}));

// Data sanitization against NoSQL query Injection
app.use(mongoSanitize());

// Prevent Parametter Pallution
app.use(hpp({
    whitelist:[
        "price",
        "ratingsAverage",
        "ratingsQuantity"
    ],
}));

// Data sanitization against site Scripts XSS
app.use(xss());




// Secure Header HTTP
app.use(helmet());

app.use(cors({
  origin: 'https://nft-bid-front-end.vercel.app',
methods: ['GET', 'POST', 'PUT', 'DELETE' , 'PATCH'],
  credentials: true,
}));


//  Globle MiddelWare
if(process.env.NODE_ENV == "developement"){
    app.use(morgan("dev"))
}
app.get("/" , (req, res) => {
    res.json("NFT Biddind Bidding Server")
})

const ratelimit = rateLimit({
    // if user trafic are high on webste then can incress the value of max
    max :1000,
    windowMs: 60 * 60 * 1000,
    message:" Too many request from this IP , pleace try again an hour",
})

// here we are apply Limit on every Single Route
app.use("/api" , ratelimit);

// SERVING TEMPLATE DATA
app.use('/static', express.static(path.join(__dirname, '/public/assets')))

// COUSTOM MIDDLEWARE
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.headers);
    next();
})




app.use("/api/v1/nfts" , nftsRouter );
app.use("/api/v1/users" , usersRouter );
app.use("/api/v1/auth" , authRouter )
app.use("/api/v1/upload" , uploadRouter );
app.use("/api/v1/trx" , transactionRouter);



app.all("*" , (req , res, next)=>{
    // res.status(404).json({
    //     status:"Fail",
    //     message:`Can't find ${req.originalUrl} on this server`
    // });

//     const err = new Error(`Can't find ${req.originalUrl} on this server`);
//     err.status = "Fail";
//     err.statusCode = 404;
//    next(err);
    next( new AppError(`Can't find ${req.originalUrl} on this server` , 404))
})

// Globle error handling
app.use(globalErrorHandler)



module.exports = app; 
