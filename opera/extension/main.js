/*globals opera, gitHubNotifCount */
(function () {
	'use strict';

	function render(badgeText, color, title) {
		var badge = button.badge;
		badge.textContent = badgeText;
		badge.backgroundColor = color;
		badge.display = 'block';
		button.title = title;
	}

	function update() {
		if (window.navigator.onLine) {
			gitHubNotifCount(function (count) {
				if (count !== false) {
					render(count, 'rgba(65, 131, 196, 1)', button.title);
				} else {
					render(':(', 'rgba(166, 41, 41, 1)', 'You have to be connected to the internet and logged into GitHub');
				}
			});
		} else {
			render(':(', 'rgba(166, 41, 41, 1)', 'You have to be connected to the internet');
		}
	}

	var UPDATE_INTERVAL = 1000 * 60;

	var button = opera.contexts.toolbar.createItem({
		title: 'GitHub Notifier',
		icon: 'icon-18.png',
		onclick: function () {
			opera.extension.tabs.create({
				url: 'https://github.com/inbox/notifications',
				focused: true
			});
		},
		// Must be specified, otherwise it won't show
		badge: {}
	});

	opera.contexts.toolbar.addItem(button);

	setInterval(update, UPDATE_INTERVAL);

	update();
})();
