/**
 * @file
 * All custom overrides behaviors for the readme.
 */

/**
 * Allow a small delay so tippy can load.
 *
 * @param {*} ms 
 * @returns 
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Wait until all the other stuff happens to load in the dropdown.
 */
window.addEventListener("load", (event) => {
  // Add in default tippy styles.
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/tippy.js@6/dist/tippy.css';
  document.head.appendChild(link);

  function loadScript(src) {
    return new Promise(resolve => {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.onload = resolve;
        script.setAttribute("src", src);
        document.head.appendChild(script);
    });
  }

  // Load popper and tippy asynchronously.
  const urls = [
    "https://unpkg.com/@popperjs/core@2/dist/umd/popper.min.js",
    "https://unpkg.com/tippy.js@6/dist/tippy.umd.min.js"
  ];
  Promise.all(urls.map(loadScript)).then(loaded);

  /**
   * Put in a small loading delay.
   */
  function loaded() {
    sleep(2000).then(ready);
  }

  /**
   * Swap Solutions nav link for a dropdown button and put tippy on it.
   */
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
      allowHTML: true,
      arrow: false,
      content: 'Solutions menu coming soon',
      interactive: true,
      placement: 'bottom',
      trigger: 'click'
    });
  }
});