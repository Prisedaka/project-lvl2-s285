import _ from 'lodash';
import fs from 'fs';

const gendiff = (path1, path2) => {
  const obj1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const obj2 = JSON.parse(fs.readFileSync(path2, 'utf8'));
  const unionArrKey = _.union(Object.keys(obj1), Object.keys(obj2));
  const diff = unionArrKey.map((elem) => {
    let newElem = '';
    if (_.has(obj2, elem) && _.has(obj1, elem)) {
      if (obj1[elem] === obj2[elem]) newElem = `    ${elem}: ${obj1[elem]}\n`;
      else newElem = `  + ${elem}: ${obj2[elem]}\n  - ${elem}: ${obj1[elem]}\n`;
    } else if (_.has(obj1, elem)) newElem = `  - ${elem}: ${obj1[elem]}\n`;
    else if (_.has(obj2, elem)) newElem = `  + ${elem}: ${obj2[elem]}\n`;
    return newElem;
  }).join('');
  return `{\n${diff}}`;
};
export default gendiff;
