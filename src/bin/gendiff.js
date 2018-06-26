#!/usr/bin/env node
import commander from 'commander';
import gendiff from '../';

commander
  .version('1.0.9')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => console.log(gendiff(`./${firstConfig}`, `./${secondConfig}`)))
  .parse(process.argv);
