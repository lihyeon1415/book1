async function fetchBooks(query) {
            const params = new URLSearchParams({
                target: "title",
                query,
                size: 8
            });
            const url = `https://dapi.kakao.com/v3/search/book?${params}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: "KakaoAK de07b457ef4032b346c2fb9b825f2647"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP 오류: ${response.status}`);
            }

            return response.json();
        }
        async function bookData() {
            try {
                // query와 section ID를 매핑
                const queries = [
                    { query: "바이브 코딩", sectionId: "section1" },
                ];

                for (const { query, sectionId } of queries) {
                    const data = await fetchBooks(query);

                    // 해당 섹션 내의 .box 요소 8개 선택
                    const section = document.querySelector(`#${sectionId}`);
                    const boxElements = section.querySelectorAll(".swiper-slide");

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
                    var slider_swiper = new Swiper('.mySwiper', {
                    navigation: {
                    nextEl: '#slider .swiper-button-next',
                    prevEl: '#slider .swiper-button-prev',
                    },
                    pagination: {
                    el: '#slider .swiper-pagination',
                    clickable: true,
                    renderBullet : function (index, className) {

                    }
                    },
                    });
                }
             } catch(error) {
                    console.error('에러발생:', error);
            }

        bookData();
        }