import fs from 'fs';
import genDiff from '../src/';

test('differences', () => {
  const pathToFile1 = './__tests__/__fixtures__/before.json';
  const pathToFile2 = './__tests__/__fixtures__/after.json';
  const pathToResult = './__tests__/__fixtures__/result.json';
  const expected = fs.readFileSync(pathToResult, 'utf8');
  const diff = genDiff(pathToFile1, pathToFile2);
  expect(diff).toBe(expected);
});
