import fs from 'fs';
import genDiff from '../src/';

const pathToFile1 = './__tests__/__fixtures__/after.json';
const pathToFile2 = './__tests__/__fixtures__/before.json';
const pathToResult = './__tests__/__fixtures__/result.json';

const diff = genDiff(pathToFile1, pathToFile2);
const expected = fs.readFileSync(pathToResult, 'utf8');
test('differences', () => {
  expect(diff).toBe(JSON.parse(expected));
});
