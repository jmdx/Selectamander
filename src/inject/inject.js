(function () {
  var currentSelector = '',
      debouncedUpdate,
      currentCount = 0,
      emptySelector = ':not(*)';
  function debounce(func, wait, immediate) {
    // (pulled from underscore)
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  function updateSelectorCount() {
    var newCount = document.querySelectorAll(currentSelector || emptySelector).length;
    if (newCount !== currentCount) {
      currentCount = newCount;
      chrome.runtime.sendMessage({req: "updateCount", count: currentCount}, function (response) {});
    }
  }
  debouncedUpdate = debounce(updateSelectorCount, 250);
  document.body.addEventListener('DOMSubtreeModified', function () {
    debouncedUpdate();
  });
  chrome.runtime.onMessage.addListener(function (request) {
    currentSelector = request.value;
    debouncedUpdate();
  });
  chrome.runtime.sendMessage({req: "getSelector"}, function (response) {
    currentSelector = response;
    debouncedUpdate();
  });
  chrome.storage.sync.get({refreshInterval: 250}, function(items) {
    debouncedUpdate = debounce(updateSelectorCount, items.refreshInterval);
  });
})();