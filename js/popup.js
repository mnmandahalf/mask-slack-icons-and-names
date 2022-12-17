document.getElementById("trigger").addEventListener("click", () => {
	const queryOptions = { active: true, currentWindow: true };
  chrome.tabs.query(queryOptions, (tabs) =>{
		chrome.tabs.sendMessage(tabs[0].id, "triggered");
	});
});

document.getElementById("trigger-blur").addEventListener("click", () => {
	const queryOptions = { active: true, currentWindow: true };
  chrome.tabs.query(queryOptions, (tabs) =>{
		chrome.tabs.sendMessage(tabs[0].id, "blur-triggered");
	});
});
