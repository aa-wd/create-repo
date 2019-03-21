module.exports = {
    getNewAccessToken: jest.fn(() => new Promise((resolve, reject) => { resolve('abcdef') })),
    saveNewAccessToken: jest.fn(),
};
