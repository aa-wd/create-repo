jest.mock('../create-repo');
jest.mock('../utils');

const originalArgv = Object.assign({}, process.argv);

let start;
let createRepo;
let configExists;

const reset = () => {
    start = require('../index');
    createRepo = require('../create-repo');
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
            expect(createRepo).not.toHaveBeenCalled();
            expect(process.exitCode).toEqual(1);
        });
    });

    test('calls createRepo with project name as arg', () => {
        let projectName = 'validArg';
        process.argv = ['', '', projectName];

        reset();

        return start().then(() => {
            expect(createRepo).toHaveBeenCalledWith(projectName);
        });
    });

    test('aborts script if bitbucket config is not found', () => {
        process.argv = ['', '', 'noBitbucketConfig'];

        configExists = require('../utils').configExists;
        configExists.mockResolvedValue(false);

        reset();

        return start().then(() => {
            expect(createRepo).not.toHaveBeenCalled();
            expect(process.exitCode).toEqual(1);
        });
    });

    test('aborts script if invalid repository name is given', () => {
        process.argv = ['', '', '&'];
        configExists = require('../utils').configExists;

        reset();

        return start().then(() => {
            expect(configExists).not.toHaveBeenCalled();
            expect(createRepo).not.toHaveBeenCalled();
            expect(process.exitCode).toEqual(1);
        });
    });
});
