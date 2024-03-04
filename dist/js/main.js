$( document ).ready(function() {
  $('select.ui-pgn-select').styler();

  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // We listen to the resize event
  window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

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
    new Splide( '.splide.info' ).mount();
  }

  const btnFilter = document.querySelectorAll('.catalog-filter-btn')

  if(btnFilter.length) {
    btnFilter.forEach(element => {
      element.addEventListener('click', () => {
        const parent = element.closest('.catalog-filter-type')
        const title = parent.querySelector('.catalog-filter-title')
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
      // effect: 'fade',
      pagination: {
        el: '.swiper-pagination',
      }
    });

    function sliderMouseSlideInit() {
      document.addEventListener('mousemove', function(e) {
        const targetElement = e.target

        if(targetElement.closest('[data-mousemove-swipe]')) {
          const sliderElement = targetElement.closest('[data-mousemove-swipe]')

          const sliderItem = swiperCatalog[getIndex(sliderElement)] || swiperCatalog
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
  const btnViewMob = document.querySelector('.catalog-mob-view')

  if(btnViewMob) {
    btnViewMob.addEventListener('click', () => {
      const columns = document.querySelectorAll('.catalog-items .col-md-3')

      columns.forEach(element => {
        element.classList.toggle('col-ss-12')
        element.classList.toggle('col-ss-6')
      });

      btnViewMob.classList.toggle("active")
    })
  }

  if(btnView1) {
    btnView1.addEventListener('click', () => {
      const columns = document.querySelectorAll('.catalog-items .col-md-3')

      columns.forEach(element => {
        const elementBottom = element.querySelector('.catalog-item-bottom')

        element.classList.add('col-md-4')
        element.classList.remove('col-md-3')

        element.classList.add('col-sm-12')
        element.classList.remove('col-sm-6')

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

        element.classList.remove('col-sm-12')
        element.classList.add('col-sm-6')

        elementBottom.classList.remove('view-1')
      });

      btnView2.classList.add("active")
      btnView1.classList.remove("active")
    })
  }

  const btnOpenCart = document.querySelector('.header-cart')
  const cart = document.querySelector('.cart')

  const btnCloseCart = document.querySelector('.cart-head-btn')

  if(btnCloseCart) {
    btnCloseCart.addEventListener('click', () => {

      cart.classList.toggle('active')
    })
  }


  if(btnOpenCart) {
    btnOpenCart.addEventListener('click', () => {
      if(window.innerWidth <= 1024) {
        const body = document.body
        const html = document.documentElement
        const header = document.querySelector('.header')

        body.classList.toggle('active')
        html.classList.toggle('active')
        header.classList.toggle('active')
      }

      cart.classList.toggle('active')
    })
  }

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
      width: 790,
      // height: 500

      breakpoints: {
        1024: {
          height: 580
        },
        768: {
          height: 335
        },
      }
    } );

    const thumbnails = new Splide( '.splide-slider-thumbnail', {
      rewind          : true,
      autoHeight: true,
      height: "auto",
      isNavigation    : true,
      gap             : 20,
      pagination      : false,
      cover           : false,
      arrows     : false,
      direction: 'ttb',
      dragMinThreshold: {
        mouse: 4,
        touch: 10,
      },

      breakpoints: {
        768: {
          direction: 'ltr',
          perPage: 4,
          gap: 12
        },
      }
    });

    thumbnails.on( 'resize', function () {
      if(document.documentElement.clientWidth > 768) {
        thumbnails.root.style.overflow = "hidden"
        thumbnails.root.style.height = `${main.root.offsetHeight}px`
      } else {
        thumbnails.root.style.height = `100%`
        // thumbnails.root.style.overflow = "visible"
      }
    } );

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
      // drag: false,

      breakpoints: {
        1024: {
          perPage: 3,
          gap: 10
        },
        768: {
          perPage: 2,
        },
        460: {
          perPage: 1,
          // destroy: true
          padding: { right: 45 }
        },
      }
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

  const mobCategoryBtn = document.querySelector('.catalog-mob-category')

  if(mobCategoryBtn) {
    mobCategoryBtn.addEventListener('click', () => {
      const mobCategoryMenu = document.querySelector('.mobile-category')
      const mobBg = document.querySelector('.mobile-bg')

      mobCategoryMenu.classList.add('active')
      mobBg.classList.add('active')
    })
  }

  const mobFilteryBtn = document.querySelector('.catalog-mob-filter')

  if(mobFilteryBtn) {
    mobFilteryBtn.addEventListener('click', () => {
      const mobFilterMenu = document.querySelector('.mobile-filter')
      const mobBg = document.querySelector('.mobile-bg')

      mobFilterMenu.classList.add('active')
      mobBg.classList.add('active')
    })
  }

  const btnCloseFilter = document.querySelector('.mobile-menu-btn')

  if(btnCloseCart) {
    btnCloseFilter.addEventListener('click', () => {
      const filterMenu = btnCloseFilter.closest('.mobile')
      const mobBg = document.querySelector('.mobile-bg')

      filterMenu.classList.remove('active')
      mobBg.classList.remove('active')
    })
  }

  $(document).on('mouseup',function(e) {
    if(window.innerWidth > 1024) {
      if ($('.cart').has(e.target).length === 0) {
        $('.cart').removeClass('active');
      }
    }
    if ($('.mobile-category.active').has(e.target).length === 0 && $('.mobile-filter.active').has(e.target).length === 0) {
      $('.mobile-category.active').removeClass('active');
      $('.mobile-filter.active').removeClass('active');

      $('.mobile-bg').removeClass('active');
    }
  });

  const burgerBtn = document.querySelector('.header-burger')

  if(burgerBtn) {
    burgerBtn.addEventListener('click', () => {
      const burgerMenu = document.querySelector('.burger-menu')
      const header = document.querySelector('.header')
      const body = document.body
      const html = document.documentElement

      burgerBtn.classList.toggle('active')
      burgerMenu.classList.toggle('active')
      header.classList.toggle('active')
      body.classList.toggle('active')
      html.classList.toggle('active')
    })
  }
});