import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

/*
1 определить формат файла по его расширению
2 вызвать нужный парсер
*/
const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};
export default (pathToFile) => {
  const extension = path.extname(pathToFile);
  if (!parsers[extension]) throw new Error(`unknown input format: ${extension}`);
  const data = fs.readFileSync(pathToFile, 'utf8');
  const parsed = parsers[extension];
  return parsed(data);
};
