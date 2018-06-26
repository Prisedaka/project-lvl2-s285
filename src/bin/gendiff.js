#!/usr/bin/env node
import commander from 'commander';
import gendiff from '../';

commander
  .version('1.0.9')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => {
    const firstConfigValue = firstConfig;
    const secondConfigValue = secondConfig;
    return gendiff(firstConfigValue, secondConfigValue);
  })
  .parse(process.argv);
