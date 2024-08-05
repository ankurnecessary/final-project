module.exports = {
  /* Specifies how to process files with a certain extension using Babel with Jest. The babel-jest package is used here to transform .ts and .tsx files according to the configuration in babel.config.test.js. */
  transform: {
    "^.+\\.tsx?$": [
      "babel-jest",
      {
        "configFile": "./babel.config.test.js"
      }
    ]
  },

  /* Specifies the environment that will be used for testing. In this case, it uses jest-environment-jsdom, which simulates a DOM environment for testing React components. */
  testEnvironment: "jest-environment-jsdom",

  /* Allows the mapping of module paths to specific directories. Here, it maps paths starting with @/ to <rootDir>/, which refers to the project's root directory. This setup is particularly useful for aliasing imports in your project. */
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  },

  /* Specifies the file extensions Jest will process. This includes TypeScript (ts, tsx) and JavaScript (js, jsx), as well as JSON and Node.js files. */
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],

  /* Specifies patterns that Jest will ignore when looking for test files. In this configuration, it ignores files in the node_modules directory and babel.config.test.js file. */
  testPathIgnorePatterns: ["/node_modules/", "/babel.config.test.js"]
}