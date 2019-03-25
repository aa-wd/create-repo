jest.mock('../create-remote-repo');
jest.mock('../utils');

const originalArgv = Object.assign({}, process.argv);

let start;
let createRemoteRepo;
let configExists;

const reset = () => {
    start = require('../create-repo');
    createRemoteRepo = require('../create-remote-repo');
};

describe('create-repo.js', () => {

    afterEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('aborts script if called without project name as arg', () => {
        process.argv = ['', ''];
        reset();

        return start().then(() => {
            expect(createRemoteRepo).not.toHaveBeenCalled();
            expect(process.exitCode).toEqual(1);
        });
    });

    test('calls createRemoteRepo with project name as arg', () => {
        let projectName = 'validArg';
        process.argv = ['', '', projectName];

        reset();

        return start().then(() => {
            expect(createRemoteRepo).toHaveBeenCalledWith(projectName);
        });
    });

    test('aborts script if bitbucket config is not found', () => {
        process.argv = ['', '', 'noBitbucketConfig'];

        configExists = require('../utils').configExists;
        configExists.mockResolvedValue(false);

        reset();

        return start().then(() => {
            expect(createRemoteRepo).not.toHaveBeenCalled();
            expect(process.exitCode).toEqual(1);
        });
    });

    test('aborts script if invalid repository name is given', () => {
        process.argv = ['', '', '&'];
        configExists = require('../utils').configExists;

        reset();

        return start().then(() => {
            expect(configExists).not.toHaveBeenCalled();
            expect(createRemoteRepo).not.toHaveBeenCalled();
            expect(process.exitCode).toEqual(1);
        });
    });
});
