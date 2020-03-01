function handleVisibilityChange() {
	if (document.hidden) {
		document.title = 'hello? 🕳️ I\'m still here...';
	} else {
		document.title = 'betty symington // frontend developer';
	}
}

document.addEventListener("visibilitychange", handleVisibilityChange, false);