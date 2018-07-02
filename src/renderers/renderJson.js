// const selection = (val, func, space) => {
//   if (val instanceof Array) return `${func(val, space + 2)}`;
//   else if (val instanceof Object) return `${func([val], space + 2)}`;
//   return `"${val}"`;
// };
const renderJson = (ast) => {
  // const tab = ' '.repeat(space);
  // const diff = ast.map((elem) => {
  //   switch (elem.type) {
  //     case 'nested':
  //       return `${tab}"  ${elem.name}": ${selection(elem.children, renderJson, space)}`;
  //     case 'inserted':
  //       return `${tab}"+ ${elem.name}": ${selection(elem.value, renderJson, space)}`;
  //     case 'not changed':
  //       return `${tab}"  ${elem.name}": ${selection(elem.value, renderJson, space)}`;
  //     case 'changed':
  //       return `${tab}"- ${elem.name}": ${selection(elem.value.old, renderJson, space)},\n${tab}"+ ${elem.name}": ${selection(elem.value.new, renderJson, space)}`;
  //     case 'deleted':
  //       return `${tab}"- ${elem.name}": ${selection(elem.value, renderJson, space)}`;
  //     default:
  //       return `${tab}"  ${Object.keys(elem)[0]}": "${elem[Object.keys(elem)[0]]}"`;
  //   }
  // }).join(',\n');
  // return `{\n${diff}\n${' '.repeat(space - 2)}}`;
  return JSON.stringify(ast, null, ' ');
};

export default renderJson;
