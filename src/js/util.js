export function linearToSin(value, domain, range, offset = 0) {
	return Math.sin((value * Math.PI) / domain) * (range - 2 * offset) + offset;
}

export function switchText({ original, alt }, text) {
	return text === original ? alt : original;
}

export function handleVhValue() {
	const vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}
