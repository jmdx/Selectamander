(function () {
  function save_options() {
    var newSelector = document.getElementById('defaultSelectorSetting').value,
        newRefreshInterval = document.getElementById('refreshIntervalSetting').value;
    chrome.storage.sync.set({
      defaultSelector: newSelector,
      refreshInterval: newRefreshInterval
    }, function () {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function () {
        status.textContent = '';
      }, 750);
    });
  }

  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
      defaultSelector: '',
      refreshInterval: 250
    }, function (items) {
      document.getElementById('defaultSelectorSetting').value = items.defaultSelector;
      document.getElementById('refreshIntervalSetting').value = items.refreshInterval;
    });
  }

  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);
})();
