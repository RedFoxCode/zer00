var container1 = document.getElementById("container1");
var container2 = document.getElementById("container2");
var counter = document.getElementById("counter");

var correct = 0;
var wrong = 0;

function next() {
	if (files.length === 0) {
		swal({
			title: lang.outOfFonts[0],
			text: lang.outOfFonts[1],
			type: "warning"
		});

		return;
	}

	var font = getRandomFont();
	var element_zero = textToHTML("0", font);
	var element_o = textToHTML("O", font);

	element_zero.style.fontSize = element_o.style.fontSize = "5em";

	element_zero.setAttribute("data-z", "0");
	element_zero.setAttribute("onClick", "clickHandler.call(this);");
	element_o.setAttribute("onClick", "clickHandler.call(this);");

	if (Math.random() > 0.5) {
		container1.innerHTML = element_o.outerHTML;
		container2.innerHTML = element_zero.outerHTML;
	} else {
		container2.innerHTML = element_o.outerHTML;
		container1.innerHTML = element_zero.outerHTML;
	}
}

function clickHandler() {
	console.log(JSON.stringify(this.getAttribute("data-z")));

	if (this.getAttribute("data-z") === "0") {
		swal("", lang.correct, "success");

		correct++;
	} else {
		swal("", lang.wrong, "error");

		wrong++;
	}

	counter.innerHTML = lang.score.replace("%c", correct).replace("%w", wrong);

	next();
}

swal({
	title: lang.welcome[0],
	text: lang.welcome[1],
	type: "info",
	confirmButtonText: lang.welcome[2]
});

if (document.fonts) {
	if (document.fonts.size !== files.length) {
		swal({
			title: lang.failedToLoad[0],
			text: lang.failedToLoad[1].replace("1", files.length - document.fonts.size),
			type: "error"
		});
	}
}

next();