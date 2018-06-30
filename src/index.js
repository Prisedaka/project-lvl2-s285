import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';

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
  const ast = configsKeys.map((key) => {
    const { type, process } = _.find(propertyActions, item => item.check(firstConfig, secondConfig, key));
    const children = (type === 'nested') ? process(firstConfig[key], secondConfig[key], makeAst) : [];
    const value = (type === 'nested') ? '' : process(firstConfig[key], secondConfig[key]);
    return {
      name: key, type, value, children,
    };
  });
  return ast;
};
const selection = (val, func, space) => {
  if (val instanceof Array) return func(val, space + 2);
  else if (val instanceof Object) return func([val], space + 2);
  return val;
};
const renderDefault = (ast, space) => {
  const tab = ' '.repeat(space);
  const diff = ast.map((elem) => {
    switch (elem.type) {
      case 'nested':
        return `${tab}  ${elem.name}: ${selection(elem.children, renderDefault, space)}`;
        break;
      case 'inserted':
        return `${tab}+ ${elem.name}: ${selection(elem.value, renderDefault, space)}`;
        break;
      case 'not changed':
        return `${tab}  ${elem.name}: ${selection(elem.value, renderDefault, space)}`;
        break;
      case 'changed':
        return `${tab}- ${elem.name}: ${selection(elem.value.old, renderDefault, space)}\n${tab}+ ${elem.name}: ${selection(elem.value.new, renderDefault, space)}`;
        break;
      case 'deleted':
        return `${tab}- ${elem.name}: ${selection(elem.value, renderDefault, space)}`;
        break;
      default:
        return `${tab}  ${Object.keys(elem)[0]}: ${elem[Object.keys(elem)[0]]}`;
    }
  });
  return `{\n${diff.join('\n')}\n${' '.repeat(space - 2)}}`;
};
const selectValue = (val) => {
  if (val instanceof Object) return ' complex value';
  return ` value '${val}'`;
};
const renderPlain = (ast, pathCategory) => {
  const diff = ast.map((elem) => {
    const fullPathCategory = `${pathCategory}${pathCategory === '' ? '' : '.'}${elem.name}`;
    switch (elem.type) {
      case 'nested':
        return renderPlain(elem.children, fullPathCategory);
        break;
      case 'inserted':
        return `Property '${fullPathCategory}' was added with${selectValue(elem.value)}\n`;
        break;
      case 'not changed':
        return '';
        break;
      case 'changed':
        return `Property '${fullPathCategory}' was updated. From${selectValue(elem.value.old)} to${selectValue(elem.value.new)}\n`;
      case 'deleted':
        return `Property '${fullPathCategory}' was removed\n`;
        break;
      default:
        return '';
    }
  }).join('');
  return diff;
};
const gendiff = (path1, path2, format) => {
  const format1 = path.extname(path1);
  const format2 = path.extname(path2);
  const data1 = fs.readFileSync(path1, 'utf8');
  const data2 = fs.readFileSync(path2, 'utf8');
  const obj1 = getParser(format1)(data1);
  const obj2 = getParser(format2)(data2);
  const astDiff = makeAst(obj1, obj2);
  if (format === 'plain') return renderPlain(astDiff, '');
  return renderDefault(astDiff, 2);
};
export default gendiff;

