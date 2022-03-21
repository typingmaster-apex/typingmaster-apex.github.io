// Get Header
const header = document.getElementById('header');

// Get menu list
const menuList = document.getElementById('menuList');

// Get overLay layer
const overlay = document.getElementById('overlayLayer');

// Get toggle menu button
const toggleMenuButton = document.getElementById('toggleMenuBtn');





// Handle (click) events
toggleMenuButton.addEventListener('click', function() {
  // Check, if the (aria-expanded) value is (false)
  if(toggleMenuButton.getAttribute('aria-expanded') == 'false') {
    // Call function
    openMneu();
  }else { // Else
    // Call function
    closeMenu();
  };
});
overlay.addEventListener('click', closeMenu);

// When scroll change, add class on (header) (the scroll effect of header)
window.addEventListener('scroll', function(e) {
  if(this.scrollY > header.offsetHeight / 2) {
    header.classList.add('header--active');
  }else {
    header.classList.remove('header--active');
  }
});

// Open mneu function
function openMneu() {
  toggleMenuButton.setAttribute('aria-expanded', 'true');
  toggleMenuButton.classList.add('toggle-menu--active');

  document.body.classList.add('scroll-hide');
  menuList.classList.add('navbar__menu--open');
  menuList.querySelectorAll('a').forEach(link => {
    link.setAttribute('tabindex', '0');
  });
  overlay.classList.add('header__overlay--open');

  // Listen for (keydown)
  document.addEventListener('keydown', handleKeyDown);

  // Handle key down function 
  function handleKeyDown(e) {
    if(e.code == 'Tab') {
      // Call function
      menuFocusSystem();
      // Remove the (event listener)
      document.removeEventListener('keydown', handleKeyDown);
    };
  };
};

// Close mneu function
function closeMenu() {
  toggleMenuButton.setAttribute('aria-expanded', 'false');
  toggleMenuButton.classList.remove('toggle-menu--active');
  
  document.body.classList.remove('scroll-hide');
  menuList.classList.remove('navbar__menu--open');
  menuList.querySelectorAll('a').forEach(link => {
    link.setAttribute('tabindex', '-1');
  });
  overlay.classList.remove('header__overlay--open');
};

// Menu focus system function (to control the focus, of the menu when open)
function menuFocusSystem() {
  // Get first and last child of (menuList)
  const firstChild = menuList.querySelectorAll('a')[0];
  const lastChild = menuList.querySelectorAll('a')[menuList.childElementCount - 1];

  // Focus the first item of the menu List
  setTimeout(() => {
    menuList.querySelectorAll('a')[0].focus();
  }, 100);

  // Keep focus inside menu
  menuList.addEventListener('focusin', function(e) {
    if(e.target == lastChild) {
      e.target.addEventListener('focusout', function() {
        toggleMenuButton.focus();
      });
    };
  });
};

// Prevent menu links from focus function
(preventMneuLinksFronFoucs = function () {
  if(window.innerWidth < 640) {
    menuList.querySelectorAll('a').forEach(link => {
      link.setAttribute('tabindex', '-1');
    });
  }else {
    menuList.querySelectorAll('a').forEach(link => {
      link.setAttribute('tabindex', '0');
    });
  }
})();

