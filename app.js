require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const { errors: celebrateErrors } = require('celebrate');

const { jsonValidator } = require('./utils/request-validators');

const errors = require('./middlewares/errors');

const { requestLogger, errorLogger } = require('./config/logger');
const limiter = require('./config/limiter');
const cors = require('./config/cors');
const helmet = require('./config/helmet');
const bodyParser = require('./config/bodyParser');
const mongoose = require('./config/mongoose');

const index = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose();

app.use(cors);
app.use(requestLogger);
app.use(limiter);

app.use(jsonValidator);
app.use(bodyParser);
app.use(cookieParser());

app.use(helmet);

app.use(index);

app.use(errorLogger);
app.use(celebrateErrors());
app.use(errors);

app.listen(PORT);
