module.exports = {
  root: true,
  env: {
    node: true
  },    
  extends: ["plugin:vue/essential", "@vue/prettier", "prettier"],
  plugins: ["prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": "warn",
    "prettier/prettier": "warn",
    "vue/no-unused-vars": "warn"    
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
