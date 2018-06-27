import fs from 'fs';
import genDiff from '../src/';

test('differences json', () => {
  const pathToFile1 = './__tests__/__fixtures__/before.json';
  const pathToFile2 = './__tests__/__fixtures__/after.json';
  const pathToResult = './__tests__/__fixtures__/result';
  const expected = fs.readFileSync(pathToResult, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2);
  expect(diff).toBe(expected);
});
test('differences yml', () => {
  const pathToFile1 = './__tests__/__fixtures__/before.yml';
  const pathToFile2 = './__tests__/__fixtures__/after.yml';
  const pathToResult = './__tests__/__fixtures__/result';
  const expected = fs.readFileSync(pathToResult, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2);
  expect(diff).toBe(expected);
});
test('differences ini', () => {
  const pathToFile1 = './__tests__/__fixtures__/before.ini';
  const pathToFile2 = './__tests__/__fixtures__/after.ini';
  const pathToResult = './__tests__/__fixtures__/result';
  const expected = fs.readFileSync(pathToResult, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2);
  expect(diff).toBe(expected);
});
