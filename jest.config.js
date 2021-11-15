module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "testEnvironment": "jest-environment-jsdom",
    "transform": {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    "moduleNameMapper": {
        "\\.(css|scss)$": "identity-obj-proxy",
        "\\.(png)$": "<rootDir>/__mocks__/fileMock.js"
    },
    "coverageReporters": ["json", "html"],
    "collectCoverageFrom": [
        "src/**/*.js",
        "!**/node_modules/**"
    ]
}