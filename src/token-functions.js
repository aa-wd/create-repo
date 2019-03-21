const https = require('https');
const querystring = require('querystring');

const { getRequestOptions } = require('./utils');
const { refreshToken } = require('../bitbucketConfig.json');

const getNewAccessToken = () => new Promise((resolve) => {
    const request = https.request(getRequestOptions(false), (res) => {
        res.setEncoding('utf-8');
        const responseData = [];

        res.on('data', (chunk) => {
            responseData.push(chunk);
        });

        res.on('end', () => {
            const parsedResponse = JSON.parse(responseData.join(''));
            console.log(parsedResponse);
            resolve(parsedResponse.access_token);
        });
    });

    const postData = querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
    });

    request.write(postData);
    request.end();
});

module.exports = {
    getNewAccessToken,
    saveNewAccessToken: () => {},
};
