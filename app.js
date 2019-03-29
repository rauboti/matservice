// => node modules
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const device = require('express-device');

// => other constants & requirements
const app = express();
const port = process.env.PORT || 2000
const router = require('./src/routes/route')();

// => configuring the app
app.use(morgan('tiny'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cookieParser())
//  .use(favicon(path.join(__dirname, '/public/ico', 'favicon.ico')))
  .use(device.capture())
  .set('views', './public/views')
  .set('view engine', 'ejs');

// => static folders
app.use(express.static(path.join(__dirname, '/public')))
.use('/css', express.static(path.join(__dirname, '/src/css')))
.use('/js', express.static(path.join(__dirname, '/src/js')))
.use('/img', express.static(path.join(__dirname, '/src/img')))
.use('/ico', express.static(path.join(__dirname, '/src/ico')))

// => binding the router to the root
app.use('/', router);

// => listening to the port
app.listen(port, () => {
  debug(`Server up, listening to port ${chalk.cyan(port)}`);
});
