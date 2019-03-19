const { argv } = process;

const createRepo = require('./create-repo');
const projectName = argv[2];

if (projectName) {
    createRepo(projectName);
} else {
    console.log('Missing argument: project name');
    process.exitCode = 1;
}
