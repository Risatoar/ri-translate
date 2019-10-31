var chalk = require('chalk');

const log = console.log;
const utils = {
  successLog: msg => log(chalk.green(msg)),
  errLog: err => log(chalk.red(err)),
  tipLog: tip => log(chalk.yellow.bold.underline(tip))
};

module.exports = utils;