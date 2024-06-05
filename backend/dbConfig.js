const oracledb = require('oracledb');

// Configura la connessione al database
const dbConfig = {
    user: process.env.DB_USER || 'project_user',
    password: process.env.DB_PASSWORD || 'project_password',
    connectString: process.env.DB_CONNECTIONSTRING || 'oracle-db:1521/XE'
};

module.exports = dbConfig;
