function getRandomFont() {
	var i = Math.floor(Math.random() * files.length);
	var element = files[i];

	files.splice(i, 1);

	return element[1];
}

function textToHTML(text, font) {
	var element = document.createElement("button");

	element.style.fontFamily = font;
	element.innerHTML = text;

	return element;
}