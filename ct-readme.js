/**
 * @file
 * All custom overrides behaviors for the readme.
 */

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function ready() {
  if ('tippy' in window) {
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
}

/**
 * Wait until all the other stuff happens to load in the dropdown.
 */
window.addEventListener("load", (event) => {
  sleep(250).then(ready);
  sleep(1000).then(ready);
});
