function loadFonts() {
	var output = files
		.map(e => "@font-face { font-family: \"" + e[1] + "\"; src: url(\"" + e[0] + "\") format(\"truetype\"); }")
		.join("\n");
	var head = document.head || document.getElementsByTagName("head")[0];
	var style = document.createElement("style");

	style.type = "text/css";

	if (style.styleSheet) {
		style.styleSheet.cssText = output;
	} else {
		style.appendChild(document.createTextNode(output));
	}

	head.appendChild(style);
}

console.log("Loading " + files.length + " fonts");

loadFonts();