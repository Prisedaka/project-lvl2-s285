import renderStruct from './renderStruct';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const getRenderer = format => (data) => {
  const renderers = {
    struct: renderStruct(data),
    plain: renderPlain(data),
    json: renderJson(data),
  };
  const rendered = renderers[format];
  if (!rendered) {
    throw new Error(`unknown output format: ${format}`);
  }
  return rendered;
};
export default getRenderer;
