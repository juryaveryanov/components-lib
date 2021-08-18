module.exports = {
    moduleFileExtensions: [
      'js',
      'json',
      'vue'
    ],
    transform: {
      '^.+\\.js$': 'babel-jest',
      '^.+\\.vue$': 'vue-jest',
      "^.+\\.svg$": "jest-svg-transformer"
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^~/(.*)$": "<rootDir>/$1"
    }
  }