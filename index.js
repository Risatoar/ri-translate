#!/usr/bin/env node

var program = require('commander');
var pkg = require('./package.json');

program
  .version(pkg.version)
  .command('rigo').alias('i')
  .parse(process.argv);