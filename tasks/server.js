var browserSync = require("browser-sync").create();
browserSync.init({
	server: {
		baseDir: ["dist"],
		directory: true,
		port: 3000,
		open: false,
		// notify: true
	}
});