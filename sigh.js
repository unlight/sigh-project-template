var merge, glob, concat, write, env, pipeline;
var process, uglify, mocha, babel, browserSync, ngAnnotate, debug;

module.exports = function(pipelines) {

	pipelines["build"] = [
		merge(
			[
				glob({basePath: "src"}, "**/*.js"), 
				babel({modules: "common"})
			],
			glob({basePath: "src"}, "index.html")
		),
		env(uglify(), ["production"]),
		write("dist"),
		browserSync({
			open: false,
			server: {
				baseDir: ["dist", "."],
				directory: true,
				middleware: function (req, res, next) {
					next();
				}
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

