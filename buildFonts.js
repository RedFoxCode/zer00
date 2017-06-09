const opentype = require("opentype.js");
const async = require("async");
const fs = require("fs");
const path = require("path");

console.log("Starting build");

var fonts = [];
var licenses = {};

fs.readdir("./fonts/", function(err, files) {
	console.log("There is " + (files.length - 1) + " fonts");

	async.each(files, function(file, callback) {
		if (String(file).indexOf(".") === -1) return callback();

		opentype.load("./fonts/" + file, function(err, font) {
			console.log(file + " has name '" + font.names.fontFamily.en + "'");

			if (font.names.copyright) licenses[font.names.fontFamily.en] = font.names.copyright.en;

			fonts.push("[\"fonts/" + file + "\", \"" + font.names.fontFamily.en + "\"]");

			callback();
		});
	}, function() {
		console.log("Writing file");

		fs.writeFileSync("./js/fonts.js", "var files=[" + fonts.join(",") + "];");

		console.log("Writing licenses");

		Object.keys(licenses).forEach(function(font) {
			fs.writeFileSync("./fonts/licenses/" + path.normalize(font), licenses[font]);

			console.log("License for " + font + " writed");
		});

		console.log("Done.");
	});
});