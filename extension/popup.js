document.addEventListener('DOMContentLoaded', function() {
	document.body.style.width="200px";
    var link = document.getElementById('link');
    link.style.display="block";
    link.style.textAlign="center";
    // onClick's logic below:

    link.addEventListener('click', function() {
        On_Off();
    });
    link.addEventListener('mouseover', function(e) {
        e.target.style.cursor="pointer";
    });
    link.addEventListener('mouseout', function(e) {
        e.target.style.cursor="default";
    });
});
function On_Off() {
    var text="default";
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {data: text}, function(response) {
        });
    });
}
