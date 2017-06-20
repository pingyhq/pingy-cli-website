/* global $ $$ */
(global => {
  const {
    eraseAndType,
    addClassTransition
  } = utils;
  const html = `
  <div class="code-editor" id="less-code-editor">
    <div class="toolbar">
      <div class="close"></div>
      <div class="minimize"></div>
      <div class="zoom"></div>
      main.less
      <span class="sub-title">— my-site</span>
    </div>
    <div class="editor">
      <pre><code><span class="hljs-property">.grid-item</span> {
  <span class="hljs-keyword">background</span>: <span id="grid-background">white</span>;
  <span class="hljs-keyword">height</span>: <span id="grid-height">10em</span>;
  <span class="hljs-property">p</span> {
    <span class="hljs-keyword">display</span>: <span id="grid-p-display">block</span>;
  }
}</code></pre>
    </div>
  </div>
  `;
  $$('code-editor').forEach(el => el.innerHTML = html);

  async function doLiveReload() {
    // $('.cursor-container').style.position = 'absolute';
    // await utils.showCursor();
    // utils.blinkingCursor.classList.remove('black');
    await utils.changeRule($('#grid-background'), '.web-browser .grid-item', 'background', 'LightBlue');
    await wait(400);

    await utils.changeRule($('#grid-p-display'), '.web-browser .grid-item p', 'display', 'none');
    await wait(400);

    await utils.changeRule($('#grid-height'), '.web-browser .grid-item', 'height', '7em');
    await wait(400);

    // await utils.hideCursor();
    // utils.blinkingCursor.remove();
  }

  async function init() {
    const $codeEditor = $('.code-editor');
    const $finsihedDemo = $('.finished-demo-text');

    $codeEditor.style.zIndex = '2';
    await $codeEditor._.transition({'transform': 'scale(1)'});
    await doLiveReload();
    await wait(200);
    $finsihedDemo.style.display = 'block';
    await wait(200);
    await $finsihedDemo._.transition({'transform': 'scale(1)'});
  }

  global.codeEditor = {
    init
  };
})(window);
