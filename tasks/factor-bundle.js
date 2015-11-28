var browserify = require('browserify');
var fs = require('fs');

var bundler = browserify({
	debug: true,
	bundleExternal: false,
	entries: [ "src/main.js" ],
	require: [
		"util"
	],
	packageCache: {},
	cache: {}
});

bundler.transform("babelify", {presets: ["es2015"]});

bundler.plugin('factor-bundle', { outputs: [ '_app.js' ] });

if (true) {
	var watchify = require('watchify');
	bundler.plugin(watchify);
}

bundler.on('update', bundle);
bundle();

function bundle() {
	bundler.bundle().pipe(fs.createWriteStream('_common.js'));
}

