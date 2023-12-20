// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  moduleNameMapper: {
    // Add any necessary module name mappings for non-JS modules here
    // For example, if you have a CSS file: '\\.css$': '<rootDir>/path/to/styleMock.js'
  },
};
