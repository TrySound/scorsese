import buildTree from './lib/build-tree';
import resetTree from './lib/reset-tree';
import updateTree from './lib/update-tree';

export default function scorsese(config) {
	config = Array.isArray(config) ? config : [];

	var enabled = false;
	var tree = buildTree(config);
	var boundUpdate = updateTree.bind(null, tree);
	var boundRequest = requestAnimationFrame.bind(null, boundUpdate);
	init();

	function init() {
		enabled = true;
		updateTree(tree);
		window.addEventListener('scroll', boundRequest);
	}

	function destroy() {
		enabled = false;
		window.removeEventListener('scroll', boundRequest);
		resetTree(tree);
	}

	return {
		reinit: function () {
			destroy();
			init();
		},
		update: function (breakpoint) {
			if (typeof breakpoint === 'number') {
				if (window.innerWidth < breakpoint) {
					if (enabled) {
						destroy();
					}
				} else {
					if (!enabled) {
						init();
					} else {
						boundRequest();
					}
				}
			} else {
				boundRequest();
			}
		},
		destroy: function () {
			destroy();
		}
	};
}
