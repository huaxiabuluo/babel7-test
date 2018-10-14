const { transformFileSync } = require('babel-core');
const { join } = require('path');
const { readdirSync, readFileSync } = require('fs');
const plugin = require('../simple-import');

describe('Plugin Test', () => {

  const fixturesDir = join(__dirname, 'fixtures');
  let fixtures = readdirSync(fixturesDir);

  fixtures.map(caseName => {
    const fixtureDir = join(fixturesDir, caseName);
    const actualFile = join(fixtureDir, 'actual.js');
    const expectedFile = join(fixtureDir, 'expected.js');

    test(`should work with ${caseName}`, () => {

      const actual = transformFileSync(actualFile, {
        babelrc: false,
        plugins: [
          [plugin, { libName: 'dianping' }],
        ],
      }).code;

      const expected = readFileSync(expectedFile, 'utf-8');
      expect(actual.replace(/\n/g, ' ').replace(/\s{2,}/g, ' '))
        .toEqual(expected.replace(/\n/g, ' ').replace(/\s{2,}/g, ' '));
    });
  });

});
