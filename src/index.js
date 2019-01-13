import fs from 'fs';
import _ from 'lodash';
import parse from './parsers';

/*
1 считать данные из двух файлов
2 преобразовать их в объекты
3 объединить их через union - получить массив уникальных ключей
4 пройти мапом по массиву юнион, определив, что произошло с ключом в файле до и после
5 на выходе получить результирующую строку
*/

export default (path1, path2) => {
  const objectFromFile1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const objectFromFile2 = JSON.parse(fs.readFileSync(path2, 'utf8'));
  const unionArray = _.union(Object.keys(objectFromFile1), Object.keys(objectFromFile2));
  const result = unionArray.map((elem) => {
    if (_.has(objectFromFile1, elem) && _.has(objectFromFile2, elem)
    && objectFromFile1[elem] === objectFromFile2[elem]) return `    ${elem}: ${objectFromFile1[elem]}`;
    if (_.has(objectFromFile1, elem) && _.has(objectFromFile2, elem)
    && objectFromFile1[elem] !== objectFromFile2[elem]) return `  + ${elem}: ${objectFromFile2[elem]}\n  - ${elem}: ${objectFromFile1[elem]}`;
    if (_.has(objectFromFile1, elem)) return `  - ${elem}: ${objectFromFile1[elem]}`;
    return `  + ${elem}: ${objectFromFile2[elem]}`;
  });
  return `{\n${result.join('\n')}\n}`;
};
