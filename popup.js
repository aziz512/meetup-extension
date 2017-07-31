document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("replaceEditorButton").addEventListener("click", replaceEditor);
});


function replaceEditor(){
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"type": "REPLACE_EDITOR"});
  });
}