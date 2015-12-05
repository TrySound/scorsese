import parseValue from './parse-value';

export default function (config) {
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
