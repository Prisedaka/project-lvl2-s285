import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getRenderer from './renderers/renderer';

const propertyActions = [
  {
    type: 'nested',
    check: (first, second, key) => (first[key] instanceof Object && second[key] instanceof Object)
      && !(first[key] instanceof Array && second[key] instanceof Array),
    process: (first, second, fun, key) => ({ name: key, type: 'nested', value: '', children: fun(first, second) }),
  },
  {
    type: 'not changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    process: (first, second, fun, key) => ({ name: key, type: 'not changed', value: _.identity(first), children: [] }),
  },
  {
    type: 'changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    process: (first, second, fun, key) => ({ name: key, type: 'changed', value: { old: first, new: second }, children: [] }),
  },
  {
    type: 'deleted',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    process: (first, second, fun, key) => ({ name: key, type: 'deleted', value: _.identity(first), children: [] }),
  },
  {
    type: 'inserted',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    process: (first, second, fun, key) => ({ name: key, type: 'inserted', value: _.identity(second), children: [] }),
  },
];
const makeAst = (firstConfig = {}, secondConfig = {}) => {
  const configsKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));
  const ast = configsKeys.map((key) => {
    const obj = _.find(propertyActions, item => item.check(firstConfig, secondConfig, key));
    return { ...obj.process(firstConfig[key], secondConfig[key], makeAst, key) };
  });
  return ast;
};
const gendiff = (path1, path2, formatOut) => {
  const formatIn1 = path.extname(path1);
  const formatIn2 = path.extname(path2);
  const data1 = fs.readFileSync(path1, 'utf8');
  const data2 = fs.readFileSync(path2, 'utf8');
  const obj1 = getParser(formatIn1)(data1);
  const obj2 = getParser(formatIn2)(data2);
  const astDiff = makeAst(obj1, obj2);
  // console.log(astDiff);
  return getRenderer(formatOut)(astDiff);
};
export default gendiff;

