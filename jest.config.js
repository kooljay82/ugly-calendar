module.exports = {
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "json"],
  transform: {
      "^.+\\.(js|jsx)?$": "babel-jest"
  },
  moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/$1",
      "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/']
};