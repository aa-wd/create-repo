module.exports = {
    configExists: jest.fn(),
    isValidRepoName: jest.fn(),
    configExists: jest.fn(() => new Promise((resolve) => { resolve(true) })),
    log: jest.fn(),
};
