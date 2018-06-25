#!/usr/bin/env node
import commander from 'commander';
import _ from 'lodash';
import fs from 'fs';

commander
  .version('1.0.9')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => {
    const firstConfigValue = firstConfig;
    const secondConfigValue = secondConfig;
  })
  .parse(process.argv);
//console.log(fs.readFileSync('../../__tests__/__fixtures__/after.json', 'utf8'));
const gendiff = (path1 = commander.firstConfigValue, path2 = commander.secondConfigValue) => {
  const obj1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const obj2 = JSON.parse(fs.readFileSync(path2, 'utf8'));
  Object.keys(obj1).reduce((acc, elem) => {
    if (_.has(obj2, elem)) {
      acc[elem] = obj1.elem;
    }
    return acc;
  }, {});
};
export default gendiff;
