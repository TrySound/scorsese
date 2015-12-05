'use strict';

function parseValue (value, def) {
	if (typeof value === 'number') {
		return {
			number: value,
			unit: def || ''
		};
	}

	if (typeof value !== 'string') {
		return false;
	}

	var pos = 0;
	var max = value.length;
	var code;

	while (pos < max) {
		code = value.charCodeAt(pos);
		if (!(code === 43 || code === 45 || code === 46) && (code < 47 || 58 < code)) {
			break;
		}
		pos += 1;
	}

	var number = Number(value.slice(0, pos));

	if (isNaN(number)) {
		return false;
	}

	return {
		number: number,
		unit: value.slice(pos)
	};
}

function buildTree (config) {
	return config.reduce(function (movie, node) {
		var scenes = document.querySelectorAll(node.scene);
		var i = 0;
		var max = scenes.length;
		while (i < max) {
			movie.push({
				el: scenes[i],
				nodes: (node.cast || []).reduce(function (cast, node) {
					var actors = scenes[i].querySelectorAll(node.actor);
					var j = 0;
					var max = actors.length;
					var opacity = parseValue(node.opacity);
					var translateX = parseValue(node.translateX, 'px');
					var translateY = parseValue(node.translateY, 'px');
					var rotate = parseValue(node.rotate, 'deg');
					var scale = parseValue(node.scale);
					var easing = typeof node.easing === 'function' ? node.easing : false;
					while (j < max) {
						cast.push({
							el: actors[j],
							opacity: opacity,
							translateX: translateX,
							translateY: translateY,
							rotate: rotate,
							scale: scale,
							easing: easing
						});
						j += 1;
					}
					return cast;
				}, [])
			});
			i += 1;
		}
		return movie;
	}, []);
}

var el = document.createElement('_');
var style = el.style;
var transformProp;
var prop;

if (style[prop = 'webkitTransform'] === '') {
	transformProp = prop;
}

if (style[prop = 'msTransform'] === '') {
	transformProp = prop;
}

if (style[prop = 'transform'] === '') {
	transformProp = prop;
}

function resetTree (tree) {
	tree.forEach(function (scene) {
		scene.nodes.forEach(function (actor) {
			actor.el.style.opacity = '';
			actor.el.style[transformProp] = '';
		});
	});
}

function style$1 (actor, ratio) {
	var style = actor.el.style;

	var easing = actor.easing;
	if (easing) {
		ratio = easing(ratio, actor.el);
	}

	var opacity = actor.opacity;
	if (opacity) {
		style.opacity = ratio * opacity.number;
	}

	var transform = '';

	var translateX = actor.translateX;
	if (translateX) {
		transform += ' translateX(' + ratio * translateX.number + translateX.unit + ')';
	}

	var translateY = actor.translateY;
	if (translateY) {
		transform += ' translateY(' + ratio * translateY.number + translateY.unit + ')';
	}

	var scale = actor.scale;
	if (scale) {
		transform += ' scale(' + ratio * scale.number + ')';
	}

	var rotate = actor.rotate;
	if (rotate) {
		transform += ' rotate(' + ratio * rotate.number + rotate.unit + ')';
	}

	if (transform) {
		style[transformProp] = transform;
	}
}

function updateTree (tree) {
	var top = window.pageYOffset;
	var height = window.innerHeight;
	var bottom = top + height;

	tree.forEach(function (scene) {
		var rect = scene.el.getBoundingClientRect();
		var ratio;
		// in view
		if (rect.top < height && rect.bottom > 0) {
			ratio = (height - rect.top) / (height + rect.height);
			scene.nodes.forEach(function (actor) {
				style$1(actor, ratio);
			});
		}
	});
}

function scorsese(config) {
	config = Array.isArray(config) ? config : [];

	var tree = buildTree(config);
	var boundUpdate = updateTree.bind(null, tree);
	var boundRequest = requestAnimationFrame.bind(null, boundUpdate);
	updateTree(tree);
	window.addEventListener('scroll', boundRequest);

	return {
		update: function () {
			boundRequest();
		},
		destroy: function () {
			window.removeEventListener('scroll', boundRequest);
			resetTree(tree);
		}
	};
}

module.exports = scorsese;