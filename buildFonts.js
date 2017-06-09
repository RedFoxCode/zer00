const opentype = require("opentype.js");
const async = require("async");
const fs = require("fs");

console.log("Starting build");

var fonts = [];

fs.readdir("./fonts/", function(err, files) {
	console.log("There is " + files.length + " fonts");

	async.each(files, function(file, callback) {
		opentype.load("./fonts/" + file, function(err, font) {
			console.log(file + " has name '" + font.names.fontFamily.en + "'");

			fonts.push("[\"fonts/" + file + "\", \"" + font.names.fontFamily.en + "\"]");

			callback();
		});
	}, function() {
		console.log("Writing file");

		fs.writeFileSync("./js/fonts.js", "var files=[" + fonts.join(",") + "];");

		console.log("Done.");
	});
});