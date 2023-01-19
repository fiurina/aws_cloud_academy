/**
 * Main driver for application configuration
 * The file depended on the environment is automatically included (test, development, production)
 * Refer to config.global.js for all the available config options and documentation
 */
const env = process.env.NODE_ENV || 'development';
const config = require('./config.' + env);

module.exports = config;