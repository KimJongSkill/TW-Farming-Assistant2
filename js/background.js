chrome.pageAction.onClicked.addListener(() => {
	chrome.tabs.executeScript({ file: "/js/farm.js" });
});

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.get(["Profile", "Delay"], ({ Profile, Delay }) => {
		if (!Profile || !Delay) {
			chrome.storage.sync.set({
				"Profile": "Auto",
				"Delay": 225
			});
		}
	});
});
