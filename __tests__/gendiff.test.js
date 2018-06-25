import genDiff from '../src/bin/gendiff';

const pathToFile1 = 'after.json';
const pathToFile2 = 'before.json';

const diff = genDiff(pathToFile1, pathToFile2);
const expected = '{host: hexlet.io + timeout: 20 - timeout: 50 - proxy: 123.234.53.22 + verbose: true - follow: false}';
test('differences', () => {
  expect(diff).toBe(expected);
});
