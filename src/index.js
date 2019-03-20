const { argv } = process;

const createRepo = require('./create-repo');
const projectName = argv[2];

const isValidName = (name) => /^[a-zA-Z0-9_\-\.]+$/.test(name);

if (projectName && isValidName(projectName)) {
    createRepo(projectName);
} else if (projectName) {
    console.log('Invalid name: Bitbucket rules: "must be lowercase, alphanumerical, and may contain underscores, dashes, or dots."');
    process.exitCode = 1;
} else {
    console.log('Missing argument: project name');
    process.exitCode = 1;
}
