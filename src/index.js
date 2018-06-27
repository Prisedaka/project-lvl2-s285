import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { safeLoad } from 'js-yaml';
import { parse } from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
  '.yml': safeLoad,
  '.ini': parse,
};
const gendiff = (path1, path2) => {
  const format1 = path.extname(path1);
  const format2 = path.extname(path2);
  const parse1 = parsers[format1];
  if (!parse1) {
    throw new Error(`unknown format: ${format1}`);
  }
  const parse2 = parsers[format2];
  if (!parse2) {
    throw new Error(`unknown format: ${format2}`);
  }
  const obj1 = parse1(fs.readFileSync(path1, 'utf8'));
  const obj2 = parse2(fs.readFileSync(path2, 'utf8'));
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
