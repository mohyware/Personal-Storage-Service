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
// passport
const initializePassport = require('./config/passport')
var passport = require("passport");
initializePassport(passport)
app.use(passport.initialize());

app.use(cookieParser());
app.use(express.json());
app.set('trust proxy', 1);
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