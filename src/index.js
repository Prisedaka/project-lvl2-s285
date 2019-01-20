// import fs from 'fs';
import _ from 'lodash';
import parse from './parsers';

/*
1 считать данные из двух файлов
2 преобразовать их в объекты
3 объединить их через union - получить массив уникальных ключей
4 пройти мапом по массиву юнион, определив, что произошло с ключом в файле до и после
5 на выходе получить результирующую строку
*/

// export default (path1, path2) => {
//   const objectFromFile1 = parsed(path1);
//   const objectFromFile2 = parsed(path2);
//   const unionArray = _.union(Object.keys(objectFromFile1), Object.keys(objectFromFile2));
//   const result = unionArray.map((elem) => {
//     if (_.has(objectFromFile1, elem) && _.has(objectFromFile2, elem) &&
//       objectFromFile1[elem] === objectFromFile2[elem]) return `    ${elem}: ${objectFromFile1[elem]}`;
//     if (_.has(objectFromFile1, elem) && _.has(objectFromFile2, elem) &&
//       objectFromFile1[elem] !== objectFromFile2[elem]) return `  + ${elem}: ${objectFromFile2[elem]}\n  - ${elem}: ${objectFromFile1[elem]}`;
//     if (_.has(objectFromFile1, elem)) return `  - ${elem}: ${objectFromFile1[elem]}`;
//     return `  + ${elem}: ${objectFromFile2[elem]}`;
//   });
//   return `{\n${result.join('\n')}\n}`;
// };

const propertyActions = [
  {
    type: 'nested',
    check: (arg, obj1, obj2) => _.has(obj1, arg) &&
      _.has(obj2, arg) &&
      obj1[arg] instanceof Object &&
      obj2[arg] instanceof Object &&
      !(obj1[arg] instanceof Array) &&
      !(obj2[arg] instanceof Array),
    process: (arg, obj1, obj2, func) => ({ oldValue: obj1[arg], newValue: obj2[arg] }),
  },
  {
    type: 'edit',
    check: (arg, obj1, obj2) => _.has(obj1, arg) && _.has(obj2, arg) && obj1[arg] !== obj2[arg],
    process: (arg, obj1, obj2) => ({ oldValue: obj1[arg], newValue: obj2[arg] }),
  },
  {
    type: 'delete',
    check: (arg, obj1, obj2) => _.has(obj1, arg) && !_.has(obj2, arg),
    process: (arg, obj1, obj2) => ({ oldValue: obj1[arg], newValue: obj2[arg] }),
  },
  {
    type: 'include',
    check: (arg, obj1, obj2) => !_.has(obj1, arg) && _.has(obj2, arg),
    process: (arg, obj1, obj2) => ({ oldValue: obj1[arg], newValue: obj2[arg] }),
  },
  {
    type: 'same',
    check: (arg, obj1, obj2) => _.has(obj1, arg) && _.has(obj2, arg) && obj1[arg] === obj2[arg],
    process: (arg, obj1, obj2) => ({ oldValue: obj1[arg], newValue: obj2[arg] }),
  },
];

const getPropertyAction = (arg, obj1, obj2) => _.find(propertyActions, ({
  check,
}) => check(arg, obj1, obj2));

const makeAST = (data1, data2) => {
  const keysObject1 = Object.keys(data1);
  const keysObject2 = Object.keys(data2);
  const unionArray = _.union(keysObject1, keysObject2);
  // const root = {
  //   name: '',
  //   type: '',
  //   oldValue: '',
  //   newValue: '',
  //   children: [],
  // };
  return unionArray.map((arg) => {
    const {
      type,
      process,
    } = getPropertyAction(arg, data1, data2);
    return { name: arg, type, ...process(arg, data1, data2, makeAST) };
  });
};

export default (path1, path2) => {
  const objectFromFile1 = parse(path1);
  const objectFromFile2 = parse(path2);
  return makeAST(objectFromFile1, objectFromFile2);
};
