var argv = require('yargs').argv;

module.exports = {
    api: {
        type: 'prefix', // prefix or suffix
        value: '/api-prefix/'
    },
    server: {
        host: argv.h || 'localhost',
        port: argv.p || 8080
    },
    rootBase: ''
};