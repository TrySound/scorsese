import parseValue from './parse-value';

export default function (config) {
	return config.reduce(function (movie, node) {
		var scenes = document.querySelectorAll(node.scene);
		for (var i = 0, max = scenes.length; i < max; i += 1) {
			movie.push({
				el: scenes[i],
				nodes: node.cast.reduce(function (cast, node) {
					var actors = scenes[i].querySelectorAll(node.actor);
					var opacity = parseValue(node.opacity);
					var translateX = parseValue(node.translateX, 'px');
					var translateY = parseValue(node.translateY, 'px');
					var rotate = parseValue(node.rotate, 'deg');
					var scale = parseValue(node.scale);
					for (var j = 0, max = actors.length; j < max; j += 1) {
						cast.push({
							el: actors[j],
							opacity: opacity,
							translateX: translateX,
							translateY: translateY,
							rotate: rotate,
							scale: scale,
							easing: node.easing
						});
					}
					return cast;
				}, [])
			});
		}
		return movie;
	}, []);
}
