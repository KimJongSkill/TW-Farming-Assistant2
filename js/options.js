Status.Set = function()
{
	if (chrome.runtime.lastError == null)
		document.getElementById("Status").textContent = "Success";
	else
		document.getElementById("Status").textContent = "Failed";
	
	window.setTimeout(Status.Clear, 750 /* ms */);
}

Status.Clear = function()
{
	document.getElementById("Status").textContent = "";
}

function Save()
{
	var Template = document.querySelector("input[name=Template]:checked");
	var Delay = document.getElementById("DelayForm").querySelector("input");
	
	chrome.storage.sync.set(
	{
		"Profile": Template.value,
		"Delay": window.parseInt(Delay.value)
	}, Status.Set);
}

function Restore()
{
	chrome.storage.sync.get(["Profile", "Delay"], function(Item)
	{	
		if (Item.Profile != null)
			document.getElementById("TemplateForm").querySelector("input[value=" + Item.Profile + "]").checked = true;
		if (Item.Delay != null)
			document.getElementById("DelayForm").querySelector("input").value = Item.Delay;
	});
}

document.addEventListener("DOMContentLoaded", Restore);
document.getElementById("Save").addEventListener("click", Save);
