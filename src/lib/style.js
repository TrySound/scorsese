import { transform as transformProp } from './props';

export default function (actor, ratio) {
	var style = actor.el.style;

	var easing = actor.easing;
	if (easing) {
		ratio = easing(ratio, actor.el);
	}

	var opacity = actor.opacity;
	if (opacity) {
		style.opacity = ratio * opacity.number;
	}

	var transform = '';

	var translateX = actor.translateX;
	if (translateX) {
		transform += ' translateX(' + ratio * translateX.number + translateX.unit + ')';
	}

	var translateY = actor.translateY;
	if (translateY) {
		transform += ' translateY(' + ratio * translateY.number + translateY.unit + ')';
	}

	var scale = actor.scale;
	if (scale) {
		transform += ' scale(' + ratio * scale.number + ')';
	}

	var rotate = actor.rotate;
	if (rotate) {
		transform += ' rotate(' + ratio * rotate.number + rotate.unit + ')';
	}

	if (transform) {
		style[transformProp] = transform;
	}
}
