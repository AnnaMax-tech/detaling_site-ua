$(document).ready(function () {
  let activeSlide = 0;
  const $slideElements = $('.banner__image-slide');
  const slideCount = $slideElements.length;

  function showSlide() {
    $slideElements.eq(activeSlide).removeClass('banner__image-slide--active');
    activeSlide = (activeSlide + 1) % slideCount;
    $slideElements.eq(activeSlide).addClass('banner__image-slide--active');
  }

  $slideElements.eq(activeSlide).addClass('banner__image-slide--active');
  setInterval(showSlide, 4000);
});

$(document).ready(function () {
  const phoneInput = $('#phone')[0];
  const iti = window.intlTelInput(phoneInput, {
    initialCountry: 'ua',
    preferredCountries: ['at', 'ua'],
    separateDialCode: true,
    utilsScript: '/js/utils.js',
  });

  $('.service-card__button').on('click', function () {
    $('#popup-form').removeClass('popup--hidden').addClass('popup--visible');
    $('#overlay').fadeIn();
  });

  $('#close-popup, #overlay').on('click', function () {
    $('#popup-form').removeClass('popup--visible').addClass('popup--hidden');
    $('#overlay').fadeOut();
  });

  $('#popup-form').on('click', function (e) {
    e.stopPropagation();
  });

  $('#detailingForm').on('submit', function (e) {
    e.preventDefault();

    if (!iti.isValidNumber()) {
      alert('Будь ласка, введіть дійсний номер телефону');
      return;
    }

    const phoneNumber = iti.getNumber();
    $('#phone').val(phoneNumber);
    const carType = $('select[name="carType"]').val();
    const service = $('select[name="service"]').val();
    const name = $('input[name="customer"]').val();
    const comments = $('textarea[name="comments"]').val();

    emailjs.init('izUn8c8DGbhnXBEc8');
    emailjs.sendForm('service_q0nga99', 'template_5mwmhdt', '#detailingForm').then(
      function () {
        $(
          '#detailingForm .form__field, #detailingForm .form-check, #detailingForm .form__buttons',
        ).hide();
        $('#popup_p_manager, .popup__close-btn').show();

        $('#detailingForm').off('submit');

        const message = `Luxusautocare(UA)\nТип автомобіля: ${carType}\nПослуга: ${service}\nІм'я: ${name}\nТелефон: ${phoneNumber}\nКоментар: ${comments}`;
        const telegramBotToken = '8197764205:AAE-XbNUdeNg39ufCTNgo5wLMP_8lp75eXw';
        const chatId = '-1002295760352';

        fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (!data.ok) {
              console.error('Ошибка отправки в Telegram:', data);
              alert('Сталася помилка при відправці даних в Telegram.');
            }
          })
          .catch((error) => {
            console.error('Ошибка отправки в Telegram:', error);
          });
      },
      function (error) {
        console.error('Ошибка отправки форми:', error);
        alert('Сталася помилка при відправці форми. Спробуйте ще раз.');
      },
    );
  });
  $('.popup__close-btn').on('click', function () {
    $('#popup-form').removeClass('popup--visible').addClass('popup--hidden');
    $('#overlay').fadeOut();
  });
});

$(document).ready(function () {
  const consultationPhoneInput = $('#consultation-phone')[0];
  const consultationTelInputInstance = window.intlTelInput(consultationPhoneInput, {
    initialCountry: 'ua',
    preferredCountries: ['at', 'ua'],
    separateDialCode: true,
    utilsScript: '/js/utils.js',
  });

  $('#consultationForm').on('submit', function (e) {
    e.preventDefault();

    if (!consultationTelInputInstance.isValidNumber()) {
      alert('Будь ласка, введіть дійсний номер телефону');
      return;
    }

    const formattedPhoneNumber = consultationTelInputInstance.getNumber();
    $('#consultation-phone').val(formattedPhoneNumber);

    const name = $('#consultation-name').val();
    const phone = formattedPhoneNumber;

    emailjs.init('izUn8c8DGbhnXBEc8');
    emailjs.sendForm('service_q0nga99', 'template_z8ca37o', '#consultationForm').then(
      function () {
        $(
          '#consultationForm .consultation__field, .consultation__title, #consultationForm .form-contact-check, #consultationForm .consultation__button',
        ).hide();
        $('#consultation__success_manager').show();

        const message = `Luxusautocare(UA)\nІм'я: ${name}\nТелефон: ${phone}`;
        const telegramBotToken = '8197764205:AAE-XbNUdeNg39ufCTNgo5wLMP_8lp75eXw';
        const chatId = '-1002295760352';

        fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: message }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (!data.ok) {
              console.error('Ошибка отправки в Telegram:', data);
              alert('Сталася помилка при відправці даних в Telegram.');
            }
          })
          .catch((error) => {
            console.error('Ошибка отправки в Telegram:', error);
          });
      },
      function (error) {
        console.error('Ошибка отправки форми:', error);
        alert('Сталася помилка при відправці форми. Спробуйте ще раз.');
      },
    );
  });

  const popupPhoneInput = $('#popup-phone')[0];
  const popupTelInputInstance = window.intlTelInput(popupPhoneInput, {
    initialCountry: 'ua',
    preferredCountries: ['at', 'ua'],
    separateDialCode: true,
    utilsScript: '/js/utils.js',
  });

  $('.open-popup-button').on('click', function () {
    $('#popup').css('display', 'flex');
  });

  $('#popup-close, #popup').on('click', function (e) {
    if (!$(e.target).closest('.popup__content').length) {
      $('#popup').css('display', 'none');
    }
  });

  $('.popup__content').on('click', function (e) {
    e.stopPropagation();
  });

  $('#popupForm').on('submit', function (e) {
    e.preventDefault();

    if (!popupTelInputInstance.isValidNumber()) {
      alert('Будь ласка, введіть дійсний номер телефону');
      return;
    }

    const formattedPhoneNumber = popupTelInputInstance.getNumber();
    $('#popup-phone').val(formattedPhoneNumber);

    const name = $('#popup-name').val();
    const phone = formattedPhoneNumber;

    emailjs.init('izUn8c8DGbhnXBEc8');
    emailjs.sendForm('service_q0nga99', 'template_z8ca37o', '#popupForm').then(
      function () {
        $(
          '#popupForm .popup__field, .popup__title, #popupForm .form-head-check, #popupForm .popup__button',
        ).hide();
        $('#popup__success_manager, .popup__close-btns').show();

        $('#popupForm').off('submit');

        const message = `Luxusautocare(UA)\nІм'я: ${name}\nТелефон: ${phone}`;
        const telegramBotToken = '8197764205:AAE-XbNUdeNg39ufCTNgo5wLMP_8lp75eXw';
        const chatId = '-1002295760352';

        fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: message }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (!data.ok) {
              console.error('Ошибка отправки в Telegram:', data);
              alert('Сталася помилка при відправці даних в Telegram.');
            }
          })
          .catch((error) => {
            console.error('Ошибка отправки в Telegram:', error);
          });
      },
      function (error) {
        console.error('Ошибка отправки форми:', error);
        alert('Сталася помилка при відправці форми. Спробуйте ще раз.');
      },
    );
  });

  $('.popup__close-btns').on('click', function () {
    $('#popup').css('display', 'none');
  });
});

$(document).ready(function () {
  function animateCounter(element) {
    const target = $(element).data('count');
    $({ countNum: $(element).text() }).animate(
      {
        countNum: target,
      },
      {
        duration: 4000,
        easing: 'swing',
        step: function () {
          $(element).text(Math.floor(this.countNum));
        },
        complete: function () {
          $(element).text(this.countNum);
        },
      },
    );
  }

  let counterSection = $('.section-counter');
  let counterExecuted = false;

  $(window).scroll(function () {
    if (
      !counterExecuted &&
      $(window).scrollTop() + $(window).height() >= counterSection.offset().top
    ) {
      $('.counter-card__number').each(function () {
        animateCounter(this);
      });
      counterExecuted = true;
    }
  });
});

$(document).ready(function () {
  $('.gallery__list').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  });
});

$('[data-fancybox]').fancybox({
  afterClose: function () {
    $('.gallery__list').slick('setPosition');
  },
});

$(document).ready(function () {
  $('.comments__info').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          dots: false,
          arrows: false,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          dots: false,
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  });
});
