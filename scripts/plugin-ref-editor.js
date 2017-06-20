function pluginRefEditor(newLanguage) {
  var languageData = languages[newLanguage || chosenLanguage];
  var compiledExtension = languageData.compiledExtension;

  var $el = document.querySelector('plugin-ref-code-editor');
  var title = $el.getAttribute('title');
  var subtitle = $el.getAttribute('subtitle');

  var innerCode;
  if (compiledExtension === 'html') {
    $el.innerHTML = '';
    return;
  } else if (compiledExtension === 'css') {
    innerCode = [
      '  &lt;<span class="hljs-attribute">title</span>&gt;My Site&lt;/<span class="hljs-attribute">title</span>&gt;',
      '  &lt;<span class="hljs-attribute">link</span> <span class="hljs-keyword">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-keyword">href</span>=<span class="hljs-string">&quot;<span class="filename"></span><span class="blinking-cursor">|</span>&quot;</span> /&gt;',
      '&lt;/<span class="hljs-attribute">head</span>&gt;',
    ].join('\n');
  } else {
    innerCode = [
      '    &lt;<span class="hljs-attribute">script</span> <span class="hljs-keyword">src</span>=<span class="hljs-string">&quot;<span class="filename"></span><span class="blinking-cursor">|</span>&quot;</span>&gt;&lt;/<span class="hljs-attribute">script</span>&gt;',
      '  &lt;/<span class="hljs-attribute">body</span>&gt;',
      '&lt;/<span class="hljs-attribute">html</span>&gt;',
    ].join('\n');
  }

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
  var $newClassHere = document.querySelector(
    'plugin-ref-code-editor .filename'
  );

  var toType = 'app.' + compiledExtension;
  function type() {
    $newClassHere.textContent = '';
    window.setTimeout(function() {
      toType.split('').reduce(function(prev, curr, i) {
        var typeThis = prev + curr;
        window.setTimeout(function() {
          $newClassHere.textContent = typeThis;
        }, i * 200);
        return typeThis;
      }, '');
    }, 1000);
  }
  type();
  window.setInterval(type, 5000);
}
pluginRefEditor();
pluginChangeListeners.push(pluginRefEditor);
