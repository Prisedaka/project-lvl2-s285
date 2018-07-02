const selection = (val, func, space, type) => {
  if (val instanceof Array) return func(val, space + 2);
  else if (val instanceof Object) return func([val], space + 2);
  //else if (type === 'nested')
  return val;
};
const renderStruct = (ast, space) => {
  const tab = ' '.repeat(space);
  const diff = ast.map((elem) => {
    switch (elem.type) {
      case 'nested':
        return `${tab}  ${elem.name}: ${selection(elem.children, renderStruct, space, elem.type)}`;
      case 'inserted':
        return `${tab}+ ${elem.name}: ${selection(elem.value, renderStruct, space)}`;
      case 'not changed':
        return `${tab}  ${elem.name}: ${selection(elem.value, renderStruct, space)}`;
      case 'changed':
        return `${tab}- ${elem.name}: ${selection(elem.value.old, renderStruct, space)}\n${tab}+ ${elem.name}: ${selection(elem.value.new, renderStruct, space)}`;
      case 'deleted':
        return `${tab}- ${elem.name}: ${selection(elem.value, renderStruct, space)}`;
      default:
        //return '';
        return `${tab}  ${Object.keys(elem)[0]}: ${elem[Object.keys(elem)[0]]}`;
    }
  }).join('\n');
  return `{\n${diff}\n${' '.repeat(space - 2)}}`;
};

export default renderStruct;
