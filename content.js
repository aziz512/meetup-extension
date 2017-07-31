localStorage['meetup-extension'] = localStorage['meetup-extension'] ? localStorage['meetup-extension'] : JSON.stringify({ people:{} });

window.onload = messageMember;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch(request.type){
      case 'REPLACE_EDITOR':
        replaceEditor();
        break;
      case 'MESSAGE_ABOUT_NAME':
        messageMembers();
    }
  }
);

function messageMembers() {
  var membersLinks = [].slice.call(document.getElementsByClassName('member-name')).map(h5 => h5.querySelector('a'));
  var fullNameRegex = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,} [a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}/;
  membersLinks = membersLinks.filter(a => !fullNameRegex.test(a.innerText));
  var storage = JSON.parse(localStorage['meetup-extension']);
  membersLinks.forEach(link => {
    storage.people[link.href] = false;
    link.target = '_blank';
    link.click();
  });
  storage.lastHref = membersLinks[membersLinks.length-1].href;
  localStorage['meetup-extension'] = JSON.stringify(storage);
}


function replaceEditor(){
  var script = document.createElement('script');
  script.src = 'https://rawgit.com/aziz512/meetup-extension/master/addScripts.js';
  script.type = 'text/javascript';
  document.head.appendChild(script);
}


function messageMember(){
  var storage = JSON.parse(localStorage['meetup-extension']);
  if(window.location.href.includes('members/') && !storage.people[window.location.href]){
    var msgBtn = document.getElementsByClassName('icon-messaging-messages-outline')[0];
    if(msgBtn){
      msgBtn.click();
      document.getElementById('messaging-new-convo').value = 'Hello! in order to attend our meetups please edit your profile and add your full name.';
      document.getElementById('messaging-new-send').disabled = false;
      document.getElementById('messaging-new-send').click();
    }
    storage.people[window.location.href] = true;
    if(window.location.href === storage.lastHref){
      storage = {people:{}};
    }
    localStorage['meetup-extension'] = JSON.stringify(storage);

  }
}