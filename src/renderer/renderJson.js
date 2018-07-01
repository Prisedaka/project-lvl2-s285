const selection = (val, func, space) => {
  if (val instanceof Array) return `${func(val, space + 2)}`;
  else if (val instanceof Object) return `${func([val], space + 2)}`;
  return `"${val}"`;
};
const renderJson = (ast, space) => {
  const tab = ' '.repeat(space);
  const diff = ast.map((elem) => {
    switch (elem.type) {
      case 'nested':
        return `${tab}"  ${elem.name}": ${selection(elem.children, renderJson, space)}`;
        break;
      case 'inserted':
        return `${tab}"+ ${elem.name}": ${selection(elem.value, renderJson, space)}`;
        break;
      case 'not changed':
        return `${tab}"  ${elem.name}": ${selection(elem.value, renderJson, space)}`;
        break;
      case 'changed':
        return `${tab}"- ${elem.name}": ${selection(elem.value.old, renderJson, space)},\n${tab}"+ ${elem.name}": ${selection(elem.value.new, renderJson, space)}`;
        break;
      case 'deleted':
        return `${tab}"- ${elem.name}": ${selection(elem.value, renderJson, space)}`;
        break;
      default:
        return `${tab}"  ${Object.keys(elem)[0]}": "${elem[Object.keys(elem)[0]]}"`;
    }
  }).join(',\n');
  return `{\n${diff}\n${' '.repeat(space - 2)}}`;
};

export default renderJson;
