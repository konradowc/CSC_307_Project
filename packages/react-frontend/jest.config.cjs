/*export default {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
  };*/

module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  setupFiles: ["<rootDir>/jest.env.setup.js"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$":
      "<rootDir>/__mocks__/fileMock.cjs",
    "\\.(css|scss|sass)$": "identity-obj-proxy"
  }
};
