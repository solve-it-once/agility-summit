/**
 * @file
 * All custom overrides behaviors for the readme.
 */


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
  content: 'Solutions menu coming soon'
});