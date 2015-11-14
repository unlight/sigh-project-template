module.exports = function(req, res, next) {
	console.log("Hi from first middleware");
	next();
};