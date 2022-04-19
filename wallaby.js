module.exports = function (wallaby) {
  return {
    env: {
      type: "node",
      runner: "node",
    },
    files: ["**/*.ts?(x)", "!**/*.spec.ts?(x)"],
    tests: ["**/*.spec.ts?(x)"],
    testFramework: "jest",
    compilers: {
      "**/*.ts?(x)": wallaby.compilers.typeScript({
        module: "commonjs",
      }),
    },
  };
};
