import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './'
})

const config = {
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};

export default createJestConfig(config);