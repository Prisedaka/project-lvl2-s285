#!/usr/bin/env node
import fs from 'fs';
import commander from 'commander';
import gendiff from '../';

commander
  .version(JSON.parse(fs.readFileSync('./package.json', 'utf8')).version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => console.log(gendiff(firstConfig, secondConfig)));

commander.parse(process.argv);
