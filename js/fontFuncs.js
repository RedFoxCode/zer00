function getRandomFont() {
	var element = files[Math.floor(Math.random() * files.length)];

	return element[1];
}

function textToHTML(text, font) {
	var element = document.createElement("button");

	element.style.fontFamily = font;
	element.innerHTML = text;

	return element;
}