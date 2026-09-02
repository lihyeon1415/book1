/* ========================================
   Swiper 변수
======================================== */

let sliderSwiper;
let discoverySwiper;


/* ========================================
   Swiper 초기화
======================================== */

function initSwipers() {

    /* 기존 Swiper 삭제 */

    if (sliderSwiper) {
        sliderSwiper.destroy(true, true);
    }

    if (discoverySwiper) {
        discoverySwiper.destroy(true, true);
    }


    /* ========================================
       메인 슬라이더
    ======================================== */

    sliderSwiper = new Swiper(".mySwiper", {

        // 무한 반복
        loop: true,

        // 슬라이드 사이 간격
        spaceBetween: 20,

        // 자동 재생
        autoplay: {
            delay: 4500,
            disableOnInteraction: false
        },

        // 이전 / 다음 버튼
        navigation: {
            nextEl: "#slider .swiper-button-next",
            prevEl: "#slider .swiper-button-prev"
        },

        // 페이지네이션
        pagination: {
            el: "#slider .swiper-pagination",
            clickable: true
        }

    });


    /* ========================================
       리디 발견 슬라이더
    ======================================== */

    discoverySwiper = new Swiper(".s1Swiper", {

        // 기본 화면에서는 2개 표시
        slidesPerView: 2,

        // 카드 사이 간격
        spaceBetween: 12,

        // 화면 크기에 따른 카드 개수
        breakpoints: {

            // 650px 이상
            650: {
                slidesPerView: 3,
                spaceBetween: 14
            },

            // 900px 이상
            900: {
                slidesPerView: 6,
                spaceBetween: 14
            }

        },

        // 이전 / 다음 버튼
        navigation: {
            nextEl: "#section1 .swiper-button-next",
            prevEl: "#section1 .swiper-button-prev"
        }

    });
}


/* ========================================
   페이지 로딩 완료 후 실행
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    initSwipers
);


/* ========================================
   책 데이터 로딩 완료 후 실행
======================================== */

window.addEventListener(
    "books:loaded",
    initSwipers
);