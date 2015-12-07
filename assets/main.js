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

window.addEventListener('load', function () {
	inst.update();
});

var enabled = true;

function update(inst) {
	if (window.innerWidth < 800) {
		if (enabled) {
			inst.destroy();
			enabled = false;
		}
	} else {
		if (!enabled) {
			inst.reinit();
			enabled = true;
		} else {
			inst.update();
		}
	}
}

update(inst);
window.addEventListener('resize', function () {
	update(inst);
});
