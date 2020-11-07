require('dotenv').config();

const express = require('express');

const cookieParser = require('cookie-parser');

const { isJsonContent } = require('./middlewares/request-validators');

const errors = require('./middlewares/errors');

const router = require('./routes/index');
const mongooseErrors = require('./middlewares/mongoose-errors');
const celebrateErrors = require('./middlewares/celebrate-errors');
const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { bodyParser } = require('./middlewares/body-parser');
const { mongoose } = require('./middlewares/mongoose');
const { helmet } = require('./middlewares/helmet');
const { cors } = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();

mongoose();

app.use(cors);
app.use(helmet);
app.use(requestLogger);
app.use(limiter);

app.use(isJsonContent);
app.use(bodyParser);
app.use(cookieParser());

app.use(router);

app.use(mongooseErrors);

app.use(celebrateErrors);
app.use(errorLogger);

app.use(errors);

app.listen(PORT);
