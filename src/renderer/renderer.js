import renderDefault from './renderDefault';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const getRenderer = format => (data) => {
  const renderers = {
    undefined: renderDefault(data, 2),
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
