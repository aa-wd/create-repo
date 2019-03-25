module.exports = {
    writeFile: jest.fn((name, data, encoding, cb) => cb()),
    access: jest.fn((filePath, cb) => cb()),
};
