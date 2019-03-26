const path = require('path');
const nock = require('nock');
const { writeFile } = require('fs');
const querystring = require('querystring');

const { getNewAccessToken, saveNewAccessToken } = require('../token-functions');
const config = require('_config');

const apiUrl = 'https://bitbucket.org';
const postData = querystring.stringify({
    grant_type: 'refresh_token',
    refresh_token: config.refreshToken,
});

jest.mock('fs');

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

    test('saves the new access token to bitbucket config file', () => {
        const exampleToken = 'hFInf9dkLQ';
        const newConfig = JSON.stringify(Object.assign(config, {}, {
            accessToken: exampleToken
        }), null, 4);

        return saveNewAccessToken(exampleToken)
            .then(() => {
                const configPath = path.resolve(__dirname, '../../bitbucketConfig.json');
                expect(writeFile.mock.calls[0][0]).toEqual(configPath);
                expect(writeFile.mock.calls[0][1]).toEqual(newConfig);
            });
    });
});
