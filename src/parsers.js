import { safeLoad } from 'js-yaml';
import ini from 'ini';

export default format => (data) => {
  const parsers = {
    '.json': JSON.parse,
    '.yaml': safeLoad,
    '.yml': safeLoad,
    '.ini': ini.parse,
  };
  const parsed = parsers[format];
  if (!parsed) {
    throw new Error(`unknown input format: ${format}`);
  }
  return parsed(data);
};
