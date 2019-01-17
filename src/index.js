// import fs from 'fs';
import _ from 'lodash';
import parsed from './parsers';

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

const propertyActions = [{
    // two objects
    type: 'nested',
    check: process:
  },
  {
    type: 'delete',
    check: process:
  },
  {
    type: 'include',
    check: process:
  },
  // different types of elements
  {
    type: 'same',
    check: process:
  },
];

const getPropertyAction = arg => find(propertyActions, ({
  check
}) => check(arg));

const makeAST = (data1, data2) => {
  const unionArray = _.union(Object.keys(data1), Object.keys(data2));
  const root = {
    name: '',
    type: '',
    oldValue: '',
    newValue: '',
    children: [],
  }
  return unionArray.reduce((acc, arg) => {

  }, root);
};

export default (path1, path2) => {
  const objectFromFile1 = parsed(path1);
  const objectFromFile2 = parsed(path2);
  return makeAST(objectFromFile1, objectFromFile2);
}