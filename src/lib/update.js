import style from './style';

export default function (tree) {
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
				style(actor, ratio);
			});
		}
	});
}
