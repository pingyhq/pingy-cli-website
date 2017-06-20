function pluginEditor(newLanguage) {
  const languageData = languages[newLanguage || chosenLanguage];

  var $el = document.querySelector('plugin-code-editor');
  var title = 'app.' + languageData.extension;
  var subtitle = $el.getAttribute('subtitle');
  var innerCode = languageData.code;

  var html = `
  <div class="code-editor inline">
    <div class="toolbar">
      <div class="close"></div>
      <div class="minimize"></div>
      <div class="zoom"></div>
      ${title}
      <span class="sub-title">— ${subtitle}</span>
    </div>
    <div class="editor">
      <pre><code>${innerCode}</code></pre>
    </div>
  </div>
  `;
  $el.innerHTML = html;
}
pluginEditor();
pluginChangeListeners.push(pluginEditor);
