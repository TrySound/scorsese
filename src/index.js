import buildTree from './lib/build';
import resetTree from './lib/reset';
import updateTree from './lib/update';

export default function scorsese(config, opts) {
	config = Array.isArray(config) ? config : [];
	opts = opts || {};

	var tree = buildTree(config);
	var boundUpdate = updateTree.bind(null, tree);
	var boundRequest = requestAnimationFrame.bind(null, boundUpdate);
	updateTree(tree);
	window.addEventListener('scroll', boundRequest);

	return {
		update: function () {
			updateTree(tree);
		},
		destroy: function () {
			window.removeEventListener('scroll', boundRequest);
			resetTree(tree);
		}
	};
}
