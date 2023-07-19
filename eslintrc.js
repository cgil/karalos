module.exports = {
  extends: "./node",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "unicorn/prefer-module": "off",
    "unicorn/no-empty-file": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-key": "error",
    "react/require-default-props": "off",
    "react/no-unused-prop-types": "off",
    "@typescript-eslint/no-floating-promises": ["off"],
  },
};
