var path = require('path');
var vortex = require('vortex');
var childProcess = require('child_process');

// ---

var vortexManifestLocation = vortex.manifest.locate(path.join(__dirname, '..', 'conf'));
var vortexManifest = vortex.manifest.load(vortexManifestLocation);

// ---

exports.provider = new vortex.virtualbox.Provider(vortexManifest);

// ---

exports.up = function (callback) {
	vortex.actions.up({argv:[], options:{}}, vortexManifest, exports.provider, ['docker'], callback);
};

exports.down = function (callback) {
	vortex.actions.down({argv:[], options:{}}, vortexManifest, exports.provider, ['docker'], callback);
};

// ---

exports.spawn = function (argv, callback) {
	var vortexConfig = path.join(__dirname, '..', 'conf', 'vortex.json');
	var vortexPath = path.join(__dirname, '..', 'node_modules', 'vortex', 'bin', 'vortex');
	var vortexArgs = ['-c', '-f', vortexConfig].concat(argv);
	var child = childProcess.spawn(vortexPath, vortexArgs, {stdio: 'inherit'});
	
	child.on('error', function (err) {
		return callback(err);
	});
	
	child.on('exit', function (code) {
		return callback(null, code);
	});
};
