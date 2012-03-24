var app = require('express').createServer(),
	mongo = require('mongodb'),
	io = require('socket.io').listen(app);

var host = 'localhost';
var port = mongo.Connection.DEFAULT_PORT;
var server = new mongo.Server(host, port, {});
var db = new mongo.Db('tf', server, {});

db.open(function (err, db) {
	if (err) console.log("DB open error: " + err);
});




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
	create : function (msg){
		return {
			ts : Math.round(new Date().getTime() / 1000),
			type : msg.type,
			from: msg.from,
			to : msg.to,
			content : msg.content,
			status : 0,
			lastModifed : Math.round(new Date().getTime() / 1000)
		}
	},
	
	get : function (param, callback){
		db.collection('message', function(err, collection){
			collection.find(param, {sort: {ts : 1}}, function(err, cursor) {
				cursor.toArray(callback);
			});
		});
	},
	
	getCounters : function(id, callback) {
		db.collection('message', function(err, collection){
			var keys = {from: 1};
			var initial = {items : 0};
			var reduce = "function (obj, prev) { prev.items++; }";
			var condition = {to : id};
			
			collection.group(keys, condition, initial, reduce, function(err, result){
				console.log("Group Error: " + err);
				callback(result);
			})
		});
	},
	
	save : function (msg){
		db.collection('message', function(err, collection){
			collection.insert(msg, function(err, result){
				console.log(err);
				console.log(result);
			})
		});
	},
	
	remove : function (mId){
		db.collection('message', function(err, collection){
			collection.remove({ _id : new mongo.BSONPure.ObjectID(mId)}, function(err, result){
				console.log(err);
				console.log(result);
			})
		});
	}
}

app.listen(3000);

app.get('*', function (req, res) {
  console.log(req.url);
  res.sendfile(__dirname + '/public/' + req.url);
});


var activeUsers = {};

io.sockets.on('connection', function (socket) {

	user.get({}, function(err, data){
		console.log("Sending userList");
		socket.emit("userList", data)
	});
	
	socket.on('setActor', function (id) {
		console.log("Set actor:" + id);
		activeUsers[id] = socket.id;
		emitCounters(id);
    });
	
	socket.on('getDialog', function (tha, fn){
		console.log("Getting dialog: " + tha.pair);
		
		var condition = {
			from : {$in: tha.pair},
			to : {$in: tha.pair}
		}
		
		message.get(condition, function(err, data){
			if (err) console.log("Get message error:" + err);
			fn(data);
		});
	});
	
	function emitCounters(id){
		if (io.sockets.sockets[activeUsers[id]])
		{
			message.getCounters(id,function(data){
				io.sockets.sockets[activeUsers[id]].emit('counters', data);
			})
		}
	}
	
	
	socket.on('sendMessage', function (msg, fn){
		console.log("Send Message: [" + msg.from + "=>" + msg.to + ": " + msg.type + " " + msg.content + "]");
		
		var m = message.create(msg);
		
		message.save(m);
		
		socket.emit('newMsg', m);
		emitCounters(msg.from)
		
		if (io.sockets.sockets[activeUsers[msg.to]])
		{
			io.sockets.sockets[activeUsers[msg.to]].emit('newMsg', m);
			emitCounters(msg.to);
		}
		fn();
	});
	
	socket.on('removeMsg', function(cmd){
		console.log('delete: ' + cmd.mId);
		message.remove(cmd.mId);
		emitCounters(cmd.actor);
	});
});
