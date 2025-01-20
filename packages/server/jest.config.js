const jestConfig = {
    preset: 'ts-jest',
    testMatch: ['src/**/*.{ts,tsx}', '**/?(*.)+(spec|integration).+(ts|tsx)'],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {tsconfig: 'tsconfig.json'}],
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
    testPathIgnorePatterns: [
        '/node_modules/',
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        'dist',
    ],
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/mock/*'],
    coverageDirectory: 'coverage/jest',
    coverageReporters: ['text', 'html', 'json'],
    testEnvironment: 'jsdom',
    reporters: ['default'],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
        },
    },
};

module.exports = jestConfig
