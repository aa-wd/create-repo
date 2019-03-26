const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const json = require('rollup-plugin-json');
const path = require('path');

module.exports = {
    input: 'src/create-repo.js',
    external: ['_config'],
    output: {
        file: 'dist/create-repo.js',
        format: 'cjs',
        banner: '#!/usr/bin/env node',
        paths: {
            '_config': path.resolve(__dirname, './bitbucketConfig.json'),
        },
    },
    plugins: [
        resolve(),
        commonjs(),
        json(),
    ],
};
