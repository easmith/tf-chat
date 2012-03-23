var app = require('express').createServer(),
	mongo = require('mongodb'),
	io = require('socket.io').listen(app);

var host = 'localhost';
var port = mongo.Connection.DEFAULT_PORT;
var server = new mongo.Server(host, port, {});
var db = new mongo.Db('tf', server, {});

db.open(function (err, db) {});




var user = {
	get : function (param, callback){
		db.collection('user', function(err, collection){
			collection.find(param, function(err, cursor) {
				cursor.toArray(callback);
			});
		});
	}
}



var message = {
	get : function (param, callback){
		db.collection('message', function(err, collection){
			collection.find(param, function(err, cursor) {
				cursor.toArray(callback);
			});
		});
	}
}

app.listen(3000);

app.get('*', function (req, res) {
  console.log(req.url);
  res.sendfile(__dirname + '/public/' + req.url);
});



var users = [];

io.sockets.on('connection', function (socket) {
	
        
	users.push(socket.id);
	console.log(">>>>>" + users);
	
	socket.on('getUserList', function (nick, fn) {
		user.get({}, function(err, data){
			fn(data);
		});
		console.log(nick);
    });
});
