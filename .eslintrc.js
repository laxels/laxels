module.exports = {
  "env": {
    "browser": true,
  },
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "max-len": 0,
    "no-param-reassign": 0,
    "no-plusplus": 0,
    "no-underscore-dangle": 0,
    "no-use-before-define": [2, { variables: false }],
    "object-curly-newline": 0,
    "one-var": 0,
    "one-var-declaration-per-line": [2, "initializations"],
    "prefer-destructuring": [2, {
      array: false,
    }],
    "react/jsx-filename-extension": 0,
    "react/jsx-fragments": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-props-no-spreading": 0,
    "react/no-did-update-set-state": 0,
    "react/no-unescaped-entities": 0,
    "react/prop-types": 0,
    "react/sort-comp": 0,
  },
  "overrides": [
    {
      "files": ["*.test.js"],
      "rules": {
        "no-undef": 0,
      },
    },
  ],
};
