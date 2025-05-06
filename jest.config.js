// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleNameMapper: {
    // Mock CSS/SCSS imports
    "\\.(css|scss|sass)$": "<rootDir>/src/__mocks__/styleMock.js",
    // Mock image imports
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/__mocks__/fileMock.js"
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios).+"
  ],
  moduleDirectories: ["node_modules", "src"]
};
