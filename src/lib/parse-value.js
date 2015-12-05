export default function (value, def) {
	if (typeof value === 'number') {
		return {
			number: value,
			unit: def || ''
		};
	}

	if (typeof value !== 'string') {
		return false;
	}

	var pos = 0;
	var max = value.length;
	var code;

	while (pos < max) {
		code = value.charCodeAt(pos);
		if (!(code === 43 || code === 45 || code === 46) && (code < 47 || 58 < code)) {
			break;
		}
		pos += 1;
	}

	var number = Number(value.slice(0, pos));

	if (isNaN(number)) {
		return false;
	}

	return {
		number: number,
		unit: value.slice(pos)
	};
}
