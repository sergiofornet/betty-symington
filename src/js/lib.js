import wait from 'waait';
import MoveTo from 'moveto';
import { switchText, linearToSin } from './util';

const triggers = document.querySelectorAll('.js-trigger');
const moveto = new MoveTo({
	tolerance: 0,
	duration: 1800,
	easing: 'easeOutQuart',
});

export const bettyInnerText = {
	original: 'my name is Betty Symington.',
	alt: 'well... it is not, but 🤫.',
};

Array.from(triggers).map(trigger => moveto.registerTrigger(trigger));

export function handleVisibilityChange() {
	const titleText = {
		original: 'betty symington // frontend developer',
		alt: "hello? 🕳️ I'm still here...",
	};
	document.title = switchText(titleText, document.title);
}

export function timeToHsl(time = new Date()) {
	const h = (time.getSeconds() * 360) / 60;
	const s = linearToSin(time.getMinutes(), 60, 100, 40);
	const l = linearToSin(time.getHours(), 24, 100, 20);
	return { h, s, l };
}

export function setTimeHsl() {
	document.documentElement.style.setProperty(
		'--timeBackground',
		`hsl(${timeToHsl().h}, ${timeToHsl().s}%, ${timeToHsl().l}%)`
	);
}

async function change(elt) {
	elt.classList.add('change');
	await wait(250);
	elt.classList.remove('change');
}

export function clock() {
	const time = new Date();
	const clockElt = document.querySelector('.clock');
	const secondsElt = clockElt.querySelector('.clock__seconds');
	const minutesElt = clockElt.querySelector('.clock__minutes');
	const hoursElt = clockElt.querySelector('.clock__hours');
	const hoursValue = `${
		time.getHours() >= 10 ? time.getHours() : `0${time.getHours()}`
	}`;
	const minutesValue = `${
		time.getMinutes() >= 10 ? time.getMinutes() : `0${time.getMinutes()}`
	}`;
	const secondsValue = `${
		time.getSeconds() >= 10 ? time.getSeconds() : `0${time.getSeconds()}`
	}`;

	if (hoursElt.innerText !== hoursValue) {
		hoursElt.innerText = hoursValue;
		change(hoursElt);
	}
	if (minutesElt.innerText !== minutesValue) {
		minutesElt.innerText = minutesValue;
		change(minutesElt);
	}
	if (secondsElt.innerText !== secondsValue) {
		secondsElt.innerText = secondsValue;
		change(secondsElt);
	}
	requestAnimationFrame(clock);
}

export function obCallback(entry) {
	if (entry[0].intersectionRatio === 1) {
		entry[0].target.querySelector('.betty').classList.toggle('highlight');
		entry[0].target.querySelector('.betty').innerText = switchText(
			bettyInnerText,
			entry[0].target.querySelector('.betty').innerText
		);
	}
}
