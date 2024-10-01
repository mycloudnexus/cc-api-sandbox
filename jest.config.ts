import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  maxWorkers: 1,

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/**/*.d.ts",
    "!<rootDir>/**/*generated/**/*",
    "!<rootDir>/**/*generated*",
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: "<rootDir>src/loadTestEnv.js",

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // Use this configuration option to add custom reporters to Jest
  reporters: ["default", "jest-junit"],

  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>/src"],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ["jest-extended", "jest-extended/all"],
};
export default config;
