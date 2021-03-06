'use strict';

const {run} = require('madrun');

module.exports = {
    'fix:lint': () => run('lint', '--fix'),
    'lint': () => 'putout .',
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'test': () => 'tape \'test/**/*.js\'',
    'report': () => 'nyc report --reporter=text-lcov | coveralls',
    'coverage': () => 'nyc npm test',
    'watcher': () => 'nodemon -w test -w lib --exec',
    'watch:test': () => run('watcher', 'npm test'),
    'watch:lint': () => run('watcher', '\'npm run lint\''),
};

