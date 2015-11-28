var browserify = require("browserify");
// var pathmodify = require("pathmodify");
// var watchify = require("watchify");
var path = require("path");
// var pkgUp = require("pkg-up");
var fs = require("fs");

// var stream;
// var root = path.dirname(pkgUp.sync());

var b = browserify({
	// debug: true,
	require: [
		"angular",
		"angular-local-storage",
		"angular-resource",
		"angular-route",
		"angular-ui-bootstrap",
		"formatstring"
	],
	cache: {},
	packageCache: {},
});

// b.plugin(watchify);
// b.plugin(pathmodify(), {
// 	mods: [
// 		pathmodify.mod.dir("~", path.join(root, "src"))
// 	]
// });

// b.on("update", bundle);
bundle();

function bundle() {
	stream = fs.createWriteStream(path.join(".", "vendors.js"));
	b.bundle().pipe(stream);
}

// if (module.parent === null) {
// 	stream.on("finish", function() {
// 		b.close();
// 	});
// }

// module.exports = b;