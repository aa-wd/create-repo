const createRepoLocation = '../create-repo';
const indexLocation = '../index';
jest.mock(createRepoLocation);

const originalArgv = Object.assign({}, process.argv);
let createRepo;

const clear = () => {
    jest.resetModules();
    createRepo = require(createRepoLocation);
};

describe('create-repo.js', () => {
    beforeEach(() => {
        jest.resetModules();
        createRepo = require(createRepoLocation);
    });

    afterEach(() => {
        process.argv = originalArgv;
    });

    test('does not start script if called without project name as arg', () => {
        process.argv = ['', ''];
        require(indexLocation);
        expect(createRepo).not.toHaveBeenCalled();
        expect(process.exitCode).toEqual(1);

        clear();
        process.exitCode = undefined;

        process.argv = ['', '', 'project'];
        require(indexLocation);
        expect(createRepo).toHaveBeenCalled();
    });

    test('aborts script if project name contains invalid characters', () => {
        process.argv = [,, '_regular7'];
        require(indexLocation);
        expect(process.exitCode).toBeUndefined();

        clear();

        process.argv = [,, '&'];
        require(indexLocation);
        expect(process.exitCode).toEqual(1);
    });

    test('calls createRepo with project name as arg', () => {
        let projectName = 'validArg';
        process.argv = ['', '', projectName];
        require(indexLocation);
        expect(createRepo).toHaveBeenCalledWith(projectName);
    });
});
