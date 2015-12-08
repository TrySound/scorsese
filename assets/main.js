var inst = scorsese([{
	scene: '.pair',
	cast: [{
		actor: '.photo-up',
		translateY: -150
	}, {
		actor: '.photo-down',
		translateY: 150
	}]
}, {
	scene: '.oscar-in',
	cast: [{
		actor: '.photo',
		translateX: 200,
		easing: function (t) {
			return 1 - t;
		}
	}, {
		actor: '.oscar-image',
		scale: 1,
		easing: function (t) {
			return t * 2;
		}
	}]
}, {
	scene: '.oscar-out',
	cast: [{
		actor: '.photo',
		translateX: -350
	}, {
		actor: '.oscar-image',
		scale: 1,
		easing: function (t) {
			return 1 - Math.sqrt(t);
		}
	}]
}]);

inst.update(800);

window.addEventListener('resize', function () {
	inst.update(800);
});

window.addEventListener('load', function () {
	inst.update(800);
});
