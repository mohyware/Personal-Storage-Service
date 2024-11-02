require("dotenv").config();
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');

app.use(express.static('./src/views'))
// middleware
const auth = require('./middleware/auth')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

// routes
const authRouter = require('./routes/auth-route')
const userRouter = require('./routes/user-route')
const folderRouter = require('./routes/folder-route')
const fileRouter = require('./routes/file-route')
// compress all responses
const compression = require('compression');
app.use(compression());
// passport
const initializePassport = require('./config/passport')
var passport = require("passport");
initializePassport(passport)
app.use(passport.initialize());
// rate limit
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
});
app.use(limiter);
// security
const helmet = require('helmet');
app.use(helmet());
const cors = require('cors');
var whitelist = [process.env.CLIENT_URL]
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
const xss = require('xss-clean');
app.use(xss());
app.set('trust proxy', 1);
// parsing middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', auth, userRouter);
app.use('/api/v1/folder', auth, folderRouter);
app.use('/api/v1/file', auth, fileRouter);

// error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})