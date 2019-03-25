const { writeFile } = require('fs');
const https = require('https');
const querystring = require('querystring');
const path = require('path');

const { getRequestOptions } = require('./utils');
const config = require('../bitbucketConfig.json');
const { refreshToken } = config;

const getNewAccessToken = () => new Promise((resolve) => {
    const request = https.request(getRequestOptions(false), (res) => {
        res.setEncoding('utf-8');
        const responseData = [];

        res.on('data', (chunk) => {
            responseData.push(chunk);
        });

        res.on('end', () => {
            const parsedResponse = JSON.parse(responseData.join(''));
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

const saveNewAccessToken = (accessToken) => new Promise((resolve, reject) => {
    const configPath = path.resolve(__dirname, '../bitbucketConfig.json');
    const data = JSON.stringify(Object.assign(config, {}, {
        accessToken,
    }), null, 4);

    writeFile(configPath, data, 'utf8', (err) => {
        if (err) reject();
        resolve();
    });
});

module.exports = {
    getNewAccessToken,
    saveNewAccessToken,
};
