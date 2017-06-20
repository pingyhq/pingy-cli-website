const {eraseAndType, wait} = utils;

window.onload = () =>
  setTimeout(() => document.body.classList.add('loaded'), 250);
new Clipboard('.click-to-copy');
[...$$('.click-to-copy')].forEach(el => {
  el.addEventListener('click', e => {
    $('.success', el).classList.add('show');
    setTimeout(() => {
      $('.success', el).classList.remove('show');
    }, 1000);
  });
});
// $('#showMeCompilation').addEventListener('click', e => {
//   e.preventDefault();
//   codeEditorRefs.init();
// });
[...$$('.placeholder, .check-out', $('.pingy-call-to-action'))].forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    window.location = 'https://pin.gy/';
  });
});

terminal.init();

const pluginChangeListeners = [];
let chosenLanguage = 'sass';
const languages = {
  sass: {
    option: 'Sass (.scss)',
    name: 'Sass',
    extension: 'scss',
    compiledExtension: 'css',
    url: 'http://sass-lang.com/',
    code: `<span class="hljs-attribute">$heading-color</span>: <span class="hljs-string">hotpink</span>;

<span class="hljs-property">h1</span> {
  <span class="hljs-keyword">color</span>: <span class="hljs-attribute">$heading-color</span>;
}`,
  },
  scss: {
    option: 'Sass (.sass)',
    name: 'Sass',
    extension: 'sass',
    compiledExtension: 'css',
    url: 'http://sass-lang.com/',
    code: `<span class="hljs-attribute">$heading-color</span>: <span class="hljs-string">hotpink</span>

<span class="hljs-property">h1</span>
  <span class="hljs-keyword">color</span>: <span class="hljs-attribute">$heading-color</span>`,
  },
  less: {
    name: 'Less',
    extension: 'less',
    compiledExtension: 'css',
    url: 'http://lesscss.org/',
    code: `<span class="hljs-attribute">@heading-color</span>: <span class="hljs-string">hotpink</span>;

<span class="hljs-property">h1</span> {
  <span class="hljs-keyword">color</span>: <span class="hljs-attribute">@heading-color</span>;
}`,
  },
  stylus: {
    name: 'Stylus',
    extension: 'styl',
    compiledExtension: 'css',
    url: 'http://lesscss.org/',
    code: `<span class="hljs-attribute">heading-color</span> = <span class="hljs-string">hotpink</span>

<span class="hljs-property">h1</span>
  <span class="hljs-keyword">color</span> <span class="hljs-attribute">heading-color</span>`,
  },
  pug: {
    name: 'Pug (or Jade)',
    extension: 'pug',
    compiledExtension: 'html',
    url: 'http://lesscss.org/',
    code: `<span class="hljs-property">doctype</span> <span class="hljs-keyword">html</span>
<span class="hljs-property">html</span>
  <span class="hljs-property">body</span>
    <span class="hljs-property">h1</span> Hello world!`,
  },
  ejs: {
    name: 'EJS',
    extension: 'ejs',
    compiledExtension: 'html',
    url: 'http://ejs.co/',
    code: `&lt;!DOCTYPE html&gt;
&lt;<span class="hljs-keyword">html</span> <span class="hljs-property">lang</span>=<span class="hljs-string">"en"</span>&gt;
  &lt;<span class="hljs-keyword">body</span>&gt;
    &lt;%- <span class="hljs-property">include</span>(<span class="hljs-string">'content/home'</span>); %&gt;
  &lt;/<span class="hljs-keyword">body</span>&gt;
&lt;<span class="hljs-keyword">html</span>&gt;`,
  },
  babel: {
    name: 'Babel',
    extension: 'babel.js',
    compiledExtension: 'js',
    url: 'http://babeljs.io/',
    code: `<span class="hljs-keyword">const</span> <span class="hljs-attribute">helloWorld</span> = () <span class="hljs-keyword">=></span> {
  console.<span class="hljs-property">log</span>(<span class="hljs-string">'Hello World'</span>);
}`,
  },
  buble: {
    name: 'Bublé',
    extension: 'buble.js',
    compiledExtension: 'js',
    url: 'https://buble.surge.sh/',
    code: `<span class="hljs-keyword">const</span> <span class="hljs-attribute">helloWorld</span> = () <span class="hljs-keyword">=></span> {
  console.<span class="hljs-property">log</span>(<span class="hljs-string">'Hello World'</span>);
}`,
  },
  coffeescript: {
    name: 'Coffeescript',
    extension: 'coffee',
    compiledExtension: 'js',
    url: 'http://coffeescript.org/',
    code: `<span class="hljs-attribute">helloWorld</span> = <span class="hljs-keyword">-></span>
  console.<span class="hljs-attribute">log</span>(<span class="hljs-string">'Hello World'</span>)`,
  },
  livescript: {
    name: 'LiveScript',
    extension: 'ls',
    compiledExtension: 'js',
    url: 'http://livescript.net/',
    code: `<span class="hljs-attribute">helloWorld</span> = <span class="hljs-keyword">!-></span>
  console.<span class="hljs-attribute">log</span>(<span class="hljs-string">'Hello World'</span>)`,
  },
  dogescript: {
    name: 'Dogescript',
    extension: 'djs',
    compiledExtension: 'js',
    url: 'https://dogescript.com/',
    code: `<span class="hljs-keyword">such</span> <span class="hljs-attribute">helloWorld</span>
  <span class="hljs-keyword">plz</span> console.<span class="hljs-property">loge</span> with <span class="hljs-string">'Hello World'</span>
<span class="hljs-keyword">wow</span>`,
  },
};

const $pluginChanger = document.querySelector('#pluginChanger');
$pluginChanger.innerHTML = Object.keys(languages)
  .map(function(key) {
    const lang = languages[key];
    return (
      '<option value="' + key + '">' + (lang.option || lang.name) + '</option>'
    );
  })
  .join('\n');
$pluginChanger.addEventListener('change', function(e) {
  pluginChangeListeners.forEach(fn => {
    fn(e.target.value);
  });
});

function changeLanguageOccurancesInText(newLanguage) {
  const languageData = languages[newLanguage || chosenLanguage];
  const $textOccurances = document.querySelectorAll('[data-language]');
  $textOccurances.forEach(function(el) {
    const val = el.attributes['data-language'].value;
    const replacementText = languageData[val];
    el.textContent = replacementText;
    if (val === 'name') el.href = languageData.url;
  });
}
changeLanguageOccurancesInText();
pluginChangeListeners.push(changeLanguageOccurancesInText);
