(function () {
  var selectorsByTab = {},
      defaultSelector = '';

  function updateCountDisplay(newCount) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      if (tabs[0]) {
        newCount = newCount || '';
        chrome.browserAction.setBadgeText({text: '' + newCount, tabId: tabs[0].id});
      }
    });
  }

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var senderTab = (sender.tab || {}),
        tabId = request.tab || senderTab.id || -1;
    if (request.req === 'getSelector') {
      sendResponse(selectorsByTab[tabId] || defaultSelector);
    }
    else if (request.req === 'updateSelector') {
      selectorsByTab[request.tab] = request.value;
      // Forward the message to the correct tab
      chrome.tabs.sendMessage(request.tab, request, function () {
      });
    }
    else if (request.req === 'updateCount') {
      updateCountDisplay(request.count);
    }
  });
  chrome.storage.sync.get({defaultSelector: 250}, function (items) {
    defaultSelector = items.defaultSelector;
  });
  chrome.storage.onChanged.addListener(function (changes) {
    if (changes.defaultSelector) {
      defaultSelector = changes.defaultSelector.newValue;
      chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {value: defaultSelector}, function () {
        });
      });
    }
  });
  chrome.tabs.onRemoved.addListener(function (tabId) {
    delete selectorsByTab[tabId];
  });
})();