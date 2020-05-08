module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "rules": {
    "no-console": process.env.NODE_ENV === 'production' ? 1 : 0,
    "no-debugger": process.env.NODE_ENV === 'production' ? 1 : 0,
    "no-unused-vars": [process.env.NODE_ENV === 'production' ? 1 : 0, {
      vars: 'local',
      args: 'after-used',
    }],
    "indent": [2, 2],
    "semi": [0],
    "quotes": [2, "double", "avoid-escape"],
    "semi-spacing": [2, { "before": false, "after": true }]
  }
}