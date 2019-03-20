const nock = require('nock');
const path = require('path');

const createRepo = require('./create-repo');
const { username, accessToken } = require(path.resolve(__dirname, '../bitbucketConfig.json'));

const apiUrl = 'https://api.bitbucket.org';

const { getNewAccessToken, saveNewAccessToken } = require('./token-functions');

describe('create-repo.js', () => {
    test('calls correct API endpoint to create repository', () => {
      const postData = {
        scm: 'git',
        is_private: true,
      };

      const reqheaders = {
        authorization: `Bearer ${accessToken}`,
      };

      nock(apiUrl, { reqheaders })
        .post(`/2.0/repositories/${username}/projectA`, Object.assign({}, postData, { name: 'projectA' }))
        .reply(200, {})
        .post(`/2.0/repositories/${username}/projectB`, Object.assign({}, postData, { name: 'projectB' }))
        .reply(200, {})
  
      return Promise.all([createRepo('projectA'), createRepo('projectB')])
        .then(() => {
          expect(nock.pendingMocks().length).toEqual(0);
        })
    });
});
