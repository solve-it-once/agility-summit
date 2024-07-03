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
  function loadStyle(href) {
    return new Promise(resolve => {
      const link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/tippy.js@6/dist/tippy.css';
      document.head.appendChild(link);
    });
  }
  const hrefs = [
    "https://unpkg.com/tippy.js@6/dist/tippy.css",
    "https://unpkg.com/tippy.js@6/themes/light.css"
  ];
  Promise.all(hrefs.map(loadStyle));

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
    sleep(1000).then(ready);
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
      content: `<ul>
        <li><a href="/docs/introduction">Inventory Management Labor &amp; Scheduling</a></li>
        <li><a href="https://developer.zenput.com/docs/introduction">Operations Execution (Zenput)</a></li>
        <li><a href="https://talentqa1-api.discoverlink.com/swagger/ui/index">Learning &amp; Development</a></li>
        <li><a href="https://talentqa1-api.discoverlink.com/swagger/ui/index">Cruise</a></li>
      </ul>`,
      interactive: true,
      placement: 'bottom',
      theme: 'light',
      trigger: 'click'
    });
  }
});