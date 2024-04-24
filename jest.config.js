const path = require("path");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  displayName: "integration test",
  preset: 'ts-jest',
  testEnvironment: 'node',
  resetMocks: true,
  clearMocks: true,
  restoreMocks: true,
  collectCoverage: true,
};