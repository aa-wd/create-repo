const { writeFile, access } = require('fs');
const path = require('path');

const { getRequestOptions, configExists } = require('../utils');
const config = require('../../bitbucketConfig.json');

jest.mock('fs');

describe('utils.js', () => {
    test('returns request options with new or existing access tokens', () => {
        let options = getRequestOptions(true, '', 'xyz');
        expect(options.headers['Authorization']).toBe('Bearer xyz');

        options = getRequestOptions(true, '');
        const existingAccessToken = config.accessToken;
        expect(options.headers['Authorization']).toBe(`Bearer ${existingAccessToken}`);
    });

    test('returns options with client id and secret when refreshing access token', () => {
        const options = getRequestOptions(false, '');
        expect(options.headers['Authorization']).toBe(`Basic ${config.idAndSecret}`);
    });

    test('returns options with correct host depending on if creating repo or refreshing token', () => {
        let options = getRequestOptions(true);
        expect(options.host).toBe('api.bitbucket.org');
        options = getRequestOptions(false);
        expect(options.host).toBe('bitbucket.org');
    });

    test('returns correct endpoint for api request', () => {
        let options = getRequestOptions(true, 'projA');
        expect(options.path).toBe(`/2.0/repositories/${config.username}/projA`);
        options = getRequestOptions(false);
        expect(options.path).toBe('/site/oauth2/access_token');
    });

    test('returns options with contentType', () => {
        let options = getRequestOptions(false);
        expect(options.headers['Content-Type']).toBe('application/x-www-form-urlencoded');
        options = getRequestOptions(true);
        expect(options.headers['Content-Type']).toBe('application/json');
    });

    test('detects if config exists and resolves boolean', () => {
        const configPath = path.resolve(__dirname, '../../bitbucketConfig.json');
        access.mockImplementationOnce((filename, cb) => cb(null));

        return configExists().then((hasConfiguration) => {
            expect(access.mock.calls[0][0]).toBe(configPath);
            expect(hasConfiguration).toBe(true);
        });
    });
});
