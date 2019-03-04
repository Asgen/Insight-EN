'use strict';
(function () {
  // Адрес
  var DIR = 'http://localhost:3000/';

  // Цвета
  var Color = {
    onHoverLinkColor: 'hsla(195, 78%, 65%, 1)',
    whiteHalfTransparent: 'hsla(0, 0%, 100%, 0.5)'
  };

  // Title страницы отзывов
  var PageTitle = {
    MAIN: 'Insight',
    REVIEWS: 'reviews Insight'
  }

  // Коды сервера
  var Code = {
    SUCCESS: 200
  }

  // Коды клавиш
  var KeyCode = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };

  var Message = {
    onSuccess: 'Спасибо! Ваше сообщение отправлено.',
    onError: 'Ошибка отправки сообщения! Попрубуйте снова.'
  }

  window.data = {
    DIR: DIR,
    Color: Color,
    PageTitle: PageTitle,
    KeyCode: KeyCode,
    Message: Message,
    Code: Code
  }
})();
