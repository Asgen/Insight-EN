'use strict';
(function () {
  window.addEventListener('mousemove', function (e) {
    var x;
    var y;
    var flexible = document.querySelector('.content__container');

    if (document.title === 'Insight') {
      flexible = document.querySelector('.content__logo-wrapper');
    }
    var width = window.innerWidth;
    var height = window.innerHeight;

    // Начальные координаты
    var startCoords = {
      x: e.pageX,
      y: e.pageY
    };

    // Смещение
    var shift = {
      x: e.pageX / width,
      y: e.pageY / height
    };

    x = shift.x * 100 > 50 ? shift.x + 3 : shift.x - 3;
    y = shift.y * 100 > 50 ? shift.y + 3 : shift.y - 3;

    flexible.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0.0001px)';
  })
})();
