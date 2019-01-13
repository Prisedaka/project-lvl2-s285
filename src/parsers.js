import _ from 'lodash';

/*
1 определить формат файла по его расширению
2 вызвать нужный парсер
*/
const parsers = {
  json: 'json.parse',
  yml: 'yaml.safeload',
};
export default (path) => {
  const format = _.path.extname(path);

};
