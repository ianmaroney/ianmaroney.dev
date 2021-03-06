module.exports = {
  setupFilesAfterEnv: ['<rootDir>/tests/setup/index.js'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/'
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  },
  moduleNameMapper: {
    '^@/config': '<rootDir>/next.config.js',
    '^@/data': '<rootDir>/src/data',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/layouts/(.*)$': '<rootDir>/src/components/layouts/$1',
    '^@/modules/(.*)$': '<rootDir>/src/components/modules/$1',
    '^@/partials/(.*)$': '<rootDir>/src/components/partials/$1',
    '^@/templates/(.*)$': '<rootDir>/src/components/templates/$1',
    '^@/util': '<rootDir>/src/util',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/mocks/fileMock.js',
    '\\.(scss)$': '<rootDir>/tests/mocks/styleMock.js'
  }
}
