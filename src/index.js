import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getRenderer from './renderer/renderer';

const propertyActions = [
  {
    type: 'nested',
    check: (first, second, key) => (first[key] instanceof Object && second[key] instanceof Object)
      && !(first[key] instanceof Array && second[key] instanceof Array),
    process: (first, second, fun) => fun(first, second),
    typeValue: 'children',
  },
  {
    type: 'not changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    process: first => _.identity(first),
    typeValue: 'value',
  },
  {
    type: 'changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    process: (first, second) => ({ old: first, new: second }),
    typeValue: 'value',
  },
  {
    type: 'deleted',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    process: first => _.identity(first),
    typeValue: 'value',
  },
  {
    type: 'inserted',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    process: (first, second) => _.identity(second),
    typeValue: 'value',
  },
];
const makeAst = (firstConfig = {}, secondConfig = {}) => {
  const configsKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));
  const ast = configsKeys.map((key) => {
    const { type, process, typeValue } = _.find(propertyActions, item => item.check(firstConfig, secondConfig, key));
    return {
      name: key, type, [typeValue]: process(firstConfig[key], secondConfig[key], makeAst),
    };
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
  return getRenderer(formatOut)(astDiff);
};
export default gendiff;

