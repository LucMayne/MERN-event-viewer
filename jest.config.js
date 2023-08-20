let fetch;
import('node-fetch').then(module => {
  fetch = module.default;
});

const config = {
  clearMocks: true,
  transform: {
    '\\.css$': '<rootDir>/cssTransform.js',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
};

module.exports = config;
