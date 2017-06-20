/* global $ $$ */

(global => {
  const tooltip = `
  <div class="tooltip-item" style="margin-top: 20px;">
    <div class="tooltip">
      <p>Click this link for a quick 10 second demo of Pingy CLI in action</p>
    </div>
  </div>`;
  const pingyServing = `<span>  </span><span style="color: rgb(51, 255, 0);">_</span><span style="color: rgb(0, 102, 255);">_</span><span style="color: rgb(204, 0, 255);">_</span><span style="color: rgb(255, 0, 0);">_</span><span>  </span><span style="color: rgb(0, 102, 255);">_</span><span>                   </span>
<span> </span><span style="color: rgb(255, 0, 0);">|</span><span>  </span><span style="color: rgb(0, 102, 255);">_</span><span> </span><span style="color: rgb(255, 0, 0);">\\</span><span style="color: rgb(255, 255, 0);">(</span><span style="color: rgb(51, 255, 0);">_</span><span style="color: rgb(0, 102, 255);">)</span><span style="color: rgb(204, 0, 255);">_</span><span> </span><span style="color: rgb(255, 255, 0);">_</span><span style="color: rgb(51, 255, 0);">_</span><span>   </span><span style="color: rgb(255, 255, 0);">_</span><span style="color: rgb(51, 255, 0);">_</span><span> </span><span style="color: rgb(204, 0, 255);">_</span><span> </span><span style="color: rgb(255, 255, 0);">_</span><span>   </span><span style="color: rgb(255, 0, 0);">_</span><span> </span>
<span> </span><span style="color: rgb(204, 0, 255);">|</span><span> </span><span style="color: rgb(255, 255, 0);">|</span><span style="color: rgb(51, 255, 0);">_</span><span style="color: rgb(0, 102, 255);">)</span><span> </span><span style="color: rgb(255, 0, 0);">|</span><span> </span><span style="color: rgb(51, 255, 0);">|</span><span> </span><span style="color: rgb(204, 0, 255);">'</span><span style="color: rgb(255, 0, 0);">_</span><span> </span><span style="color: rgb(51, 255, 0);">\\</span><span> </span><span style="color: rgb(204, 0, 255);">/</span><span> </span><span style="color: rgb(255, 255, 0);">_</span><span style="color: rgb(51, 255, 0);">\`</span><span> </span><span style="color: rgb(204, 0, 255);">|</span><span> </span><span style="color: rgb(255, 255, 0);">|</span><span> </span><span style="color: rgb(0, 102, 255);">|</span><span> </span><span style="color: rgb(255, 0, 0);">|</span>
<span> </span><span style="color: rgb(0, 102, 255);">|</span><span>  </span><span style="color: rgb(255, 255, 0);">_</span><span style="color: rgb(51, 255, 0);">_</span><span style="color: rgb(0, 102, 255);">/</span><span style="color: rgb(204, 0, 255);">|</span><span> </span><span style="color: rgb(255, 255, 0);">|</span><span> </span><span style="color: rgb(0, 102, 255);">|</span><span> </span><span style="color: rgb(255, 0, 0);">|</span><span> </span><span style="color: rgb(51, 255, 0);">|</span><span> </span><span style="color: rgb(204, 0, 255);">(</span><span style="color: rgb(255, 0, 0);">_</span><span style="color: rgb(255, 255, 0);">|</span><span> </span><span style="color: rgb(0, 102, 255);">|</span><span> </span><span style="color: rgb(255, 0, 0);">|</span><span style="color: rgb(255, 255, 0);">_</span><span style="color: rgb(51, 255, 0);">|</span><span> </span><span style="color: rgb(204, 0, 255);">|</span>
<span> </span><span style="color: rgb(51, 255, 0);">|</span><span style="color: rgb(0, 102, 255);">_</span><span style="color: rgb(204, 0, 255);">|</span><span>   </span><span style="color: rgb(0, 102, 255);">|</span><span style="color: rgb(204, 0, 255);">_</span><span style="color: rgb(255, 0, 0);">|</span><span style="color: rgb(255, 255, 0);">_</span><span style="color: rgb(51, 255, 0);">|</span><span> </span><span style="color: rgb(204, 0, 255);">|</span><span style="color: rgb(255, 0, 0);">_</span><span style="color: rgb(255, 255, 0);">|</span><span style="color: rgb(51, 255, 0);">\\</span><span style="color: rgb(0, 102, 255);">_</span><span style="color: rgb(204, 0, 255);">_</span><span style="color: rgb(255, 0, 0);">,</span><span> </span><span style="color: rgb(51, 255, 0);">|</span><span style="color: rgb(0, 102, 255);">\\</span><span style="color: rgb(204, 0, 255);">_</span><span style="color: rgb(255, 0, 0);">_</span><span style="color: rgb(255, 255, 0);">,</span><span> </span><span style="color: rgb(0, 102, 255);">|</span>
<span>                </span><span style="color: rgb(255, 255, 0);">|</span><span style="color: rgb(51, 255, 0);">_</span><span style="color: rgb(0, 102, 255);">_</span><span style="color: rgb(204, 0, 255);">_</span><span style="color: rgb(255, 0, 0);">/</span><span> </span><span style="color: rgb(51, 255, 0);">|</span><span style="color: rgb(0, 102, 255);">_</span><span style="color: rgb(204, 0, 255);">_</span><span style="color: rgb(255, 0, 0);">_</span><span style="color: rgb(255, 255, 0);">/</span><span> </span>

<span>Serving at <span id="fakeLink">http://localhost:57954</span></span>${tooltip}`;

  const terminal = `
  <div class="terminal macos dark">
    <div class="toolbar transparent">
      <div class="close"></div>
      <div class="minimize"></div>
      <div class="zoom"></div>
      <div class="title">dave@Daves-MacBook: ~/code/my-site</div>
    </div>
    <div class="inner">
      <span style="color:rgb(51, 255, 0); padding-right: 10px;">➜</span>
      <span style="color: rgb(0, 255, 255); font-weight: bold;">my-site</span>
      <span style="color: #999">&gt;</span>
      <span class="terminal-text" id="terminalText"></span>

      <div id="pingyServeText" style="display:none; white-space: pre;">${pingyServing}</div><span id="terminalCursor" class="cursor"></span>
    </div>
  </div>`;

  const $terminal = $('terminal');
  $terminal.innerHTML = terminal;
  const $tooltip = $('.tooltip-item', $terminal);
  const $fakeLink = $('#fakeLink');

  async function terminalStart() {
    const $terminalText = $('#terminalText');
    const $terminalCursor = $('#terminalCursor');
    const $pingyServeText = $('#pingyServeText');

    await eraseAndType($terminalText, 'pingy dev');
    $terminalCursor._.style({
      display: 'block',
      marginLeft: '0',
    });
    await wait(400);
    $pingyServeText.style.display = 'block';
    await wait(400);
    $tooltip.classList.add('active');
    // next();
  }

  $tooltip.addEventListener('click', next);
  $fakeLink.addEventListener('click', next);
  function next() {
    $tooltip.classList.remove('active');
    global.browser.init();
  }

  global.terminal = {
    init: terminalStart,
  };
})(window);
