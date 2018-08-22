/*var mysql = require('mysql');
var bcrypt = require('bcryptjs');
*/
// const { Client } = require('pg');
module.exports = {

	getSignUp : function(req, res, next){
		return res.render('users/signup');
	},

	postSignUp: function(req, res, next){
		var client = require('.././database/config');
		//client.connect()
		client.connect(err => {
			if (err) throw err;
			else {
				queryDatabase();
			}
		});
		
		function queryDatabase() {
			const query = `
				DROP TABLE IF EXISTS inventory;
				CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
				INSERT INTO inventory (name, quantity) VALUES ('banana', 150);
				INSERT INTO inventory (name, quantity) VALUES ('orange', 154);
				INSERT INTO inventory (name, quantity) VALUES ('apple', 100);
			`;
			console.log(`${req.body.email},${req.body.nombre}, ${req.body.password}`)
			const query1 = `
				INSERT INTO users(id,email, nombre,password) values(nextval('hibernate_sequence'),'${req.body.email}','${req.body.nombre}','${req.body.password}')
			`

			// client
			// 	.query(query1)
			// 	.then(() => {
			// 		//console.log('Table created successfully!');
			// 		console.log('Insercion echa!');
			// 		client.end(console.log('Closed client connection'));
			// 	})
			// 	.catch(err => console.log(err))
			// 	.then(() => {
			// 		console.log('Finished execution, exiting now');
			// 		process.exit();
			// 	});
			const query3 = 'SELECT * FROM inventory;';

			client.query(query3)
				.then(res => {
					const rows = res.rows;
					console.log('Table select successfully!');
			  		console.log('consulta echa!');
					 client.end(console.log('Closed client connection'));
					 console.log(JSON.stringify(rows))
					rows.map(row => {
						console.log(`Read: ${JSON.stringify(row)}`);
					});
					console.log('Finished execution, exiting now');
					process.exit();
				})
				.catch(err => {
					console.log(err);
				});
		}







		//}
		//var salt = bcrypt.genSaltSync(10);
		//var password = bcrypt.hashSync(req.body.password, salt);

		// var user = {
		// 	email : req.body.email,
		// 	nombre : req.body.nombre,
		// 	// password : password
		// 	password : req.body.password
		// };
		/*var user = [`nextval('hibernate_sequence'),${req.body.email},${req.body.nombre}, ${req.body.password}`];

		var client = require('.././database/config');
		client.connect()
		client.query('INSERT INTO users(id,email, nombre,password) values($1,$2,$3,$4)',`nextval('hibernate_sequence')`,req.body.email,req.body.nombre, req.body.password)
			.then(response => {
				console.log("---------------"+response.rows)
				client.end()
			})
			.catch(err => {
				console.log(err)
				client.end()
			})*/
		/*var db = mysql.createConnection(config);

		db.connect();

		db.query('INSERT INTO users SET ?', user, function(err, rows, fields){
			if(err) throw err;

			db.end();
		});*/
		req.flash('info', 'Se ha registrado correctamente, ya puede iniciar sesion');
		return res.redirect('/auth/signin');
	},

	getSignIn: function(req, res, next){
		return res.render('users/signin', {message: req.flash('info'), authmessage : req.flash('authmessage')});
	},

	logout : function(req, res, next){
		req.logout();
		res.redirect('/auth/signin');
	},

	getUserPanel : function(req, res, next){
		res.render('users/panel', {
			isAuthenticated : req.isAuthenticated(),
			user : req.user
		});
	}



};