document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("replaceEditorButton").addEventListener("click", replaceEditor);

  document.getElementById("sendOutReminderButton").addEventListener("click", sendOutReminder);
});


function replaceEditor(){
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"type": "REPLACE_EDITOR"});
  });
}

function sendOutReminder(){
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"type": "MESSAGE_ABOUT_NAME"});
  });
}