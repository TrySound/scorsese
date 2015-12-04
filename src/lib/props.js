var el = document.createElement('_');
var style = el.style;
var transform;
var prop;

if (style[prop = 'webkitTransform'] === '') {
	transform = prop;
}

if (style[prop = 'msTransform'] === '') {
	transform = prop;
}

if (style[prop = 'transform'] === '') {
	transform = prop;
}

export {
	transform
};
