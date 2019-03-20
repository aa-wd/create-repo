const https = require('https');
const path = require('path');

const { username, accessToken, refreshToken } = require(path.resolve(__dirname, '../bitbucketConfig.json'));

const getRequestOptions = (forCreateRepo, projectName) => ({
    host: forCreateRepo ? 'api.bitbucket.org' : 'bitbucket.org',
    path: forCreateRepo ?
        `/2.0/repositories/${username}/${projectName}` :
        '/site/oauth2/access_token',
    method: 'POST',
    headers: {
        'Authorization': `${forCreateRepo ? 'Bearer' : 'Basic'} ${forCreateRepo ? accessToken : refreshToken}`,
    }
});

const createRepo = (projectName) => new Promise((resolve, reject) => {
    const request = https.request(getRequestOptions(true, projectName), (res) => {
        const responseData = [];

        res.on('data', (chunk) => {
            responseData.push(chunk);
        });

        res.on('end', () => {
            const parsedData = JSON.parse(responseData.join(''));
            resolve(parsedData);
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
