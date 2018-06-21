function UpdateStatus() {
	const Status = document.getElementById("Status");
	if (chrome.runtime.lastError == null) {
		Status.textContent = "Success";
	} else {
		Status.textContent = "Failed";
	}

	setTimeout(() => Status.textContent = "", 750);
}

function Save() {
	const Template = document.querySelector("#TemplateForm input[name=Template]:checked");
	const Delay = document.querySelector("#DelayForm input");

	chrome.storage.sync.set({
		"Profile": Template.value,
		"Delay": Number(Delay.value)
	}, UpdateStatus);
}

function Restore() {
	chrome.storage.sync.get(["Profile", "Delay"], ({ Profile, Delay }) => {
		if (Profile != null) {
			document.querySelector(`#TemplateForm input[value=${Profile}]`).checked = true;
		}
		if (Delay != null) {
			document.querySelector("#DelayForm input").value = Delay;
		}
	});
}

document.addEventListener("DOMContentLoaded", Restore);
document.getElementById("Save").addEventListener("click", Save);
