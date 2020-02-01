const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
let p = [];

function ready() {
	canvas.addEventListener("click", event => {
		let circle = new Path2D();
		circle.arc(event.layerX, event.layerY, 2, 0, Math.PI * 2);
		ctx.fill(circle);
		p.push(new Point(event.layerX, event.layerY));
	});
}

function drawConvex() {
	if (p.length !== 0) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		let sp = scan(p).slice();
		sp.push(sp[0]);
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#6699ff";
		ctx.moveTo(sp[0].x, sp[0].y);
		sp.shift();
		sp.forEach(pos => {
			ctx.lineTo(pos.x, pos.y);
			ctx.moveTo(pos.x, pos.y);
			ctx.stroke();
		});
		p.forEach(pos => {
			let circle = new Path2D();
			circle.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
			ctx.fill(circle);
		});

		document.getElementById("area").innerHTML = "Area: " + getArea(p);
	}
}

function clearBoard() {
	p = [];
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	document.getElementById("area").innerHTML = "Area: 0";
}