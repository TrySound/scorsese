'use strict';

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
					while (j < max) {
						cast.push({
							el: actors[j],
							opacity: typeof node.opacity === 'number' ? node.opacity : false,
							translateX: typeof node.translateX === 'number' ? node.translateX : false,
							translateY: typeof node.translateY === 'number' ? node.translateY : false,
							rotate: typeof node.rotate === 'number' ? node.rotate : false,
							scale: typeof node.scale === 'number' ? node.scale : false,
							easing: typeof node.easing === 'function' ? node.easing : false
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

	if (actor.easing !== false) {
		ratio = actor.easing(ratio, actor.el);
	}

	if (actor.opacity !== false) {
		style.opacity = ratio * actor.opacity;
	}

	var transform = '';
	if (actor.translateX !== false) {
		transform += ' translateX(' + ratio * actor.translateX + 'px)';
	}
	if (actor.translateY !== false) {
		transform += ' translateY(' + ratio * actor.translateY + 'px)';
	}
	if (actor.scale !== false) {
		transform += ' scale(' + ratio * actor.scale + ')';
	}
	if (actor.rotate !== false) {
		transform += ' rotate(' + ratio * actor.rotate + 'deg)';
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