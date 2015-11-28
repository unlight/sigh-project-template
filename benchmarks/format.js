var Benchmark = require("benchmark");
var suite = new Benchmark.Suite();
var assert = require("assert");
var formatstring = require("formatstring");
var stringFormatter = require("string-formatter");
var fhellwigStrformat = require("strformat");
require("string.format");
var bifuerString = String.format

var params = {
	first: "John",
	last: "Smith"
};
var pattern = "Hi, this is {first} and {last}.";
var result = "Hi, this is John and Smith.";

suite.add("bifuer/string.format", function() {
	var r = bifuerString(pattern, params);
	assert.ok(r === result);
});

suite.add("fhellwig/strformat", function() {
	var r = fhellwigStrformat(pattern, params);
	assert.ok(r === result);
});

suite.add("RinatMullayanov/string-format", function() {
	var r = stringFormatter.format(pattern, params);
	assert.ok(r === result);
});

suite.add("formatstring", function() {
	var r = formatstring(pattern, params);
	assert.ok(r === result);
});

module.exports = suite;