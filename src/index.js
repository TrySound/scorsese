import buildTree from './lib/build-tree';
import resetTree from './lib/reset-tree';
import updateTree from './lib/update-tree';

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
