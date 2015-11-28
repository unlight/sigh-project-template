var merge, glob, concat, write, env, pipeline, select, reject;
var process, uglify, mocha, babel, browserSync, ngAnnotate, debug, postcss;
var bump, rename, duration, notify, size, benchmark, less, browatchify, browserify, angularModule;

// var browserify = require("./tasks/browserify");

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
	
	pipelines.explicit.bump = [
		glob("./package.json"),
		rename('./package2.json'),
		// bump(),
		// size(),
		// notify("Hello"),
		write("dist")
	];
	
	var gbenchmark = require("gulp-benchmark");

	pipelines.explicit.benchmark = [
		glob("benchmarks/format.js"),
		benchmark({
			reporters: gbenchmark.reporters.etalon("formatstring")
		})
	];
	
	pipelines.explicit.less = [
		glob(globOpts, "style.less"),
		less(),
		rename('style.less.css'),
		write("dist")
	];
	
	
	pipelines.explicit.util = [
		glob(globOpts, "util.js"),
		browatchify(),
		write("dist")
	];

	pipelines.explicit.mocha = [
		mocha({
			reporter: "spec",
			files: "test/*.js"
		})
	];
};