const nock = require('nock');
const querystring = require('querystring');

const { getNewAccessToken } = require('../token-functions');
const config = require('../../bitbucketConfig.json');

const apiUrl = 'https://bitbucket.org';
const postData = querystring.stringify({
    grant_type: 'refresh_token',
    refresh_token: config.refreshToken,
});

const refreshTokenReponse = {
    "access_token": "xxxxxx",
    "scopes": "repository:admin repository:write",
    "expires_in": 7200,
    "refresh_token": "yyyyyyy",
    "token_type": "bearer"
};

describe('token-functions.js', () => {
    test('requests new access token', () => {
        nock(apiUrl, {reqheaders: { authorization: `Basic ${config.idAndSecret}`}})
            .post('/site/oauth2/access_token', postData)
            .reply(200, refreshTokenReponse)
        return expect(getNewAccessToken()).resolves.toBe(refreshTokenReponse.access_token);
    });
});