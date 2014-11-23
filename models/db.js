var settings = require('../settings');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: settings.db_host,
	port: settings.db_port,
	database: settings.db_name,
	user: settings.db_user,
	password: settings.db_pass
});
connection.connect();
module.exports = connection;