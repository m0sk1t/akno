#!/usr/bin/env node
const chalk = require('chalk');
const mongoose = require('mongoose');


const DB = 'akno';
const PORT = process.env.PORT || 80;


require('./app').listen(PORT, _ => {
  mongoose.connect(`mongodb://localhost/${DB}`);
  mongoose.connection.once('open', _ => console.log(`${chalk.green('✓')} successfully connected to db ${DB}!`))
  console.log(`${chalk.green('✓')} app listening on port ${PORT} in ${process.env.NODE_ENV} mode!`);
});
