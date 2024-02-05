$( document ).ready(function() {
  $('select.ui-pgn-select').styler();

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

  const swiperItem = new Swiper('.swiper.slider-item', {
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

        const sliderItem = swiperItem[getIndex(sliderElement)]
        const sliderLength = sliderItem.slides.length

        if(sliderLength > 1) {
          const slideWidth = sliderItem.width
          const sliderPath = Math.round(slideWidth / sliderLength)
          const sliderMousePos = e.clientX - sliderElement.offsetLeft
          const sliderSlide = Math.floor(sliderMousePos / sliderPath)

          sliderItem.slideTo(sliderSlide)
        }
      }
    })

    function getIndex(el) {
      const sliders = document.querySelectorAll('[data-mousemove-swipe]')

      return Array.from(sliders).indexOf(el)
    }
  }

  if(document.querySelector('[data-mousemove-swipe]')) {
    sliderMouseSlideInit()
  }

  const btnView1 = document.querySelector('.view-1')
  const btnView2 = document.querySelector('.view-2')


  if(btnView1) {
    btnView1.addEventListener('click', () => {
      const columns = document.querySelectorAll('.catalog-items .col-md-3')

      columns.forEach(element => {
        const elementBottom = element.querySelector('.catalog-item-bottom')

        element.className  = 'col-md-4'
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

        element.className  = 'col-md-3'
        elementBottom.classList.remove('view-1')
      });

      btnView2.classList.add("active")
      btnView1.classList.remove("active")
    })
  }
});