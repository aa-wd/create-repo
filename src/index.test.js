
jest.mock('./create-repo');

const originalArgv = Object.assign({}, process.argv);
let createRepo;

const clear = () => {
    jest.resetModules();
    createRepo = require('./create-repo');
};

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

        clear();
        process.exitCode = undefined;

        process.argv = ['', '', 'project'];
        require('./index');
        expect(createRepo).toHaveBeenCalled();
    });

    test('aborts script if project name contains invalid characters', () => {
        process.argv = [,, '_regular7'];
        require('./index');
        expect(process.exitCode).toBeUndefined();

        clear();

        process.argv = [,, '&'];
        require('./index');
        expect(process.exitCode).toEqual(1);
    });

    test('calls createRepo with project name as arg', () => {
        let projectName = 'validArg';
        process.argv = ['', '', projectName];
        require('./index');
        expect(createRepo).toHaveBeenCalledWith(projectName);
    });
});
