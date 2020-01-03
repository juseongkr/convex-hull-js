class Point {
	x;
	y;
	p;
    q;

	constructor(_x, _y, _p, _q) {
		this.x = _x;
		this.y = _y;
		this.p = _p || 1;
		this.q = _q || 0;
	}
}

function ccw(a, b, c) {
	let t = (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
	if (t > 0) {
		return 1;
	} else if (t < 0) {
		return -1;
	} else {
		return 0;
	}
}

function scan(li) {
	let v = sortPoint(li);
	for (let i=1; i<v.length; ++i) {
		v[i].p = v[i].x - v[0].x;
		v[i].q = v[i].y - v[0].y;
	}

	let s = [];
	v = [v.shift()].concat(sortPoint(v)).slice();
	for (let i=0; i<v.length; ++i) {
		while (s.length >= 2 && ccw(s[s.length-2], s[s.length-1], v[i]) <= 0) {
			s.pop();
		}
		s.push(v[i]);
	}
	return s;
}

function getArea(li) {
	let ret = 0;
	for (let i=0; i<li.length; ++i) {
		ret += (li[i].x * li[(i+1)%li.length].y);
		ret -= (li[i].y * li[(i+1)%li.length].x);
	}
	return Math.abs(ret) / 100;
}

function sortPoint(li) {
	let v = li.slice();
	v.sort((b, a) => {
		if (a.q * b.p !== a.p * b.q) {
			return a.q * b.p < a.p * b.q ? 1 : -1;
		}
		if (a.y !== b.y) {
			return a.y < b.y ? 1 : -1;
		}
		return a.x < b.x ? 1 : -1;
	});
	return v;
}