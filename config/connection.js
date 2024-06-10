const { connect, connection } = require('mongoose');

const connectionString = `mongodb://localhost/social-network`;

connect(connectionString);

module.exports = connection;