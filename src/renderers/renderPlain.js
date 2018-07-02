const selectValue = (val) => {
  if (val instanceof Object) return ' complex value';
  return ` value '${val}'`;
};
const renderPlain = (ast, pathCategory) => {
  const diff = ast.map((elem) => {
    const fullPathCategory = `${pathCategory}${pathCategory === '' ? '' : '.'}${elem.name}`;
    switch (elem.type) {
      case 'nested':
        return renderPlain(elem.children, fullPathCategory);
      case 'inserted':
        return `Property '${fullPathCategory}' was added with${selectValue(elem.value)}\n`;
      case 'not changed':
        return '';
      case 'changed':
        return `Property '${fullPathCategory}' was updated. From${selectValue(elem.value.old)} to${selectValue(elem.value.new)}\n`;
      case 'deleted':
        return `Property '${fullPathCategory}' was removed\n`;
      default:
        return '';
    }
  }).join('');
  return diff;
};
export default renderPlain;
