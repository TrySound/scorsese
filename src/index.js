import buildTree from './lib/build';
import resetTree from './lib/reset';
import updateTree from './lib/update';

export default function scorsese(config) {
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
