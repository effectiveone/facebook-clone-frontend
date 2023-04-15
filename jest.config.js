// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
