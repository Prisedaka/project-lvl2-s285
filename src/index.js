import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const gendiff = (path1, path2) => {
  const format1 = path.extname(path1);
  const format2 = path.extname(path2);
  const data1 = fs.readFileSync(path1, 'utf8');
  const data2 = fs.readFileSync(path2, 'utf8');
  const obj1 = parse(format1)(data1);
  const obj2 = parse(format2)(data2);
  const unionArrKey = _.union(Object.keys(obj1), Object.keys(obj2));
  const diff = unionArrKey.map((elem) => {
    if (_.has(obj2, elem) && _.has(obj1, elem)) {
      if (obj1[elem] === obj2[elem]) return `    ${elem}: ${obj1[elem]}\n`;
      return `  + ${elem}: ${obj2[elem]}\n  - ${elem}: ${obj1[elem]}\n`;
    } else if (_.has(obj1, elem)) return `  - ${elem}: ${obj1[elem]}\n`;
    return `  + ${elem}: ${obj2[elem]}\n`;
  }).join('');
  return `{\n${diff}}`;
};
export default gendiff;
