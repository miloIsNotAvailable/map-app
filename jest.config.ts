export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|js)x?$": "ts-jest"  
  },
  testMatch: [
    '<rootDir>/src/tests/__test__/*.test.js',
    '<rootDir>/src/tests/__test__/*.test.tsx',
  ],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/tests/mocks/fileMocks.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
}