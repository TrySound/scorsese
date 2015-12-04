import buildTree from './lib/build';
import resetTree from './lib/reset';
import updateTree from './lib/update';

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
