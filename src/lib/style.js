import { transform as transformProp } from './props';

export default function (actor, ratio) {
	var style = actor.el.style;

	if (actor.opacity !== false) {
		style.opacity = ratio * actor.opacity;
	}

	var transform = '';
	if (actor.translateX !== false) {
		transform += ' translateX(' + ratio * actor.translateX + 'px)';
	}
	if (actor.translateY !== false) {
		transform += ' translateY(' + ratio * actor.translateY + 'px)';
	}
	if (actor.scale !== false) {
		transform += ' scale(' + ratio * actor.scale + ')';
	}
	if (actor.rotate !== false) {
		transform += ' rotate(' + ratio * actor.rotate + 'deg)';
	}
	if (transform) {
		style[transformProp] = transform;
	}
}
