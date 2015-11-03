var merge, glob, concat, write, env, pipeline;
var process, uglify, mocha, babel, browserSync, ngAnnotate;
var debug;

var srcStream = function() {
	var vinylfs = require("vinyl-fs");
	var sources = vinylfs.src("src/*.js", {
		read: false
	});
	return sources;
};

module.exports = function(pipelines) {

	pipelines["ts"] = [
		glob({
			basePath: "src"
		}, "*.ts"),
		write("dist")
	];

	pipelines["eslint"] = [
		glob({
			basePath: "src"
		}, "*.js"),
		process("eslint.cmd src")
	];

	// pipelines["eslint"] = [
	// 	glob({basePath: "src"}, "test1.js"), 
	// 	eslint(),
	// 	eslintFormat()
	// ];

	// sigh server -w
	pipelines["server"] = [
		process("node tasks/server.js")
	];

	pipelines["htdocs"] = [
		glob({
			basePath: "src"
		}, "index.html"),
		// debounce(200),
		write("dist"),
		browserSync({
			logLevel: "silent",
			server: {
				baseDir: ["dist"],
				port: 3000,
				open: false,
				notify: true
			}
		})
	];

	pipelines["build-source"] = [
		merge(
			[
				glob({
					basePath: "src"
				}, "**/*.js"),
				babel({
					modules: "common"
				})
			]
			// glob("vendor/*.js", "bootstrap.js")
		),
		shell(["echo hello"]),
		// debounce(100),
		concat("combined.js"),
		env(merge(ngAnnotate(), uglify()), ["production"]),
		write("dist")
	];

	// pipelines["build-tests"] = [
	// 	glob({basePath: "test"}, "*.js"),
	// 	babel(),
	// 	write("dist_test")
	// ];

	pipelines.alias.build = ["build-source"];

	// pipelines["tests-run"] = [
	// 	pipeline("build-source", "build-tests"),
	// 	debounce(500),
	// 	mocha({files: "lib/**/*.spec.js"})
	// ];
	// 
	pipelines["inject"] = [
		glob({
			basePath: "src"
		}, "*.html"),
		write("dist")
	];
}