// ========================================
// Kakao Book API 설정
// ========================================

const KAKAO_API_KEY = "de07b457ef4032b346c2fb9b825f2647";


// ========================================
// 도서 검색 API
// ========================================

async function fetchBooks(query, size = 12) {
    const params = new URLSearchParams({
        target: "title",
        query,
        size
    });

    const response = await fetch(
        `https://dapi.kakao.com/v3/search/book?${params}`,
        {
            headers: {
                Authorization: `KakaoAK ${KAKAO_API_KEY}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("API 오류");
    }

    return response.json();
}


// ========================================
// 도서 카드 생성
// ========================================

function card(book) {
    const authors = Array.isArray(book.authors)
        ? book.authors.join(", ")
        : (book.authors || "작가 미상");

    const description = (
        book.contents || "책 소개를 확인해 보세요."
    ).replace(/<[^>]*>/g, "");

    return `
        <article class="book-card">

            <div class="book-cover">
                <img
                    src="${book.thumbnail || ""}"
                    alt="${book.title || "책 표지"}"
                    loading="lazy"
                >
            </div>

            <div class="book-info">
                <h3>${book.title || "제목 없음"}</h3>
                <h6>${authors}</h6>
                <p>${description.substring(0, 90)}</p>
            </div>

        </article>
    `;
}


// ========================================
// 도서 목록 불러오기
// ========================================

async function load(query) {
    const list = document.querySelector("#list");
    const count = document.querySelector("#count");
    const title = document.querySelector("#title");

    list.innerHTML = `
        <div class="loading">
            책을 불러오는 중...
        </div>
    `;

    try {
        const data = await fetchBooks(query);

        if (data.documents.length) {
            list.innerHTML = data.documents
                .map(card)
                .join("");
        } else {
            list.innerHTML = `
                <div class="loading">
                    검색 결과가 없습니다.
                </div>
            `;
        }

        count.textContent = `${data.documents.length}권`;
        title.textContent = `${query} 추천`;

    } catch (error) {
        list.innerHTML = `
            <div class="loading">
                도서를 불러오지 못했습니다.
                인터넷 연결과 API 설정을 확인해 주세요.
            </div>
        `;

        count.textContent = "";
    }
}


// ========================================
// 페이지 실행
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // 카테고리 버튼
    document
        .querySelectorAll(".category-tabs button")
        .forEach(button => {

            button.addEventListener("click", () => {

                document
                    .querySelector(".category-tabs .active")
                    ?.classList.remove("active");

                button.classList.add("active");

                load(button.dataset.q);
            });

        });


    // 검색
    document
        .querySelector("#searchForm")
        .addEventListener("submit", event => {

            event.preventDefault();

            const query = document
                .querySelector("#searchInput")
                .value
                .trim();

            if (query) {
                load(query);
            }

        });


    // 검색창 열기 / 닫기
    document
        .querySelector("#searchToggle")
        .addEventListener("click", () => {

            document
                .querySelector(".search-bar")
                .classList.toggle("show");

        });


    // 처음 페이지에 들어왔을 때
    load("요리");

});