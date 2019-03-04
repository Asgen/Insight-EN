'use strict';
(function () {
  // Функция удаления элемента по нажатию на Esc
  var onEscRemove = function (element) {
    var esc = window.data.KeyCode.ESC_KEYCODE;
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === esc) {
        element.remove();
      }
    });
    document.removeEventListener('keydown', function (evt) {
      if (evt.keyCode === esc) {
        element.remove();
      }
    });
  };

  // Функция удаления элемента по клику
  var onClickRemoveThis = function (element) {
    element.addEventListener('click', function () {
      element.remove();
    });
  };

  // Функция отрисовки сообщения из шаблона
  var showMessage = function (status) {
    // Фрагмент куда будет добавлять метки
    var fragment = document.createDocumentFragment();

    var target = document.querySelector('body');

    var wrapper = document.createElement('div');
    var container = document.createElement('div');
    var message = document.createElement('p');

    wrapper.classList.add('message');
    container.classList.add('message__container');
    message.classList.add('message__text');

    if (status === 'success') {
      container.classList.add('message__container--success');
      message.textContent = window.data.Message.onSuccess;
    } else {
      container.classList.add('message__container--error');
      message.textContent = window.data.Message.onError;
    }
    container.appendChild(message);
    wrapper.appendChild(container);
    fragment.appendChild(wrapper);
    target.appendChild(fragment);

    onEscRemove(wrapper);
    onClickRemoveThis(wrapper);
  };

  // Прелоадер
  var playTransition = function (databox, data) {
    var loader = document.querySelector('.loader');
    var columns = loader.querySelectorAll('.loader__column span');
    loader.style.display = 'block';
    columns.forEach(function(el, i) {
      el.style.width = '0';
      el.style.transition = 'width ' + (0.2 + (i * 0.1)) + 's ease-in-out';
    });
    setTimeout(function() {
      columns.forEach(function(el) {
        el.style.width = '100%';
      });
    }, 10);
    setTimeout(function() {
      loader.style.display = 'none';
      columns.forEach(function(el) {
        el.style.width = '0';
      });
    }, 1000);
  };

  // Функция слайдера
  var changeSlides = function () {
    var slider = document.querySelector('.slider');
    var inputs = slider.querySelectorAll('input');
    var slides = slider.querySelectorAll('.slide');
    var slidesAmount = slides.length;
    var labels = slider.querySelectorAll('label');
    var button = slider.querySelector('.button--open-modal');
    var sliderList = document.querySelector('.slider__list');
    var prev = document.querySelector('.content__arrow--prev');
    var next = document.querySelector('.content__arrow--next');
    var startPosition = next.offsetTop;
    var slideHeight = slides[0].scrollHeight;

    // Ширина должна равняться количеству слайдов *100
    sliderList.style.width = (slidesAmount * 100) + '%';

    // ------ Swipe ------
    var touchStartCoords =  {'x':-1, 'y':-1};  // X and Y coordinates on mousedown or touchstart events.
    var touchEndCoords = {'x':-1, 'y':-1}; // X and Y coordinates on mouseup or touchend events.
    var DIRection = 'undefined'; // Swipe DIRection
    var minDistanceXAxis = 30; // Min distance on mousemove or touchmove on the X axis
    var maxDistanceYAxis = 30;// Max distance on mousemove or touchmove on the Y axis
    var maxAllowedTime = 1000; // Max allowed time between swipeStart and swipeEnd
    var startTime = 0; // Time on swipeStart
    var elapsedTime = 0; // Elapsed time between swipeStart and swipeEnd
    var targetElement = slider; // Element to delegate

    var swipeStart = function (e) {
      e = e ? e : window.event;
      e = ('changedTouches' in e) ? e.changedTouches[0] : e;
      touchStartCoords = {'x':e.pageX, 'y':e.pageY};
      startTime = new Date().getTime();
      //targetElement.textContent = " ";
    };

    var swipeMove = function (e) {
      e = e ? e : window.event;
      //e.preventDefault();
    };

    var swipeEnd = function (e) {
      e = e ? e : window.event;
      e = ('changedTouches' in e)?e.changedTouches[0] : e;
      touchEndCoords = {'x':e.pageX - touchStartCoords.x, 'y':e.pageY - touchStartCoords.y};
      elapsedTime = new Date().getTime() - startTime;
      if (elapsedTime <= maxAllowedTime){
        if (Math.abs(touchEndCoords.x) >= minDistanceXAxis && Math.abs(touchEndCoords.y) <= maxDistanceYAxis){
          DIRection = (touchEndCoords.x < 0)? 'left' : 'right';
          switch(DIRection){
            case 'left':
              pushNextSlide();
              break;
            case 'right':
              pushPrevSlide();
              break;
          }
        }
      }
    };

    var addMultipleListeners = function (el, s, fn) {
      var evts = s.split(' ');
      for (var i=0, iLen=evts.length; i<iLen; i++) {
        el.addEventListener(evts[i], fn, false);
      }
    };
    // ------ end Swipe------

    // Переключатель на след. слайд
    var pushNextSlide = function () {
      var currentSlide = slider.querySelector('input:checked');
      var currentIndex = Number(currentSlide.id.slice(-1)) - 1;
      var newIndex = (currentIndex + 1) % slidesAmount;
      change(newIndex);
    };

    // Переключатель на предыдущий слайд
    var pushPrevSlide = function () {
      var currentSlide = slider.querySelector('input:checked');
      var currentIndex = Number(currentSlide.id.slice(-1)) - 1;
      var newIndex = slidesAmount -1;
      if(currentIndex > 0) {
        newIndex = (currentIndex - 1) % slidesAmount;
      }
      change(newIndex);
    };

    // Функция смены
    var change = function (index) {
      inputs[index].checked = true;
      // Ширина слайда равна 100%
      var margin = index * 100;
      sliderList.style.marginLeft = '-' + margin + '%';
      // Cбрасывает фон лэйбла
      labels.forEach(function (elem) {
        elem.style.boxShadow = 'none';
      })
      // Подсвечивает лэйбл
      labels[index].style.boxShadow = '0px 0px 0px 5px white';

      // Позиционирование кнопки
      slideHeight = slides[index].scrollHeight;
      var positionTop = slideHeight + 200;

      button.style.opacity = '0';

      setTimeout(function() {
        button.style.top = positionTop + 'px';
        button.style.opacity = '1';
      }, 400);


      // Позиционирование стрелок
      slideHeight -= slides[0].scrollHeight;
      next.style.top = startPosition + slideHeight / 2 + 'px';
      prev.style.top = startPosition + slideHeight / 2 + 'px';
    };

    // Позиционирование кнопки при загрузке страницы
    window.addEventListener('load', function () {
      var positionTop = slides[0].scrollHeight + 200;
      button.style.top = positionTop + 'px';

      window.removeEventListener('load', function () {
        var positionTop = slides[0].scrollHeight + 200;
        button.style.top = positionTop + 'px';
      });
    });

    // Смена слайдов при нажатии на радио-кнопки
    slider.addEventListener('change', function (e) {
      // Номер айдишника последним символом указан, берем его в качестве номера слайда отняв еденицу
      var slideIndex = Number(e.target.id.slice(-1)) - 1;
      change(slideIndex);
    });

    // Смена слайдов стрелками
    next.addEventListener('click', function (e) {
      e.preventDefault();
      pushNextSlide();
    });

    prev.addEventListener('click', function (e) {
      e.preventDefault();
      pushPrevSlide();
    });

    // Смена слайдов swip'ом
    addMultipleListeners(targetElement, 'mousedown touchstart', swipeStart);
    addMultipleListeners(targetElement, 'mousemove touchmove', swipeMove);
    addMultipleListeners(targetElement, 'mouseup touchend', swipeEnd);
  };

  // ------ Модалка ------
  var renderModal = function (templateId, templateClass) {
    // Вставляем разметку в body
    var body = document.querySelector('body');
    // Переменная для хранения Метки из шаблона
    var modalTemplate = document.querySelector(templateId)
      .content
      .querySelector(templateClass);

    var modalElement = modalTemplate.cloneNode(true);
    onModalClose(modalElement);
    body.appendChild(modalElement);
  };

  var onModalClose = function (modalEl) {
    var content = document.querySelector('.content');
    var closeButton = modalEl.querySelector('.modal__close');

    closeButton.addEventListener('click', function () {
      modalEl.style.opacity = '0';
      modalEl.style.zIndex = '0';
      modalEl.style.visibility = 'hidden';
      modalEl.style.height = '0';

      content.style.opacity = '1';
      content.style.zIndex = '0';
      content.style.visibility = 'visible';
      setTimeout(function() {
        modalEl.remove();
      }, 400);
    });
  };

  var onModalOpen = function (e, tamplateId) {
    var content = document.querySelector('.content');
    renderModal(tamplateId, '.modal');
    var modal = document.querySelector('.modal');

    content.style.opacity = '0';
    content.style.zIndex = '0';
    content.style.visibility = 'hidden';

    setTimeout(function() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

      modal.style.height = 'auto';
      if (document.body.scrollHeight > modal.offsetHeight) {
        modal.style.height = '100%';
      }
      modal.style.opacity = '1';
      modal.style.zIndex = '1';
      modal.style.visibility = 'visible';
    }, 400);

    // Если в модальном окне есть форма
    var form = document.querySelector('.form');
    if (form) {
      form.addEventListener('click', onInputClick);
      form.addEventListener('change', onFormChange);
      form.addEventListener('submit', onFormSubmit);
    }
  };
  // ------ модалка конец ------

  // ------ Форма ------

  // Сброс формы
  var resetForm = function (form) {
    form.reset();
    var filledFeilds = form.querySelectorAll('.filled');
    filledFeilds.forEach(function (el) {
      el.classList.remove('filled');
    });
  };

  // Callback при успешной отправке
  var onSuccessSend = function (xhr, evt) {
    var form = document.querySelector('.form');
    // Сброс формы
    resetForm(form);
    // Показывает сообщение об успешной отправке (логика закрытия внутри)
    showMessage('success');
  };

  var onError = function (xhr) {
    showMessage('red');
  };

  var onInputClick = function (evt) {
    var form = document.querySelector('.form');
    var cleaner = form.querySelector('.focus');
    if(cleaner) {
      cleaner.classList.remove('focus');
    }
    evt.target.parentElement.classList.add('focus');
  };

  var onFormChange = function (e) {
    if (e.target.value) {
      e.target.parentElement.classList.add('filled');
    } else {
      e.target.parentElement.classList.remove('filled');
    }
  };

  var onFormSubmit = function (evt) {
    var form = document.querySelector('.form');
    evt.preventDefault();
    window.xhrRequest('form_processing.php', 'POST', onSuccessSend, onError, new FormData(form));
  };
  // ------ Форма конец ------

  window.funcs = {
    showMessage: showMessage,
    changeSlides: changeSlides,
    renderModal: renderModal,
    onModalClose: onModalClose,
    onModalOpen: onModalOpen,
    onInputClick: onInputClick,
    onFormChange: onFormChange,
    onFormSubmit: onFormSubmit,
    playTransition: playTransition
  }
})();
