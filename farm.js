var IntervalID;

var Delay = 225;
var Profiles = {};

Profiles.A = {
	Value: 0,
	Icon: ".farm_icon_a"
}

Profiles.B = {
	Value: 1,
	Icon: ".farm_icon_b"
}

Profiles.Current = Profiles.B;

chrome.storage.sync.get(["Profile", "Delay"], function(Items)
{
	/*
	*	If an item is not set or an error occured,
	*	the Storage API returns an undefined value.
	*	In that case use the default value and alert
	*	the user.
	*/
	if (Items.Profile == null || Items.Delay == null)
		window.alert("Unable to retrieve settings.\nDefault values will be used.");
	
	Profiles.Current = Profiles[Items.Profile];
	Delay = Items.Delay;
	
	IntervalID = window.setInterval(Click, Delay);
});

var VillageList = document.getElementById("plunder_list").firstElementChild.children;

function GetUnitsHome()
{
	var UnitsList = document.getElementsByClassName("unit-item");
	var Output = {};
	
	for (var i = 0; i < UnitsList.length; ++i)
	{
		Output[UnitsList[i].id] = window.parseInt(UnitsList[i].innerHTML);
	}
	
	return Output;
}

function HasSufficientUnits()
{
	var UnitsHome = GetUnitsHome();
	
	for (var Unit in UnitsHome)
	{
		if (window.parseInt(document.querySelectorAll("[name=" + Unit + "]")
			.item(Profiles.Current.Value).getAttribute("value")) > UnitsHome[Unit])
			return false;
	}
	
	return true;
}

function Click()
{
	if (VillageList.length > 1 && HasSufficientUnits())
		VillageList[1].querySelector(Profiles.Current.Icon).click();
	else
		window.clearInterval(IntervalID);
}
