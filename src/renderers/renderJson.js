export default ast => JSON.stringify(ast, (k, v) => {
  if (typeof v === 'number') return v.toString();
  return v;
}, '  ');
