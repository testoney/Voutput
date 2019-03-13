module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-use-before-define": 0,
        "class-methods-use-this": 0,
        "no-underscore-dangle": 0,
        "func-names": 0,
        "no-param-reassign": 0,
        "no-await-in-loop": 0,
    }
};