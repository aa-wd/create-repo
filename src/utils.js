const { access } = require('fs');
const path = require('path');

const { accessToken, username, idAndSecret } = require('_config');

const getRequestOptions = (forCreateRepo, projectName = null, newToken = null) => ({
    host: forCreateRepo ? 'api.bitbucket.org' : 'bitbucket.org',
    path: forCreateRepo ?
        `/2.0/repositories/${username}/${projectName}` :
        '/site/oauth2/access_token',
    method: 'POST',
    headers: {
        'Authorization': `${forCreateRepo ? 'Bearer' : 'Basic'} ${forCreateRepo ? newToken || accessToken : idAndSecret}`,
        'Content-Type': forCreateRepo ? 'application/json' : 'application/x-www-form-urlencoded',
    },
});

const log = (...args) => {
    if (process.env.NODE_ENV === 'test') return;
    console.log(...args);
};

const configExists = () => new Promise((resolve) => {
    const configPath = path.resolve(__dirname, '../bitbucketConfig.json');
    access(configPath, (err) => {
        resolve(err === null);
    });
});

module.exports = {
    getRequestOptions,
    log,
    configExists
};
