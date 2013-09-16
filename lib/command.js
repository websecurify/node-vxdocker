var path = require('path');
var logsmith = require('logsmith');

// ---

var vortex = require(path.join(__dirname, 'vortex.js'));
var service = require(path.join(__dirname, 'service.js'));

// ---

exports.main = function () {
	logsmith.setGlobalLevel('info');
	logsmith.setGlobalColorization(true);
	
	vortex.up(function (err) {
		if (err) {
			return process.exit(1);
		}
		
		service.launch(function (err) {
			if (err) {
				return process.exit(2);
			}
			
			service.poke(function (err) {
				if (err) {
					return process.exit(3);
				}
				
				var argv = process.argv.slice(2);
				
				vortex.spawn(['shell', '--', '--', 'sudo', 'docker'].concat(argv), function (err, code) {
					if (err) {
						return process.exit(4);
					}
					
					if (code > 0) {
						return process.exit(5);
					}
					
					return process.exit(0);
				});
			});
		});
	});
};

// ---

if (require.main === module) {
	exports.main();
}
