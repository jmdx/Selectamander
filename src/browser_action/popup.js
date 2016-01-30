window.onload = function () {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    function requestUpdate() {
      chrome.runtime.sendMessage({req: 'updateSelector', tab: tabs[0].id, value: cssSelector.value}, function () {});
    }
    chrome.runtime.sendMessage({req: "getSelector", tab: tabs[0].id}, function (response) {
      cssSelector.value = response;
      requestUpdate();
    });
    cssSelector.addEventListener('input', requestUpdate);
  });
};