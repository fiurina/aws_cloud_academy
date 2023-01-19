/*
 * Development configuration
 * Please refer to config.global.js for documentation
 */

const config = require('./config.global');

config.env = 'production';
config.version = '1.0.0';

config.base_enpoint = '/backoffice';

config.emails_disabled = false;
config.init_db = true;
config.hasDatabase = false;

module.exports = config;