// import fs from 'fs';
import _ from 'lodash';
import getParser from './parsers';
import getRenderer from './renderers/renderer';

/*
1 считать данные из двух файлов
2 преобразовать их в объекты
3 объединить их через union - получить массив уникальных ключей
4 пройти мапом по массиву юнион, определив, что произошло с ключом в файле до и после
5 на выходе получить результирующую строку
*/
const propertyActions = [
  {
    type: 'nested',
    check: (arg, obj1, obj2) => _.has(obj1, arg) &&
      _.has(obj2, arg) &&
      obj1[arg] instanceof Object &&
      obj2[arg] instanceof Object &&
      !(obj1[arg] instanceof Array) &&
      !(obj2[arg] instanceof Array),
    process: (arg, obj1, obj2, func) => ({ children: func(obj1[arg], obj2[arg]) }),
  },
  {
    type: 'edit',
    check: (arg, obj1, obj2) => _.has(obj1, arg) && _.has(obj2, arg) && obj1[arg] !== obj2[arg],
    process: (arg, obj1, obj2) => ({ oldValue: obj1[arg], newValue: obj2[arg] }),
  },
  {
    type: 'delete',
    check: (arg, obj1, obj2) => _.has(obj1, arg) && !_.has(obj2, arg),
    process: (arg, obj1, obj2) => ({ oldValue: obj1[arg] }),
  },
  {
    type: 'include',
    check: (arg, obj1, obj2) => !_.has(obj1, arg) && _.has(obj2, arg),
    process: (arg, obj1, obj2) => ({ newValue: obj2[arg] }),
  },
  {
    type: 'same',
    check: (arg, obj1, obj2) => _.has(obj1, arg) && _.has(obj2, arg) && obj1[arg] === obj2[arg],
    process: (arg, obj1, obj2) => ({ oldValue: obj1[arg] }),
  },
];

const getPropertyAction = (arg, obj1, obj2) => _.find(propertyActions, ({
  check,
}) => check(arg, obj1, obj2));

const makeAST = (data1, data2) => {
  const keysObject1 = Object.keys(data1);
  const keysObject2 = Object.keys(data2);
  const unionArray = _.union(keysObject1, keysObject2);
  return unionArray.map((arg) => {
    const {
      type,
      process,
    } = getPropertyAction(arg, data1, data2);
    return { name: arg, type, ...process(arg, data1, data2, makeAST) };
  });
};

export default (path1, path2, outputFormat) => {
  const objectFromFile1 = getParser(path1);
  const objectFromFile2 = getParser(path2);
  const ast = makeAST(objectFromFile1, objectFromFile2);
  return getRenderer(outputFormat)(ast);
};
