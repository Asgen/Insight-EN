'use strict';
(function () {
  var openButton = document.querySelector('.page-header__menu-button');
  var closeButton = document.querySelector('.main-nav__close');
  var logo = document.querySelector('.main-nav__logo');

  var menuToggle = function (state) {
    var menu = document.querySelector('.main-nav');
    var links = document.querySelectorAll('.main-nav__item');
    var translate = 20;

    var parcer = function () {
      for (var i = 0; i < links.length; i++) {
        links[i].style.transform = 'translateY(' + translate + 'px)';
        translate += 10;
      }
    };

    switch(state){
      case 'open':
        logo.style.transform = 'translateY(-50px)';
        logo.style.opacity = '1';
        logo.style.transform = 'translateY(0)';

        parcer();
        menu.style.zIndex = '1';
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        for (var i = 0; i < links.length; i++) {
          links[i].style.transform = 'translateY(0)';
        }
        break;
      case 'close':
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(-50px)';

        menu.style.opacity = '0';
        menu.style.zIndex = '0';
        menu.style.visibility = 'hidden';
        parcer();
        break;
    }
  };

  openButton.addEventListener('click', function () {
    menuToggle('open')
  });
  closeButton.addEventListener('click', function () {
    menuToggle('close')
  });

  window.menuToggle = menuToggle;
})();
