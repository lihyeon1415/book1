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

      async function sliderData() {
            try {
                // query와 section ID를 매핑
                const queries = [
                    { query: "요리", sectionId: "#slider" },
                ];

                for (const { query, sectionId } of queries) {
                    const data = await fetchBooks(query);

                    // 해당 섹션 내의 .box 요소 8개 선택
                    const section = document.querySelector(`#${sectionId}`);
                    const boxElements = section.querySelectorAll(".slide-content");

                    boxElements.forEach((box, i) => {
                        const doc = data.documents[i];
                        if (!doc) return;

                        // 요소 생성 및 추가
                        box.innerHTML = `<img src="${doc.thumbnail}">
                        <h3>${doc.title}</h3>
                        <h6>${doc.authors}</h6>
                        <p>${doc.contents.substring(0, 60)}</p>
                        <button>click</button>
                        `
                    });
                }
            } catch(error) {
                console.error('에러 발생:', error);
            }
        }

      sliderData();