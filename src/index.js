import _ from 'lodash';
import fs from 'fs';

const gendiff = (path1, path2) => {
  const obj1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const obj2 = JSON.parse(fs.readFileSync(path2, 'utf8'));
  const diffObj = Object.keys(obj1).reduce((acc, elem) => {
    if (_.has(obj2, elem)) {
      acc[`+ ${elem}`] = obj1[elem];
    }
    return acc;
  }, {});
  //return JSON.stringify(diffObj);
  return diffObj;
};
export default gendiff;
