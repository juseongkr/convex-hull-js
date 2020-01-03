const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
let p = [];

function Ready() {
	canvas.addEventListener("click", event => {
		let circle = new Path2D();
		circle.arc(event.layerX, event.layerY, 2, 0, Math.PI * 2);
		ctx.fill(circle);
		p.push(new Point(event.layerX, event.layerY));
	});
}

function Draw() {
	if (p.length !== 0) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		p = scan(p).slice();
		p.push(p[0]);
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = "blue";
		ctx.moveTo(p[0].x, p[0].y);
		for (let i=1; i<p.length; ++i) {
			ctx.lineTo(p[i].x, p[i].y);
			ctx.moveTo(p[i].x, p[i].y);
			ctx.stroke();
		}
		document.getElementById("area").innerHTML = "Area: " + getArea(p);
	}
}

function Clear() {
	p = [];
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	document.getElementById("area").innerHTML = "Area: 0";
}