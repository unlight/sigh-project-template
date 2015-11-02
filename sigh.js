var merge, glob, concat, write, env, pipeline;
var process, uglify, mocha, babel, browserSync;
var debug;

module.exports = function(pipelines) {

	pipelines["eslint"] = [
		glob({basePath: "src"}, "*.js"), 
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
		glob({basePath: "src"}, "index.html"),
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
				glob({basePath: "src"}, "**/*.js"), 
				babel({modules: "common"})
			]
			// glob("vendor/*.js", "bootstrap.js")
		),
		debounce(400),
		concat("combined.js"),
		env(uglify(), ["production"]),
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
}