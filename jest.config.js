module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/lib/singleton.ts'],
    moduleNameMapper: {
        "^@/components/(.*)$": "<rootDir>/components/$1",
        "^@/app/(.*)$": "<rootDir>/app/$1",
        "^@/lib/(.*)$": "<rootDir>/lib/$1",
    },
    coveragePathIgnorePatterns: [
        "<rootDir>/app/api/auth/[...nextauth]/options.ts",
        "/app/api/auth/\\[\\.\\.\\.nextauth\\]/",
        "/app/api/auth/[...nextauth]/options.ts",
    ],
};