require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');

const { isJsonContent } = require('./middlewares/request-validators');

const errors = require('./middlewares/errors');

const { requestLogger, errorLogger } = require('./config/logger');
const limiter = require('./config/limiter');
const cors = require('./config/cors');
const helmet = require('./config/helmet');
const bodyParser = require('./config/body-parser');
const mongoose = require('./config/mongoose');

const index = require('./routes/index');
const mongooseErrors = require('./middlewares/mongoose-errors');
const celebrateErrors = require('./middlewares/celebrate-errors');

const { PORT = 3000 } = process.env;

const app = express();

mongoose();

app.use(cors);
app.use(requestLogger);
app.use(limiter);

app.use(isJsonContent);
app.use(bodyParser);
app.use(cookieParser());

app.use(helmet);

app.use(index);

app.use(mongooseErrors);

app.use(celebrateErrors);
app.use(errorLogger);

app.use(errors);

app.listen(PORT);
