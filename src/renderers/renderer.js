import renderStruct from './renderStruct';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const getRenderer = format => (data) => {
  const renderers = {
    struct: renderStruct(data, 2),
    plain: renderPlain(data, ''),
    json: renderJson(data, 2),
  };
  const rendered = renderers[format];
  if (!rendered) {
    throw new Error(`unknown output format: ${format}`);
  }
  return rendered;
};
export default getRenderer;
