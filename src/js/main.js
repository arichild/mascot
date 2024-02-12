$( document ).ready(function() {
  $('select.ui-pgn-select').styler();

  $(document).on("click", ".mfp-link", function () {
    var a = $(this);

    $.magnificPopup.open({
      items: { src: a.attr("data-href") },
      type: "ajax",
      overflowY: "scroll",
      removalDelay: 300,
      mainClass: 'my-mfp-zoom-in',
      ajax: {
        tError: "Error. Not valid url",
      },
      callbacks: {
        open: function () {
          setTimeout(function(){
            $('.mfp-wrap').addClass('not_delay');
            $('.mfp-popup').addClass('not_delay');
          },700);
        }
      },

      callbacks: {
        open: function() {
          document.documentElement.style.overflow = 'hidden'
        },

        close: function() {
          document.documentElement.style.overflow = ''
        }
      }
    });
    return false;
  });

  $.validator.messages.required = 'Пожалуйста, введите данные';

  jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^([а-яё ]+|[a-z ]+)$/i.test(value);
  }, "Поле может состоять из букв и пробелов, без цифр");

  jQuery.validator.addMethod("phone", function (value, element) {
    if (value.startsWith('+375')) {
      return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12}(\s*)?$/i.test(value);
    } else if (value.startsWith('+7')) {
      return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/i.test(value);
    } else {
      return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/i.test(value);
    }
  }, "Введите полный номер");

  let phone = document.querySelectorAll('.phone-mask')

  if(phone.length) {
    phone.forEach(element => {
      IMask(element, {
        mask: [
          {
            mask: '+{375} (00) 000 00 00',
            startsWith: '375',
            overwrite: true,
            lazy: false,
            placeholderChar: '_',
          },
          {
            mask: '+{7} (000) 000 00 00',
            startsWith: '7',
            overwrite: true,
            lazy: false,
            placeholderChar: '_',
          },
          {
            mask: '+0000000000000',
            startsWith: '',
            country: 'unknown'
          }
        ],

        dispatch: function (appended, dynamicMasked) {
          var number = (dynamicMasked.value + appended).replace(/\D/g, '');

          return dynamicMasked.compiledMasks.find(function (m) {
            return number.indexOf(m.startsWith) === 0;
          });
        }
      })
    });
  }

  if(document.querySelector('.catalog-info')) {
    new Splide( '.splide.catalog-info' ).mount();
  }

  const btnFilter = document.querySelectorAll('.catalog-filter-btn')

  if(btnFilter.length) {
    btnFilter.forEach(element => {
      element.addEventListener('click', () => {
        const parent = element.closest('.catalog-filter-type')
        const title = parent.querySelector('.catalog-filter-title a')
        const list = parent.querySelector('.catalog-filter-list')

        title.classList.toggle('show')
        list.classList.toggle('show')
        element.classList.toggle('show')
      })
    });
  }

  const btnClear = document.querySelector('.clear')

  if(btnClear) {
    btnClear.addEventListener('click', (e) => {
      e.preventDefault();

      const input = document.querySelector('.ui-search-input')

      input.value = ""
    })
  }

  if(document.querySelector('[data-mousemove-swipe]')) {
    const swiperCatalog = new Swiper('.swiper.slider-item', {
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      }
    });

    function sliderMouseSlideInit() {
      document.addEventListener('mousemove', function(e) {
        const targetElement = e.target

        if(targetElement.closest('[data-mousemove-swipe]')) {
          const sliderElement = targetElement.closest('[data-mousemove-swipe]')

          const sliderItem = swiperCatalog[getIndex(sliderElement)]
          const sliderLength = sliderItem.slides.length

          if(sliderLength > 1) {
            const slideWidth = sliderItem.width
            const sliderPath = Math.round(slideWidth / sliderLength)
            const sliderMousePos = e.clientX - sliderElement.getBoundingClientRect().left
            const sliderSlide = Math.floor(sliderMousePos / sliderPath)

            sliderItem.slideTo(sliderSlide)
          }
        }
      })
    }

    function getIndex(el) {
      const sliders = document.querySelectorAll('[data-mousemove-swipe]')

      return Array.from(sliders).indexOf(el)
    }

    sliderMouseSlideInit()
  }

  const btnView1 = document.querySelector('.view-1')
  const btnView2 = document.querySelector('.view-2')

  if(btnView1) {
    btnView1.addEventListener('click', () => {
      const columns = document.querySelectorAll('.catalog-items .col-md-3')

      columns.forEach(element => {
        const elementBottom = element.querySelector('.catalog-item-bottom')

        element.classList.add('col-md-4')
        element.classList.remove('col-md-3')

        elementBottom.classList.add('view-1')
      });

      btnView1.classList.add("active")
      btnView2.classList.remove("active")
    })
  }

  if(btnView2) {
    btnView2.addEventListener('click', () => {
      const columns = document.querySelectorAll('.catalog-items .col-md-4')

      columns.forEach(element => {
        const elementBottom = element.querySelector('.catalog-item-bottom')

        element.classList.add('col-md-3')
        element.classList.remove('col-md-4')

        elementBottom.classList.remove('view-1')
      });

      btnView2.classList.add("active")
      btnView1.classList.remove("active")
    })
  }

  const btnOpenCart = document.querySelector('.header-cart')
  const cart = document.querySelector('.cart')

  if(btnOpenCart) {
    btnOpenCart.addEventListener('click', () => {

      cart.classList.add('active')
    })
  }

  const btnCloseCart = document.querySelector('.cart-head-btn')

  if(btnCloseCart) {
    btnCloseCart.addEventListener('click', () => {

      cart.classList.remove('active')
    })
  }

  $(document).on('mouseup',function(e) {
    if ($('.cart').has(e.target).length === 0) {
      cart.classList.remove('active');
    }
  });

  const check = document.querySelector('.form-switch input')

  if(check) {
    check.addEventListener('click', () => {
      const fields = document.querySelectorAll('.ui-field.company')

      fields.forEach(element => {
        if(check.checked) {
          element.classList.remove('hidden')
        } else {
          element.classList.add('hidden')
        }
      });
    })
  }

  const filterMore = document.querySelectorAll('.catalog-filter-more')

  if(filterMore.length) {
    filterMore.forEach(element => {
      const label = element.textContent

      element.addEventListener('click', () => {
        const parent = element.closest('.catalog-filter-list')
        const hiddenCheckbox = parent.querySelectorAll('.ui-checkbox.hidden')

        hiddenCheckbox.forEach(check => {
          check.classList.toggle('show')

          if(check.classList.contains("show")) {
            element.textContent = "скрыть"
          } else {
            element.textContent = label
          }
        });
        element.classList.toggle('active')
      })
    });
  }

  const deleteOrder = document.querySelectorAll('.order-item-control .ui-delete')

  if(deleteOrder.length) {
    deleteOrder.forEach(element => {
      element.addEventListener('click', () => {
        const item = element.closest('.order-item')

        item.remove()
      })
    });
  }

  const deleteCartItem = document.querySelectorAll('.cart-item .ui-delete')

  if(deleteCartItem.length) {
    deleteCartItem.forEach(element => {
      element.addEventListener('click', () => {
        const item = element.closest('.cart-item')

        item.remove()
      })
    });
  }

  const card = document.querySelector('.card-slider')

  if(card) {
    const main = new Splide( '.splide-slider-main', {
      type       : 'fade',
      pagination : false,
      arrows     : true,
      height: 790,
      width: 790,
    } );

    const thumbnails = new Splide( '.splide-slider-thumbnail', {
      rewind          : true,
      height: 790,
      isNavigation    : true,
      gap             : 20,
      pagination      : false,
      cover           : false,
      arrows     : false,
      autoHeight: true,
      direction: 'ttb',
      dragMinThreshold: {
        mouse: 4,
        touch: 10,
      },
    });

    main.sync( thumbnails );
    main.mount();
    thumbnails.mount();
  }

  if(document.querySelector('.splide.other')) {
    const sliderOther = new Splide( '.splide.other', {
      perPage: 4,
      gap: 20,
      pagination: false,
      arrows: true,
      drag: false,
    }).mount();
  }

  const inputs = document.querySelectorAll('.ui-input')

  if(inputs.length) {
    inputs.forEach(element => {
      element.addEventListener('blur', () => {
        const parent = element.closest('.ui-field')
        const label = parent.querySelector('.ui-label')

        console.log(element.value === '')

        if(element.value === '') {
          label.classList.remove('active')
        } else {
          label.classList.add('active')
        }
      })
    });
  }
});