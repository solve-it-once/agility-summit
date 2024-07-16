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
      dropdownRaw.classList.add('Dropdown', 'Dropdown_closed', 'ct-solutions-dropdown', 'ct-solutions-dropdown-notippy');
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

    tippy('.ct-solutions-dropdown-notippy', {
      allowHTML: true,
      arrow: false,
      content: `<ul>
        <li><a href="https://developer.crunchtime.com/docs/introduction">Inventory Management and Labor &amp; Scheduling</a></li>
        <li><a href="https://developer.zenput.com/docs/introduction">Operations Execution (Zenput)</a></li>
        <li><a href="https://talentqa1-api.discoverlink.com/swagger/ui/index">Learning &amp; Development</a></li>
        <li><a href="https://developer.crunchtime.com/docs/cruise">Cruise</a></li>
      </ul>`,
      interactive: true,
      placement: 'bottom',
      theme: 'light',
      trigger: 'click'
    });

    // Only newly-added dropdown buttons will have this class, so we can prevent double-adding.
    var cleanup = document.querySelectorAll('.ct-solutions-dropdown-notippy');
    Array.prototype.forEach.call(cleanup, (elem) => {
      elem.classList.remove("ct-solutions-dropdown-notippy");
    });
  }

  // Ensure we do not insert the same element twice, but also that it does not get clobbered.
  var headerNav = document.querySelector('.rm-Header-bottom nav');
  var inserted = headerNav.querySelectorAll('.inserted-button');
  if (window.location.host === 'developer.zenput.com' 
    && (!inserted || !inserted.length)
  ) {
    const homeLink = document.createElement('a');
    homeLink.href = "https://developer.crunchtime.com/";
    homeLink.classList.add("inserted-button", "Button", "Button_md", "rm-Header-link", "rm-Header-bottom-link", "Button_slate_text", "Header-bottom-link_mobile");
    homeLink.innerHTML = `<i class="icon-landing-page-2"></i><span>Home</span>`;
    
    headerNav.prepend(homeLink);
    document.body.classList.add('home-link-inserted');
  }
}

/**
 * Wait until all the other stuff happens to load in the dropdown.
 */
window.addEventListener("load", (event) => {
  sleep(250).then(ready);
  sleep(1000).then(ready);
});
