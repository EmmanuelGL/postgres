// var config = {
// 	host : 'localhost',
// 	user : 'root',
// 	password : '',
// 	database : 'ultima'
// };

// module.exports = config;
const { Client } = require('pg');
const connectionData = {
	user: 'postgres',
	host: '127.0.0.1',
	database: 'ultima',
	password: 'root',
	port: 5432,
  }
const config = new Client(connectionData)
module.exports = config
