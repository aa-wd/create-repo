const { getRequestOptions } = require('../utils');

const config = require('../../bitbucketConfig.json');

describe('utils.js', () => {
    test('returns request options with new or existing access tokens', () => {
        let options = getRequestOptions(true, '', 'xyz');
        expect(options.headers['Authorization']).toEqual('Bearer xyz');

        options = getRequestOptions(true, '');
        const existingAccessToken = config.accessToken;
        expect(options.headers['Authorization']).toEqual(`Bearer ${existingAccessToken}`);
    });

    test('returns options with client id and secret when refreshing access token', () => {
        const options = getRequestOptions(false, '');
        expect(options.headers['Authorization']).toEqual(`Basic ${config.idAndSecret}`);
    });

    test('returns options with correct host depending on if creating repo or refreshing token', () => {
        let options = getRequestOptions(true);
        expect(options.host).toEqual('api.bitbucket.org');
        options = getRequestOptions(false);
        expect(options.host).toEqual('bitbucket.org');
    });

    test('returns correct endpoint for api request', () => {
        let options = getRequestOptions(true, 'projA');
        expect(options.path).toEqual(`/2.0/repositories/${config.username}/projA`);
        options = getRequestOptions(false);
        expect(options.path).toEqual('/site/oauth2/access_token');
    });

    test('returns options with contentType', () => {
        let options = getRequestOptions(false);
        expect(options.headers['Content-Type']).toEqual('application/x-www-form-urlencoded');
        options = getRequestOptions(true);
        expect(options.headers['Content-Type']).toEqual('application/json');
    });
});
