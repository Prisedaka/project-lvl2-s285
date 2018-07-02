#!/usr/bin/env node
import fs from 'fs';
import commander from 'commander';
import gendiff from '../';

commander
  .version(JSON.parse(fs.readFileSync('./package.json', 'utf8')).version)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format', 'struct')
  .action((firstConfig, secondConfig) =>
    console.log(gendiff(firstConfig, secondConfig, commander.format)))
  .parse(process.argv);
