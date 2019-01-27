// const selection = (val, children, func, numOfIndention) => {
//   if (children.length > 0) return func(children, numOfIndention + 1);
//   //else if (val instanceof Array) return func(val, numOfIndention + 2);
//   else if (val instanceof Object) return JSON.stringify(val, null, ' ');
//   //else if (type === 'nested')
//   return val;
// };

const transformObjToString = (value, ind) => {
  if (value instanceof Object) return `  ${JSON.stringify(value, null, ind).replace(/\"/g, '')}`;
  return value;
};

const renderToStructFormat = (ast) => {
  const iter = (tree, numOfIndention) => {
    const indention = '  '.repeat(numOfIndention);
    const diff = tree.map((elem) => {
      switch (elem.type) {
        case 'nested':
          return `${indention}  ${elem.name}: ${iter(elem.children, numOfIndention + 2)}`;
        case 'include':
          return `${indention}+ ${elem.name}: ${transformObjToString(elem.newValue, indention)}`;
        case 'same':
          return `${indention}  ${elem.name}: ${transformObjToString(elem.oldValue, indention)}`;
        case 'edit':
          return `${indention}- ${elem.name}: ${transformObjToString(elem.oldValue, indention)}\n${indention}+ ${elem.name}: ${transformObjToString(elem.newValue, indention)}`;
        case 'delete':
          return `${indention}- ${elem.name}: ${transformObjToString(elem.oldValue, indention)}`;
        default:
          return null;
      }
    }).join('\n');
    return `{\n${diff}\n${'  '.repeat(numOfIndention + 2)}}`;
  };
  return iter(ast, 1);
};
export default renderToStructFormat;