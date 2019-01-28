import fs from 'fs';
import genDiff from '../src/';

// для тестирования запуска приложения
// /home/prisedaka/Projects/project-lvl2-s285/dist/bin/gendiff.js /home/prisedaka/Projects/project-lvl2-s285/__tests__/__fixtures__/beforeAST.json /home/prisedaka/Projects/project-lvl2-s285/__tests__/__fixtures__/afterAST.json
// test('differences of plain JSON', () => {
//   const pathToFile1 = './__tests__/__fixtures__/before.json';
//   const pathToFile2 = './__tests__/__fixtures__/after.json';
//   const pathToResult = './__tests__/__fixtures__/result';
//   const expected = fs.readFileSync(pathToResult, 'utf8');
//   const diff = genDiff(pathToFile1, pathToFile2);
//   expect(diff).toBe(expected);
// });
// test('differences of plain YAML', () => {
//   const pathToFile1 = './__tests__/__fixtures__/before.yml';
//   const pathToFile2 = './__tests__/__fixtures__/after.yml';
//   const pathToResult = './__tests__/__fixtures__/result';
//   const expected = fs.readFileSync(pathToResult, 'utf8');
//   const diff = genDiff(pathToFile1, pathToFile2);
//   expect(diff).toBe(expected);
// });
// test('differences of plain INI', () => {
//   const pathToFile1 = './__tests__/__fixtures__/before.ini';
//   const pathToFile2 = './__tests__/__fixtures__/after.ini';
//   const pathToResult = './__tests__/__fixtures__/result';
//   const expected = fs.readFileSync(pathToResult, 'utf8');
//   const diff = genDiff(pathToFile1, pathToFile2);
//   expect(diff).toBe(expected);
// });

// default
test('differences: structure form - JSON file', () => {
  const pathToFile1 = './__tests__/__fixtures__/beforeAST.json';
  const pathToFile2 = './__tests__/__fixtures__/afterAST.json';
  const pathToResult = './__tests__/__fixtures__/resultAST';
  const expected = fs.readFileSync(pathToResult, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2, 'struct');
  expect(diff).toBe(expected);
});

test('differences: structure form - YML file', () => {
  const pathToFile1 = './__tests__/__fixtures__/beforeAST.yml';
  const pathToFile2 = './__tests__/__fixtures__/afterAST.yml';
  const pathToResult = './__tests__/__fixtures__/resultAST';
  const expected = fs.readFileSync(pathToResult, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2, 'struct');
  expect(diff).toBe(expected);
});
test('differences: structure form - INI file', () => {
  const pathToFile1 = './__tests__/__fixtures__/beforeAST.ini';
  const pathToFile2 = './__tests__/__fixtures__/afterAST.ini';
  const pathToResult = './__tests__/__fixtures__/resultAST';
  const expected = fs.readFileSync(pathToResult, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2, 'struct');
  expect(diff).toBe(expected);
});

// plain
test('differences: plainForm - JSON file', () => {
  const pathToFile1 = './__tests__/__fixtures__/beforeAST.json';
  const pathToFile2 = './__tests__/__fixtures__/afterAST.json';
  const pathToResult = './__tests__/__fixtures__/resultPlainAST';
  const expected = fs.readFileSync(pathToResult, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2, 'plain');
  expect(diff).toBe(expected);
});

test('differences: plainForm - YML file', () => {
  const pathToFile1 = './__tests__/__fixtures__/beforeAST.yml';
  const pathToFile2 = './__tests__/__fixtures__/afterAST.yml';
  const pathToResult = './__tests__/__fixtures__/resultPlainAST';
  const expected = fs.readFileSync(pathToResult, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2, 'plain');
  expect(diff).toBe(expected);
});
test('differences: plainForm - INI file', () => {
  const pathToFile1 = './__tests__/__fixtures__/beforeAST.ini';
  const pathToFile2 = './__tests__/__fixtures__/afterAST.ini';
  const pathToResult = './__tests__/__fixtures__/resultPlainAST';
  const expected = fs.readFileSync(pathToResult, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2, 'plain');
  expect(diff).toBe(expected);
});

// json
test('differences: jsonForm - JSON file', () => {
  const pathToFile1 = './__tests__/__fixtures__/beforeAST.json';
  const pathToFile2 = './__tests__/__fixtures__/afterAST.json';
  const pathToResult = './__tests__/__fixtures__/resultJsonAST.json';
  const expected = fs.readFileSync(pathToResult, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2, 'json');
  expect(diff).toBe(expected);
});
test('differences: jsonForm - YML file', () => {
  const pathToFile1 = './__tests__/__fixtures__/beforeAST.yml';
  const pathToFile2 = './__tests__/__fixtures__/afterAST.yml';
  const pathToResult = './__tests__/__fixtures__/resultJsonAST.json';
  const expected = fs.readFileSync(pathToResult, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2, 'json');
  expect(diff).toBe(expected);
});
test('differences: jsonForm - INI file', () => {
  const pathToFile1 = './__tests__/__fixtures__/beforeAST.ini';
  const pathToFile2 = './__tests__/__fixtures__/afterAST.ini';
  const pathToResult = './__tests__/__fixtures__/resultJsonAST.json';
  const expected = fs.readFileSync(pathToResult, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2, 'json');
  expect(diff).toBe(expected);
});

