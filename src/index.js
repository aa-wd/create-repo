#!/usr/bin/env node
const { argv } = require('process');

const createRepo = require('./create-repo');
const { log, configExists } = require('./utils'); 

const isValidName = (name) => /^[a-zA-Z0-9_\-\.]+$/.test(name);
const projectName = argv[2];

const start = () => new Promise((resolve) => {
    if (projectName && isValidName(projectName)) {
        configExists().then((hasConfigurationFile) => {
            if (hasConfigurationFile) {
                createRepo(projectName);
            } else {
                log('No configuration file found');
                process.exitCode = 1;
            }
        });
        resolve();
    } else if (projectName) {
        log('Invalid name: Bitbucket rules: "must be lowercase, alphanumerical, and may contain underscores, dashes, or dots."');
        process.exitCode = 1;
        resolve();
    } else {
        log('Missing argument: project name');
        process.exitCode = 1;
        resolve();
    }
});

start();

module.exports = start;
