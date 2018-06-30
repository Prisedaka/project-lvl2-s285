import fs from 'fs';
import genDiff from '../src/';

test('differences json', () => {
  const pathToFile1 = './__tests__/__fixtures__/beforeAST.json';
  const pathToFile2 = './__tests__/__fixtures__/afterAST.json';
  const pathToResult = './__tests__/__fixtures__/resultAST';
  const expected = fs.readFileSync(pathToResult, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2);
  expect(diff).toBe(expected);
});
test('differences yml', () => {
  const pathToFile1 = './__tests__/__fixtures__/beforeAST.yml';
  const pathToFile2 = './__tests__/__fixtures__/afterAST.yml';
  const pathToResult = './__tests__/__fixtures__/resultAST';
  const expected = fs.readFileSync(pathToResult, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2);
  expect(diff).toBe(expected);
});
test('differences ini', () => {
  const pathToFile1 = './__tests__/__fixtures__/beforeAST.ini';
  const pathToFile2 = './__tests__/__fixtures__/afterAST.ini';
  const pathToResult = './__tests__/__fixtures__/resultAST';
  const expected = fs.readFileSync(pathToResult, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2);
  expect(diff).toBe(expected);
});
