import {
	setTimeHsl,
	clock,
	handleVisibilityChange,
	obCallback,
	bettyInnerText,
} from './lib';
import { handleVhValue, switchText } from './util';

function init() {
	if (window.IntersectionObserver) {
		const ob = new IntersectionObserver(obCallback, {
			threshold: 1,
			rootMargin: '-25% 0px',
		});
		const infoSection = document.querySelector('#info');
		ob.observe(infoSection.querySelector('.info__middle'));
	} else {
		const betty = document.querySelector('.betty');
		betty.addEventListener('mouseover', () => {
			betty.classList.toggle('highlight');
			betty.innerText = switchText(bettyInnerText, betty.innerText);
		});
	}

	setInterval(setTimeHsl, 5000);
	requestAnimationFrame(clock);
	setTimeHsl();
	handleVhValue();
	window.addEventListener('resize', handleVhValue);
	document.addEventListener('visibilitychange', handleVisibilityChange);
}

export default init;
