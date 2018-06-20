// Obtain list of villages and skip first two elements (they do not represent villages)
const VillageList = Array.from(
	document.getElementById("plunder_list").firstElementChild.children
).splice(2);

const Profiles = {
	A: {
		Value: 0,
		Icon: ".farm_icon_a"
	},

	B: {
		Value: 1,
		Icon: ".farm_icon_b"
	}
};

chrome.storage.sync.get(["Profile", "Delay"], Items => {
	/*
	*	If an item is not set or an error occured,
	*	the Storage API returns an undefined value.
	*	In that case use the default value and alert
	*	the user.
	*/
	if (Items.Profile == null || Items.Delay == null) {
		window.alert("Unable to retrieve settings.\nDefault values will be used.");
		Items.Profile = "Auto"
		Items.Delay = 225;
	}

	if (Items.Profile == "Auto") {
		const Tables = document.querySelectorAll("#content_value > div.vis > div > form tbody");
		const CapacityA = Tables[Profiles.A.Value].lastElementChild.lastElementChild.innerHTML;
		const CapacityB = Tables[Profiles.B.Value].lastElementChild.lastElementChild.innerHTML;

		if (CapacityA > CapacityB) {
			ClickAuto(Items.Delay, Profiles.A, Profiles.B);
		}
		else {
			ClickAuto(Items.Delay, Profiles.B, Profiles.A);
		}
	}
	else {
		ClickSelected(Items.Delay, Profiles[Items.Profile]);
	}
});

function Sleep(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

function GetUnitsHome() {
	const UnitsList = document.getElementsByClassName("unit-item");
	let Output = new Map();

	for (const Unit of UnitsList) {
		Output.set(Unit.id, window.parseInt(Unit.innerHTML));
	}

	return Output;
}

function HasSufficientUnits(Profile) {
	const UnitsHome = GetUnitsHome();

	for (const [Unit, Count] of UnitsHome.entries()) {
		if (window.parseInt(document.querySelectorAll(`[name=${Unit}]`)
			.item(Profile.Value).getAttribute("value")) > Count) {
			return false;
		}
	}

	return true;
}

async function ClickSelected(Interval, Profile) {
	for (const Village of VillageList) {
		if (!HasSufficientUnits(Profile)) break;

		Village.querySelector(Profile.Icon).click();
		await Sleep(Interval);
	}
}

async function ClickAuto(Interval, Max, Min) {
	for (const Village of VillageList) {
		if (Village.getElementsByTagName("img")[2].src.endsWith("1.png") && HasSufficientUnits(Max)) {
			Village.querySelector(Max.Icon).click();
		} else if (HasSufficientUnits(Min)) {
			Village.querySelector(Min.Icon).click();
		} else {
			break;
		}

		await Sleep(Interval);
	}
}
