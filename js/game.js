var container1 = document.getElementById("container1");
var container2 = document.getElementById("container2");
var counter = document.getElementById("counter");

var correct = 0;
var wrong = 0;

function next() {
	if (files.length === 0) {
		swal({
			title: "Out of fonts!",
			text: "All unique fonts ended, refresh page if you want to play again",
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
		swal("", "Correct!", "success");

		correct++;
	} else {
		swal("", "Wrong!", "error");

		wrong++;
	}

	counter.innerHTML = "Correct: " + correct + " / Wrong: " + wrong;

	next();
}

swal({
	title: "Hello!",
	text: "In this game you should click on zero",
	type: "info",
	confirmButtonText: "Got it!"
});

if (document.fonts) {
	if (document.fonts.size !==files.length) {
		swal({
			title: "Failed to load fonts",
			text: "Some or even all of fonts are corrupted or failed to load. This might happen on mobile devices or old browsers. Sorry about that"
				+ "\n\nFailing fonts: " + (files.length - document.fonts.size),
			type: "error"
		});
	}
}

next();