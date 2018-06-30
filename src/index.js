import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const propertyActions = [
  {
    type: 'nested',
    check: (first, second, key) => (first[key] instanceof Object && second[key] instanceof Object)
      && !(first[key] instanceof Array && second[key] instanceof Array),
    process: (first, second, fun) => fun(first, second),
  },
  {
    type: 'not changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    process: first => _.identity(first),
  },
  {
    type: 'changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    process: (first, second) => ({ old: first, new: second }),
  },
  {
    type: 'deleted',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    process: first => _.identity(first),
  },
  {
    type: 'inserted',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    process: (first, second) => _.identity(second),
  },
];
const makeAst = (firstConfig = {}, secondConfig = {}) => {
  const configsKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));
  return configsKeys.map((key) => {
    const { type, process } = _.find(propertyActions, item => item.check(firstConfig, secondConfig, key));
    const value = process(firstConfig[key], secondConfig[key], makeAst);
    return { name: key, type, value };
  });
};
const selection = (val, func, space) => {
  if (val instanceof Array) return func(val, space + 2);
  else if (val instanceof Object) return func([val], space + 2);
  return val;
};
const render = (ast, space) => {
  const tab = ' '.repeat(space);
  const diff = ast.map((elem) => {
    if (elem.type === 'nested') return `${tab}  ${elem.name}: ${selection(elem.value, render, space)}`;
    else if (elem.type === 'inserted') return `${tab}+ ${elem.name}: ${selection(elem.value, render, space)}`;
    else if (elem.type === 'not changed') return `${tab}  ${elem.name}: ${selection(elem.value, render, space)}`;
    else if (elem.type === 'changed') return `${tab}- ${elem.name}: ${selection(elem.value.old, render, space)}\n${tab}+ ${elem.name}: ${selection(elem.value.new, render, space)}`;
    else if (elem.type === 'deleted') return `${tab}- ${elem.name}: ${selection(elem.value, render, space)}`;
    return `${tab}  ${Object.keys(elem)[0]}: ${elem[Object.keys(elem)[0]]}`;
  }).join('\n');
  return `{\n${diff}\n${' '.repeat(space - 2)}}`;
};
const gendiff = (path1, path2) => {
  const format1 = path.extname(path1);
  const format2 = path.extname(path2);
  const data1 = fs.readFileSync(path1, 'utf8');
  const data2 = fs.readFileSync(path2, 'utf8');
  const obj1 = parse(format1)(data1);
  const obj2 = parse(format2)(data2);
  const astDiff = makeAst(obj1, obj2);
  return render(astDiff, 2);
};
export default gendiff;

