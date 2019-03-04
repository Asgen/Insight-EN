'use strict';
(function () {
  var pageTitle = document.querySelector('title');
  var logo = document.querySelector('.page-header__logo');

  new MutationObserver(function(mutations) {
    var func = window.funcs;

    // Если страница отзывов
    if(mutations[0].target.textContent === window.data.PageTitle.REVIEWS) {
      func.changeSlides();
    }

    logo.style.display = 'block';
    // Если главная
    if(mutations[0].target.textContent === window.data.PageTitle.MAIN) {
      logo.style.display = 'none';
    }

    // Если есть кнопка открытия модалки, то выполнить
    var open = document.querySelector('.button--open-modal');
    if(open) {
      var tamplateId = '#' + open.id.slice(0,-3); // Get tamplate's id
      open.addEventListener('click', function (e) {func.onModalOpen(e, tamplateId)});
    }

    // Если есть форма, то выполнить
    var form = document.querySelector('.form');
    if (form) {
      form.addEventListener('click', func.onInputClick);
      form.addEventListener('change', func.onFormChange);
      form.addEventListener('submit', func.onFormSubmit);
    }

  }).observe(
      pageTitle,
      { characterData: false, attributes: false, childList: true, subtree: false }
  );
})();
