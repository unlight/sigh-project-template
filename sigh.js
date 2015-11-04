var merge, glob, concat, write, env, pipeline;
var process, uglify, mocha, babel, browserSync, ngAnnotate;
var debug;

module.exports = function(pipelines) {

	pipelines["build-source"] = [
		glob({basePath: "src"}, "**/*.js"),
		babel({module: "common"}),
		write("app")
	];

	pipelines.alias.build = ["build-source"];
}