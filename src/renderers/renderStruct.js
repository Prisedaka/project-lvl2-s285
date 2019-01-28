const transformObjToString = (value, numInd) => {
  const indentionInObj = '  '.repeat(numInd + 2);
  if (!(value instanceof Object) || (value instanceof Array)) return value;
  const objToString = Object.keys(value).reduce((acc, elem) => {
    return `${acc}${indentionInObj}  ${elem}: ${value[elem]}\n`;
  }, '');
  return `{\n${objToString}${'  '.repeat(numInd + 1)}}`;
};

export default (ast) => {
  const iter = (tree, numOfIndention) => {
    const indention = '  '.repeat(numOfIndention);
    const diff = tree.map((elem) => {
      switch (elem.type) {
        case 'nested':
          return `${indention}  ${elem.name}: ${iter(elem.children, numOfIndention + 2)}`;
        case 'include':
          return `${indention}+ ${elem.name}: ${transformObjToString(elem.newValue, numOfIndention)}`;
        case 'same':
          return `${indention}  ${elem.name}: ${transformObjToString(elem.oldValue, numOfIndention)}`;
        case 'edit':
          return `${indention}- ${elem.name}: ${transformObjToString(elem.oldValue, numOfIndention)}\n${indention}+ ${elem.name}: ${transformObjToString(elem.newValue, numOfIndention)}`;
        case 'delete':
          return `${indention}- ${elem.name}: ${transformObjToString(elem.oldValue, numOfIndention)}`;
        default:
          throw new Error(`unknown type of argument of AST: ${elem.type}`);
      }
    }).join('\n');
    return `{\n${diff}\n${'  '.repeat(numOfIndention - 1)}}`;
  };
  return iter(ast, 1);
};
