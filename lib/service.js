var path = require('path');
var http = require('http');
var portchecker = require('portchecker');
var childProcess = require('child_process');

// ---

var vortex = require(path.join(__dirname, 'vortex.js'));

// ---

var LISTENING_PORT = 5656;
var IDLE_TIME = 1000 * 60 * 30;
var CHECK_TIME = 1000 * 60 * 1;

// ---

exports.launch = function (callback) {
	portchecker.isOpen(LISTENING_PORT, 'localhost', function (isOpen) {
		if (isOpen) {
			callback(null);
		} else {
			var child = childProcess.spawn(process.argv[0], [__filename], {detached: true});
			
			child.unref();
			
			setTimeout(function () {
				exports.launch(callback);
			}, 5000);
		}
	});
};

// ---

exports.poke = function (callback) {
	http
		.get('http://localhost:' + LISTENING_PORT, function (res) {
			return callback(null);
		})
		.on('error', function (error) {
			return callback(error);
		});
};

// ---

exports.main = function () {
	var lastPoke = new Date().getTime();
	
	process.on('exit', function () {
		vortex.down('docker', function (err) {
			// pass
		});
	});
	
	var server = http.createServer(function (req, res) {
		var lastPoke = new Date().getTime();
		
	    res.writeHead(200, {'Content-Type': 'text/plain'});
	    res.end('OK');
	})
	
	try {
		server.listen(LISTENING_PORT);
	} catch (e) {
		return process.exit(1);
	}
	
	setInterval(function () {
		var timeDelta = new Date().getTime() - lastPoke;
		
		if (timeDelta > IDLE_TIME) {
			vortex.down(function (err) {
				return process.exit(0);
			});
		} else {
			vortex.provider.status('docker', function (err, state, address) {
				if (err) {
					return process.exit(2);
				}
				
				if (state == 'stopped') {
					return process.exit(0);
				}
			});
		}
	}, CHECK_TIME);
};

// ---

if (require.main === module) {
	exports.main();
}
