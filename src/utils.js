const { accessToken, username, idAndSecret } = require('../bitbucketConfig.json');

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

module.exports = {
    getRequestOptions,
    log,
};
