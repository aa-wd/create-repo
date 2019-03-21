const https = require('https');
const path = require('path');

const { getNewAccessToken, saveNewAccessToken } = require('./token-functions');
const config = require(path.resolve(__dirname, '../bitbucketConfig.json'));
const { username, refreshToken } = config;
let { accessToken } = config; 

const getRequestOptions = (forCreateRepo, projectName) => ({
    host: forCreateRepo ? 'api.bitbucket.org' : 'bitbucket.org',
    path: forCreateRepo ?
        `/2.0/repositories/${username}/${projectName}` :
        '/site/oauth2/access_token',
    method: 'POST',
    headers: {
        'Authorization': `${forCreateRepo ? 'Bearer' : 'Basic'} ${forCreateRepo ? accessToken : refreshToken}`,
    },
});

const createRepo = (projectName, isInitial = true) => new Promise((resolve, reject) => {
    const request = https.request(getRequestOptions(true, projectName), (res) => {
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

