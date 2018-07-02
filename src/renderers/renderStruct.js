const selection = (val, children, func, space) => {
  if (children.length > 0) return func(children, space + 2);
  //else if (val instanceof Array) return func(val, space + 2);
  else if (val instanceof Object) return JSON.stringify(val, null, ' ');
  //else if (type === 'nested')
  return val;
};
const renderStruct = (ast, space) => {
  const tab = ' '.repeat(space);
  const diff = ast.map((elem) => {
    switch (elem.type) {
      case 'nested':
        return `${tab}  ${elem.name}: ${selection(elem.value, elem.children, renderStruct, space)}`;
      case 'inserted':
        return `${tab}+ ${elem.name}: ${selection(elem.value, elem.children, renderStruct, space)}`;
      case 'not changed':
        return `${tab}  ${elem.name}: ${selection(elem.value, elem.children, renderStruct, space)}`;
      case 'changed':
        return `${tab}- ${elem.name}: ${selection(elem.value.old, elem.children, renderStruct, space)}\n${tab}+ ${elem.name}: ${selection(elem.value.new, elem.children, renderStruct, space)}`;
      case 'deleted':
        return `${tab}- ${elem.name}: ${selection(elem.value, elem.children, renderStruct, space)}`;
      default:
        return null;
        //return `${tab}  ${Object.keys(elem)[0]}: ${elem[Object.keys(elem)[0]]}`;
    }
  }).join('\n');
  return `{\n${diff}\n${' '.repeat(space - 2)}}`;
};

export default renderStruct;
