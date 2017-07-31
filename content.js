window.onload = function () {
  console.log('aa');
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch(request.type){
      case 'REPLACE_EDITOR':
        replaceEditor();
    }
  }
);

function replaceEditor(){
  var script = document.createElement('script');
  script.src = 'https://rawgit.com/aziz512/meetup-extension/master/addScripts.js';
  script.type = 'text/javascript';
  document.head.appendChild(script);
}