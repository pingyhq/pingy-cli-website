/* global $ $$ */
(global => {
  const {eraseAndType, addClassTransition} = utils;
  const html = `
  <div class="web-browser">
    <div class="toolbar">
      <div class="close"></div>
      <div class="minimize"></div>
      <div class="zoom"></div>
      <div class="url-bar">
        <span class="url-text"></span>
        <div class="loading-bar"></div>
      </div>
    </div>
    <div class="website">
      <div class="grid-items-lines">
        <div class="grid-item">
          <img src="images/placeholder.png" alt="">
          <h1>Blog</h1>
          <p>Rem, illum. Lorem ipsum dolor sit amet.</p>
        </div>
        <div class="grid-item">
          <img src="images/placeholder.png" alt="">
          <h1>About</h1>
          <p>Dolor sit amet, consectetur adipisicing.</p>
        </div>
        <div class="grid-item">
          <img src="images/placeholder.png" alt="">
          <h1>Contact</h1>
          <p>Lorem ipsum dolor sit amet, elit.</p>
        </div>
      </div>

    </div>
    <div class="tooltip-item" style="margin-top: 20px;">
      <div class="tooltip">
        <p>
          With Pingy CLI, everything just works!<br>
          Let's edit our LESS stylesheet and see Live Reload in action, no config needed.
        </p>
        <button style="margin-top: 10px">Ok, Show Me!</button>
      </div>
    </div>
  </div>
  `;
  $$('web-browser').forEach(el => (el.innerHTML = html));

  async function init() {
    const $webBrowser = $('.web-browser');
    const $urlText = $('.url-text');
    const $website = $('.website');
    const $tooltip = $('.tooltip-item', $webBrowser);

    async function loadWebPage() {
      const $loadingBar = $('.loading-bar');
      const centered =
        $urlText.parentNode.offsetWidth / 2 - $urlText.offsetWidth / 2 - 10;
      await $loadingBar._.transition({width: '100%'});
      $loadingBar.style.opacity = '0';
    }

    await $webBrowser._.transition({transform: 'scale(1)'});
    $('.grid-items-lines').style.opacity = '';

    await wait(400);
    $urlText.innerHTML = 'http://localhost:57954';
    await loadWebPage();
    await addClassTransition($website, 'active');
    $tooltip.classList.add('active');

    $tooltip.addEventListener('click', next);
    function next() {
      $tooltip.classList.remove('active');
      global.codeEditor.init();
    }
  }

  global.browser = {
    init,
  };
})(window);
