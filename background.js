chrome.pageAction.onClicked.addListener(function()
{
	chrome.tabs.executeScript({file: "farm.js"});
});

chrome.runtime.onInstalled.addListener(function()
{
	chrome.storage.sync.get(["Profile", "Delay"], function(Items)
	{
		if (!Items.Profile || !Items.Delay)
		{
			chrome.storage.sync.set(
			{
				"Profile": "Auto",
				"Delay": 225
			});
		}
	});
});
