var merge, glob, concat, write, env, pipeline;
var process, uglify, mocha, babel, browserSync, ngAnnotate, debug, postcss;

var browserify = require("./tasks/browserify");

var globOpts = {
	basePath: "src"
};

module.exports = function(pipelines) {

	pipelines["build"] = [
		merge(
			[
				glob(globOpts, "**/*.js"), 
				babel({modules: "common"})
			],
			[
				glob(globOpts, "*.css"),
				postcss([
					require("autoprefixer")({ browsers: ["last 3 versions"] })
				])
			],
			[
				glob(globOpts, "index.html")
			]
		),
		env(uglify(), ["production"]),
		write("dist"),
		browserSync({
			// logConnections: true,
			// logLevel: "debug",
			open: false,
			server: {
				baseDir: ["dist"],
				//middleware: require("./tasks/mw")
			}
		})
	];

	pipelines["tests"] = [
		pipeline("build"),
		pipeline({activate: true}, "mocha")
	];

	pipelines["eslint"] = [
		process("eslint.cmd src")
	];

	pipelines.explicit.mocha = [
		mocha({
			reporter: "spec",
			files: "test/*.js"
		})
	];
};