/**
 * Base configuration for all configurations so common values don't have to be maintained in different files
 * This is required in every different configuration file
 * All configuration possibilities are in here with their default values which can always be overridden in the
 * next configuration
 */
const config = {};

/**
 * Hostname (not used right now but might be used for address binding in the future)
 * @type {string}
 */
config.hostname = 'localhost';

/**
 * Port the webservice listens to requests on
 * @type {number}
 */
config.port = process.env.PORT || 3000;

/**
 * Array that contains all domains that can be accepted as valid mail addresses
 * @type {string[]}
 */
config.whitelisted_domains = ['t-systems.com', 'telekom.de'];

/**
 * Secret that will be used for sessions and hashing the password.
 * This will move to an environment variable in the future because it shouldn't be in the source.
 * @type {string}
 */
config.secret = 'y2ldJQzZhsZgRQj';

/**
 * Holder for all the database configuration parameters
 * @type {{}}
 */
config.database = [];

/**
 * Holder for mail configuration parameters
 * @type {{}}
 */
config.mail = {};
/**
 * Sender of the email
 * @type {string}
 */
config.mail.from = 'Cloud <no-reply-cloud@t-systems.com>';
/**
 * Subject of the registration email
 * @type {string}
 */
config.mail.subject = 'Subject';
/**
 * User that is able to send through the specified SMTP connection
 * @type {string}
 */
config.mail.user = '';
/**
 * Password of the SMTP user
 * @type {string}
 */
config.mail.password = '';
/**
 * Host or IP address of the SMTP server
 * @type {string}
 */
config.mail.host = '';
/**
 * Port of the SMTP server
 * @type {number}
 */
config.mail.port = 0;

/**
 * Base URL of the web service
 * @type {string}
 */
config.base_url = '';

/**
 * Enable/disable authentication for the web server
 * If set to false the authentication is ENABLED
 * @type {boolean}
 */
config.auth_disabled = false;

/**
 * Enable the moderator role which is used to edit (create/update/delete) resources
 * If set to false the moderator is ENABLED so a user without moderator role cannot edit anything
 * @type {boolean}
 */
config.mod_disabled = false;

/**
 * Enable sending emails
 * If set to false emails will be sent through the provided SMTP server
 * @type {boolean}
 */
config.emails_disabled = false;

/**
 * Enable inserting test records in the tables
 * If set to false do not insert test records
 * @type {boolean}
 */
config.init_db = true;

/**
 * Specify the key directory for the ssl keys
 * only used in production or integration so the default is empty
 * @type {string}
 */
config.ssl_key_dir = 'certs';
config.proxy = 'http://user:passw@10.49.1.1:8080/';

/**
 * Toggle sequelize logging its SQL statements to the console
 * @type {boolean}
 */
config.sql_logging = false;

config.Auth_int_url = '';
//config.Auth_int_url = 'https://hrapp-test.t-systems.es/';

// timezone config
config.timezone = 'Europe/Madrid';

module.exports = config;