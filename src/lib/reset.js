export default function (tree) {
	tree.forEach(function (scene) {
		scene.nodes.forEach(function (actor) {
			actor.el.style.cssText = '';
		});
	});
}
