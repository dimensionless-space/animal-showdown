/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  preset: "@testing-library/react-native",

  // maybe put this back in if we can't avoid importing expo even in test mode
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-native-reanimated)",
  ],

  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],

  // setupFilesAfterEnv: ["<rootDir>testSetup.js"],
  // preset: 'ts-jest',
  // preset: 'ts-jest',
  // rootDir: "test",
  // testEnvironment: '<rootDir>/phaser-env.js',
  // // testEnvironment: 'jsdom',
  // rootDir: "src",
  // testMatch: ["**/*.spec.ts"],
  // testEnvironmentOptions: { html: "<!DOCTYPE html><body></body>" },
  // transform: {
  //   '^.+\\.(t|j)sx?$': ['esbuild-jest', {
  //     sourcemap: true,
  //   }],
  //   // '^.+\\.(t|j)sx?$': '@swc/jest',
  // },
  // transform: {
  //   "^.+\\.tsx?$": [
  //     "esbuild-jest",
  //     {
  //       sourcemap: true,
  //     }
  //   ]
  // }
};
