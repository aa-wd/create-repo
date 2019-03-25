const nock = require('nock');

const createRemoteRepo = require('../create-remote-repo');
const { getNewAccessToken, saveNewAccessToken } = require('../token-functions');
const { username, accessToken } = require('../../bitbucketConfig.json');

const apiUrl = 'https://api.bitbucket.org';
const matchAllUrls = (uri) => uri.includes('/2.0/repositories');

const postData = {
  scm: 'git',
  is_private: true,
};

const tokenExpiredResponse = {
  "type": "error",
  "error": {
      "message": "Access token expired. Use your refresh token to obtain a new access token."
  }
};

jest.mock('../token-functions');

describe('create-repo.js', () => {
    test('calls correct API endpoint to create repository', () => {

      const reqheaders = {
        authorization: `Bearer ${accessToken}`,
      };

      nock(apiUrl, { reqheaders })
        .post(`/2.0/repositories/${username}/projectA`, Object.assign({}, postData, { name: 'projectA' }))
        .reply(200, {})
        .post(`/2.0/repositories/${username}/projectB`, Object.assign({}, postData, { name: 'projectB' }))
        .reply(200, {})
  
      return Promise.all([createRemoteRepo('projectA'), createRemoteRepo('projectB')])
        .then(() => {
          expect(nock.pendingMocks().length).toEqual(0);
        })
    });

    test('refreshes access token on 401 unauthorized', () => {
      nock(apiUrl, { reqheaders: { authorization: `Bearer ${accessToken}` } })
        .post(matchAllUrls)
        .reply(401, tokenExpiredResponse)

        nock(apiUrl, { reqheaders: { authorization: 'Bearer abcdef' } }) // see src/__mocks__/token-functions.js
        .post(matchAllUrls)
        .reply(200, {})

      return createRemoteRepo('xxx')
        .then(() => {
          
          expect(nock.pendingMocks().length).toEqual(0);
          expect(getNewAccessToken).toHaveBeenCalled();
          expect(saveNewAccessToken).toHaveBeenCalledWith('abcdef');
        });
    });

    test('retries refreshing tokens only once', () => {
      nock(apiUrl)
        .post(matchAllUrls)
        .reply(401, tokenExpiredResponse)
        .post(matchAllUrls)
        .reply(401, tokenExpiredResponse)

      return createRemoteRepo('repo')
        .then(() => {
          expect(process.exitCode).toEqual(1);
        });
    });
});
