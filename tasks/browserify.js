var browserify = require("browserify");
var pathmodify = require("pathmodify");
var watchify = require("watchify");
var path = require("path");
var pkgUp = require("pkg-up");

var b = browserify({
	entries: "src/main.js",
	cache: {},
	packageCache: {},
});

b.plugin(watchify);
b.plugin(pathmodify(), {
	mods: [
		pathmodify.mod.dir("~", path.dirname(pkgUp.sync()))
	]
});

b.on("update", bundle);
bundle();

function bundle() {
	b.bundle().pipe(process.stdout);
}

 module.exports = b;