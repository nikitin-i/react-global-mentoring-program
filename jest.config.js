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
        "\\.(jpg|jpeg|png)$": "identity-obj-proxy"
    },
    "coverageReporters": ["json", "html"],
    "collectCoverageFrom": [
        "src/**/*.js",
        "!**/node_modules/**"
    ]
}