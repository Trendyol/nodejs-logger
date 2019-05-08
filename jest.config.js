module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['src/index.ts', 'src/types'],
  testPathIgnorePatterns: [],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  setupFiles: ['<rootDir>/jestSetup.js']
};
