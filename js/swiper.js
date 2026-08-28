//
var slider_swiper = new Swiper('.mySwiper', {
        navigation: {
          nextEl: '#slider .swiper-button-next',
          prevEl: '#slider .swiper-button-prev',
        },
        pagination: {
          el: '#slider .swiper-pagination',
          clickable: true,
        },
      });

      var section1_swiper = new Swiper('.s1Swiper', {
        slidesPerView: 6,
        spaceBetween: 10,
        navigation: {
          nextEl: '#section1 .swiper-button-next',
          prevEl: '#section1 .swiper-button-prev',
        },
      });