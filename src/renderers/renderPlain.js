const selectValue = (val) => {
  if (val instanceof Object) return ' complex value';
  return ` value '${val}'`;
};
const renderToPlainFormat = (ast) => {
  const iter = (tree, path) => tree.map((elem) => {
    const fullPathCategory = `${path ? `${path}.` : ''}${elem.name}`;
    switch (elem.type) {
      case 'nested':
        return iter(elem.children, fullPathCategory);
      case 'include':
        return `Property '${fullPathCategory}' was added with${selectValue(elem.newValue)}\n`;
      case 'same':
        return '';
      case 'edit':
        return `Property '${fullPathCategory}' was updated. From${selectValue(elem.oldValue)} to${selectValue(elem.newValue)}\n`;
      case 'delete':
        return `Property '${fullPathCategory}' was removed\n`;
      default:
        return '';
    }
  }).join('');
  return iter(ast);
};
export default renderToPlainFormat;