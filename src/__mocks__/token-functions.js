module.exports = {
    getNewAccessToken: jest.fn(() => new Promise((resolve) => { resolve('abcdef') })),
    saveNewAccessToken: jest.fn(),
};
