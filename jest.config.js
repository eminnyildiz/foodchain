module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts", "@testing-library/jest-native/extend-expect"],
  moduleNameMapper: {
    '^react-native/setup-env$': '<rootDir>/jest.setup.ts'
  }
};
