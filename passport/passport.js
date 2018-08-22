var LocalStrategy = require('passport-local').Strategy;
/*var mysql = require('mysql');
var bcrypt = require('bcryptjs');
*/
module.exports = function(passport){

	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(obj, done){
		done(null, obj);
	});

	passport.use(new LocalStrategy({
		passReqToCallback : true
	}, function(req, email, password, done){
		var client = require('.././database/config');
		//client.connect()
		client.connect(err => {
			if (err) throw err;
			else {
				queryDatabase();
			}
		});
		
		function queryDatabase() {
			const query3 = `SELECT * FROM users WHERE email =  '${email}'`;

			client.query(query3)
				.then(res => {
					const rows = res.rows;
					console.log('Table select successfully!');
			  		console.log('consulta echa!');
					 client.end(console.log('Closed client connection'));
					 console.log(JSON.stringify(rows))
					 if(rows.length > 0){

						var user = rows[0];
						console.log("----------------"+password+"-------------"+user.password)
		
						// if(bcrypt.compareSync(password, user.password)){
						if(password === user.password){
							console.log("si entra ")
							return done(null, {
								id: user.id, 
								nombre : user.nombre,
								email : user.email
							});
						}
					 }
					// rows.map(row => {
					// 	console.log(`Read: ${JSON.stringify(row)}`);
					// });
					console.log('Finished execution, exiting now');
					process.exit();
				})
				.catch(err => {
					console.log(err);
				});
		}
		/*var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();

		db.query('SELECT * FROM users WHERE email = ?', email, function(err, rows, fields){
			if(err) throw err;
			console.log(JSON.stringify(rows));
			db.end();

			if(rows.length > 0){

				var user = rows[0];
				console.log("----------------"+password+"-------------"+user.password)

				// if(bcrypt.compareSync(password, user.password)){
				if(password === user.password){
					console.log("si entra ")
					return done(null, {
						id: user.id, 
						nombre : user.nombre,
						email : user.email
					});
				}
			}

			return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));

		});*/

	}
	));

};