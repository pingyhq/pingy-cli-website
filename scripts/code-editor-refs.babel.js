/* global $ $$ */
(global => {
  const {eraseAndType, addClassTransition} = utils;
  const innerCode = `&lt;<span class="hljs-keyword">link</span> <span class="hljs-property">href</span>=&quot;<span class="hljs-string">main.<span id="less-ext">less</span></span>&quot;&gt;
&lt;<span class="hljs-keyword">script</span> <span class="hljs-property">src</span>=&quot;<span class="hljs-string">app.<span id="coffee-ext">coffee</span></span>&quot;&gt;&lt;/<span class="hljs-keyword">script</span>&gt;
`;

  const html = `
  <div class="code-editor-refs">
    <div class="toolbar">
      <div class="close"></div>
      <div class="minimize"></div>
      <div class="zoom"></div>
      index.html
      <span class="sub-title">— my-site</span>
    </div>
    <div class="editor">
      <pre><code>${innerCode}</code></pre>
    </div>
  </div>
  `;
  $$('code-editor-refs').forEach(el => (el.innerHTML = html));

  async function init() {
    const $codeEditor = $('.code-editor-refs');
    const lessExt = $('#less-ext');
    const coffeeExt = $('#coffee-ext');
    // $('.cursor-container').style.position = 'absolute';
    // utils.blinkingCursor.classList.remove('black');
    // await utils.showCursor();

    // await utils.moveCursorToEl(lessExt);
    // await utils.click();
    // utils.insertAfter(utils.blinkingCursor, lessExt);
    // await utils.wait(utils.typingInterval * 2);

    if (lessExt.innerHTML === 'css') {
      lessExt.innerHTML = 'less';
      coffeeExt.innerHTML = 'coffee';
      await utils.wait(utils.typingInterval * 8);
    }

    await utils.eraseAndType(lessExt, 'css', utils.typingInterval * 2);
    await utils.wait(utils.typingInterval * 8);

    // await utils.moveCursorToEl(coffeeExt);
    // await utils.click();
    // utils.blinkingCursor.remove();
    // utils.insertAfter(utils.blinkingCursor, coffeeExt);
    // await utils.wait(utils.typingInterval * 2);

    await utils.eraseAndType(coffeeExt, 'js', utils.typingInterval * 2);
    // utils.blinkingCursor.remove();

    // await utils.hideCursor();
  }

  global.codeEditorRefs = {
    init,
  };
})(window);
