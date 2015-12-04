function getBuildStyleFunction(actor) {
	var hasOpacity = false;
	var hasTransform = false;
	var hasTranslateX = false;
	var hasTranslateY = false;

	if (typeof actor.opacity === 'number') {
		hasOpacity = true;
	}

	if (typeof actor.translateX === 'number') {
		hasTransform = true;
		hasTranslateX = true;
	}

	if (typeof actor.translateY === 'number') {
		hasTransform = true;
		hasTranslateY = true;
	}

	return function (ratio) {
		// translate
		// scale
		// rotate
		// opacity
		var style = '';
		var transform = '';
		if (hasOpacity) {
			style += 'opacity:' + ratio + ';';
		}

		if (hasTransform) {
			style += 'transform:';
			if (hasTranslateX) {
				style += ' translateX(' + (ratio * actor.translateX).toFixed(2) + 'px)';
			}
			if (hasTranslateY) {
				style += ' translateY(' + (ratio * actor.translateY).toFixed(2) + 'px)';
			}
			style += ';';
		}

		return style;
	};
}

function buildTree(config) {
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
							style: getBuildStyleFunction(node)
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

function updateTree(tree) {
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
				actor.el.style.cssText = actor.style(ratio);
			});
		}
	});
}

function resetTree(tree) {
	tree.forEach(function (scene) {
		scene.nodes.forEach(function (actor) {
			actor.el.style.cssText = '';
		});
	});
}

export default function scorsese(config, opts) {
	config = Array.isArray(config) ? config : [];
	opts = opts || {};

	var tree = buildTree(config);
	var boundUpdateTree = updateTree.bind(null, tree);
	var boundRequestUpdate = requestAnimationFrame.bind(null, boundUpdateTree);
	updateTree(tree);
	window.addEventListener('scroll', boundRequestUpdate);

	return {
		refresh: function (newConfig) {
			if (Array.isArray(newConfig)) {
				config = newConfig;
			}
			this.destroy();
			tree = buildTree(config);
			boundUpdateTree = updateTree.bind(null, tree);
			boundRequestUpdate = requestAnimationFrame.bind(null, boundUpdateTree);
			updateTree(tree);
			window.addEventListener('scroll', boundRequestUpdate);
		},
		destroy: function () {
			window.removeEventListener('scroll', boundRequestUpdate);
			resetTree(tree);
		}
	};
}
