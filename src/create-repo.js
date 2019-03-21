const https = require('https');

const { getRequestOptions } = require('./utils');
const { getNewAccessToken, saveNewAccessToken } = require('./token-functions');
let { accessToken } = require('../bitbucketConfig.json');

const getOptions = (projectName)  => getRequestOptions(true, projectName, accessToken);

const createRepo = (projectName, isInitial = true) => new Promise((resolve) => {
    const request = https.request(getOptions(projectName), (res) => {
        const responseData = [];

        res.on('data', (chunk) => {
            responseData.push(chunk);
        });

        res.on('end', () => {

            const parsedData = JSON.parse(responseData.join(''));
            const isError = parsedData.hasOwnProperty('error');

            if (isError && isInitial) {
                getNewAccessToken()
                    .then((newAccessToken) => {
                        accessToken = newAccessToken;
                        saveNewAccessToken(newAccessToken);

                        createRepo(projectName, false).then(() => {
                            resolve();
                        });
                    });
                return;
            } else if (isError) {
                process.exitCode = 1;
                return resolve();
            }

            resolve();
        });
        
    });

    request.write(JSON.stringify({
        scm: 'git',
        is_private: true,
        name: projectName,
    }));

    request.end();
});

module.exports = createRepo;
