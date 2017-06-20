/* global $ $$ */
(function utils() {
  const clicker = $('#clicker');
  const cursor = $('#cursor');

  const blinkingCursor = document.createElement('span');
  blinkingCursor.className = 'blinking-cursor';
  blinkingCursor.innerHTML = '|';

  const typingInterval = 60;
  let cursorX;
  let cursorY;

  document.addEventListener('mousemove', e => {
    cursorX = e.pageX;
    cursorY = e.pageY;
  });

  const insertAfter = (newNode, referenceNode) =>
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  const click = () =>
    new Promise(resolve => {
      clicker.classList.remove('click');
      clicker.offsetWidth;
      clicker.classList.add('click');
      const animationEnded = () => {
        clicker.removeEventListener('animationend', animationEnded);
        resolve();
      };
      clicker.addEventListener('animationend', animationEnded);
    });

  const eraseAndType = async (el, newText, speed) => {
    const erase = function* erase() {
      while (el.textContent.length > 0) {
        yield (el.textContent = el.textContent.slice(0, -1));
      }
    };
    const eraseGen = erase();
    const type = function* type() {
      let currentChar = 1;
      while (currentChar - 1 !== newText.length) {
        el.textContent = newText.slice(0, currentChar);
        yield (currentChar = currentChar + 1);
      }
    };
    const typeGen = type();

    while (!eraseGen.next().done) {
      await wait(speed || typingInterval);
    }
    while (!typeGen.next().done) {
      await wait(speed || typingInterval);
    }
  };

  const getCoords = elem => {
    const box = elem.getBoundingClientRect();
    const body = document.body;
    const docEl = document.documentElement;

    const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    const scrollLeft =
      window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    const clientTop = docEl.clientTop || body.clientTop || 0;
    const clientLeft = docEl.clientLeft || body.clientLeft || 0;

    const top = box.top + scrollTop - clientTop;
    const left = box.left + scrollLeft - clientLeft;

    return {y: Math.round(top), x: Math.round(left)};
  };

  const getEndCoords = node => {
    const coords = getCoords(node);
    coords.x = coords.x + node.offsetWidth;
    return coords;
  };

  const getCenterCoords = node => {
    const coords = getCoords(node);
    coords.x = coords.x + node.offsetWidth / 2;
    coords.y = coords.y + node.offsetHeight / 2;
    return coords;
  };

  const moveCursorTo = ({x, y}, offset = -8, immediate = false) =>
    new Promise(resolve => {
      cursor.classList.remove('no-transition');
      if (immediate) {
        cursor.classList.add('no-transition');
        wait(100).then(() => cursor.classList.remove('no-transition'));
      }
      cursor.style.transform = `translate(${x + offset}px, ${y}px)`;
      if (immediate) {
        return resolve();
      }
      const transitionFinished = e => {
        if (e.propertyName === 'transform') {
          resolve();
        }
      };
      cursor.addEventListener('transitionend', transitionFinished);
    });

  const moveCursorToEl = (node, offset = -8, immediate = false) => {
    const {x, y} = getEndCoords(node);
    return moveCursorTo({x, y}, offset, immediate);
  };

  const moveCursorToRealCursor = immediate => {
    moveCursorTo({x: cursorX - 8, y: cursorY - 8}, 0, immediate);
  };

  const showCursor = async () => {
    moveCursorToRealCursor(true);
    // heroCanvas.style.cursor = 'none';
    await wait(1);
    cursor.style.opacity = '1';
    await wait(1);
  };

  const hideCursor = async () => {
    await Promise.all([
      moveCursorToRealCursor(),
      cursor._.transition({opacity: '0'}),
    ]);
    // heroCanvas.style.cursor = '';
  };

  function addClassTransition(el, klass) {
    return new Promise(resolve => {
      el.classList.add(klass);
      el._.once({transitionend: () => resolve()});
    });
  }

  function removeClassTransition(el, klass) {
    return new Promise(resolve => {
      el.classList.remove(klass);
      el._.once({transitionend: () => resolve()});
    });
  }

  const cssRuleChange = (selector, property, value) => {
    $$(selector).forEach(el => (el.style[property] = value));
  };

  async function changeRule(el, selector, property, value) {
    // await moveCursorToEl(el);
    // await click();
    await wait(typingInterval);
    insertAfter(blinkingCursor, el);
    await wait(typingInterval * 2);
    await eraseAndType(el, value);
    cssRuleChange(selector, property, value);
  }

  /*eslint-disable */
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  var closest = (counts, goal) =>
    counts.reduce(
      (prev, curr) =>
        (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev)
    );

  function splitObj(data) {
    var keys = [], vals = [];
    for (var l in data) {
      if (data.hasOwnProperty(l)) {
        keys.push(l);
        vals.push(data[l]);
      }
    }
    return {keys: keys, vals: vals};
  }

  function videoEnded(vid) {
    return new Promise(resolve =>
      vid.addEventListener('ended', resolve, false)
    );
  }

  /*eslint-enable */

  window.utils = {
    typingInterval,
    blinkingCursor,
    insertAfter,
    wait,
    click,
    eraseAndType,
    getCoords,
    getEndCoords,
    getCenterCoords,
    moveCursorTo,
    moveCursorToEl,
    moveCursorToRealCursor,
    showCursor,
    hideCursor,
    addClassTransition,
    removeClassTransition,
    cssRuleChange,
    changeRule,
    debounce,
    closest,
    splitObj,
    videoEnded,
  };
})();
