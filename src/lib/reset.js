import { transform as transformProp } from './props';

export default function (tree) {
	tree.forEach(function (scene) {
		scene.nodes.forEach(function (actor) {
			actor.el.style.opacity = '';
			actor.el.style[transformProp] = '';
		});
	});
}
