'use strict';
// Смена страницы (контента) без перезагрузки вкладки браузера
(function () {
  var databox;
  var pageTitle = document.querySelector('title');
  var DIR = window.data.DIR.length;

  var init = function (e) {
    databox = document.querySelector('.content');
    var link = document.querySelectorAll('.main-nav__link');
    var logoLink = document.querySelector('.main-nav__logo');
    var headerLogo = document.querySelector('.page-header__logo');

    // Если выполняется нажатие в браузере стрелок "назад" "вперед"
    if (e.type === 'popstate') {
      read(e);
    } else {
      for (var i = 0; i < link.length; i++) {
        link[i].addEventListener('click', read);
    }

      logoLink.addEventListener('click', read);
      headerLogo.addEventListener('click', read);
    }
  };

  var read = function (e) {
    var path;
    var url;
    var request = new XMLHttpRequest();
    var activeLink = document.querySelector('.main-nav__link--active');
    if(activeLink) {
      activeLink.classList.remove('main-nav__link--active');
    }

    if (e.type !== 'popstate') {
      e.preventDefault();
      if (e.target.href) {
        path = e.target.href;
        var attribute = 'a[href="' + path.slice(DIR) + '"]';
        var currentLink = document.querySelector(attribute);
        if (currentLink) {
          currentLink.classList.add('main-nav__link--active');
        }
        url = path.slice(DIR, -4) + 'txt'; // 4 символа - отсекаем расширение html
      }
      else {
        path = e.target.parentElement.href;
        url = 'index.txt';
      }
      if(url === '') {url = 'index.txt'}
      request.addEventListener('load', function (e) {show(e, 'click')});
    } else {
      path = e.target.location.href;
      var attribute = 'a[href="' + path.slice(DIR) + '"]';
      var currentLink = document.querySelector(attribute);
      if (currentLink) {
        currentLink.classList.add('main-nav__link--active');
      }

      url = path.slice(DIR, -4) + 'txt'; // 4 символа - отсекаем расширение html
      if(url === '') {url = 'index.txt'}
      request.addEventListener('load', function (e) {show(e, 'browser')});
    }

    request.open('GET', url, true);
    request.send(null)
  };

  var show = function (e, sourse) {
    var data = e.target;
    var path = e.target.responseURL.slice(DIR, -4);

    if(data.status == window.data.Code.SUCCESS){
      window.funcs.playTransition();
      // Отрисовка контента
      databox.innerHTML = data.responseText;
      if (sourse === 'click') {
        var state = { 'page_id': 1, 'user_id': 5 };
        var title = 'Insight';
        var url = path + '.html';
        history.pushState(state, title, url);
      }

      window.menuToggle('close');
      pageTitle.textContent = path + ' Insight';
      if(path === 'index') {
        pageTitle.textContent = 'Insight';
      }
    }
  };

  window.addEventListener('load', init);
  window.addEventListener('popstate', init);
})();
