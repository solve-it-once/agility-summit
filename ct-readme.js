/**
 * @file
 * All custom overrides behaviors for the readme.
 */

function loadScript(src) {
  return new Promise(resolve => {
      const script = document.createElement("script");
      script.setAttribute("async", "");
      script.onload = resolve;
      script.setAttribute("src", src);
      document.head.appendChild(script);
  });
}

const urls = [
  "https://unpkg.com/@popperjs/core@2",
  "https://unpkg.com/tippy.js@6"
];

Promise.all(urls.map(loadScript)).then(ready);

function ready() {
  var solutions = document.querySelectorAll(".rm-Header-bottom a.Button[href='/page/solutions']");
  Array.prototype.forEach.call(solutions, (elem) => {
    const dropdownRaw = document.createElement("div");
    dropdownRaw.classList.add('Dropdown', 'Dropdown_closed', 'ct-solutions-dropdown');
    dropdownRaw.innerHTML= `
      <div class="Dropdown-toggle" aria-haspopup="dialog" aria-expanded="false">
        <button class="rm-Header-link rm-Header-bottom-link undefined Button Button_slate_text Button_md" type="button">
          <i class="icon-document2"></i>
          <span>Solutions</span>
          <i class="undefined icon-chevron-down"></i>
        </button>
      </div>
    `;
    elem.replaceWith(dropdownRaw);
  });

  tippy('.ct-solutions-dropdown', {
    content: 'Solutions menu coming soon',
    trigger: 'click'
  });
}
