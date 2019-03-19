
jest.mock('./create-repo');

const originalArgv = Object.assign({}, process.argv);
let createRepo;

describe('create-repo.js', () => {
    beforeEach(() => {
        jest.resetModules();
        createRepo = require('./create-repo');
    });

    afterEach(() => {
        process.argv = originalArgv;
    });

    test('does not start script if called without project name as arg', () => {
        process.argv = ['', ''];
        require('./index');
        expect(createRepo).not.toHaveBeenCalled();
        expect(process.exitCode).toEqual(1);
    });

    test('calls createRepo with project name as arg', () => {
        let projectName = 'validArg';
        process.argv = ['', '', projectName];
        require('./index');
        expect(createRepo).toHaveBeenCalledWith(projectName);
    });

});
