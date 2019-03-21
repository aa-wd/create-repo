const { argv } = process;

const createRepo = require('./create-repo');
const { log } = require('./utils'); 

const projectName = argv[2];
const isValidName = (name) => /^[a-zA-Z0-9_\-\.]+$/.test(name);

if (projectName && isValidName(projectName)) {
    createRepo(projectName);
} else if (projectName) {
    log('Invalid name: Bitbucket rules: "must be lowercase, alphanumerical, and may contain underscores, dashes, or dots."');
    process.exitCode = 1;
} else {
    log('Missing argument: project name');
    process.exitCode = 1;
}
