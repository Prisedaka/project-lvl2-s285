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
    const value = process(firstConfig[key], secondConfig[key], getAst);
    return { name: key, type, value };
  });
};
// const makeAST = (data) => {
//   const [first, ...rest] = data;
//   const root = {
//     name: first,
//     value: '',
//     children: [],
//   };
//   return rest.reduce((acc, arg) => {
    
//   }, root);
// };
const gendiff = (path1, path2) => {
  const format1 = path.extname(path1);
  const format2 = path.extname(path2);
  const data1 = fs.readFileSync(path1, 'utf8');
  const data2 = fs.readFileSync(path2, 'utf8');
  const obj1 = parse(format1)(data1);
  const obj2 = parse(format2)(data2);
  console.log(makeAst(obj1, obj2));
  const unionArrKey = _.union(Object.keys(obj1), Object.keys(obj2));
  const diff = unionArrKey.map((elem) => {
    if (_.has(obj2, elem) && _.has(obj1, elem)) {
      if (obj1[elem] === obj2[elem]) return `    ${elem}: ${obj1[elem]}`;
      return `  + ${elem}: ${obj2[elem]}  - ${elem}: ${obj1[elem]}`;
    } else if (_.has(obj1, elem)) return `  - ${elem}: ${obj1[elem]}`;
    return `  + ${elem}: ${obj2[elem]}`;
  }).join('\n');
  return `{\n${diff}}`;
};
export default gendiff;

// const gendiff = (path1, path2) => {
//   const format1 = path.extname(path1);
//   const format2 = path.extname(path2);
//   const data1 = fs.readFileSync(path1, 'utf8');
//   const data2 = fs.readFileSync(path2, 'utf8');
//   const obj1 = parse(format1)(data1);
//   const obj2 = parse(format2)(data2);
//   const unionArrKey = _.union(Object.keys(obj1), Object.keys(obj2));
//   const diff = unionArrKey.map((elem) => {
//     if (_.has(obj2, elem) && _.has(obj1, elem)) {
//       if (obj1[elem] === obj2[elem]) return `    ${elem}: ${obj1[elem]}\n`;
//       return `  + ${elem}: ${obj2[elem]}\n  - ${elem}: ${obj1[elem]}\n`;
//     } else if (_.has(obj1, elem)) return `  - ${elem}: ${obj1[elem]}\n`;
//     return `  + ${elem}: ${obj2[elem]}\n`;
//   }).join('');
//   return `{\n${diff}}`;
// };
// export default gendiff;
