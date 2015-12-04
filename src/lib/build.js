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
					while (j < max) {
						cast.push({
							el: actors[j],
							opacity: typeof node.opacity === 'number' ? node.opacity : false,
							translateX: typeof node.translateX === 'number' ? node.translateX : false,
							translateY: typeof node.translateY === 'number' ? node.translateY : false,
							rotate: typeof node.rotate === 'number' ? node.rotate : false,
							scale: typeof node.scale === 'number' ? node.scale : false
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
