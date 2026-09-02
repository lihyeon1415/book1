/* ========================================
   카카오 도서 API 설정
======================================== */

const KAKAO_API_KEY = "de07b457ef4032b346c2fb9b825f2647";


/* ========================================
   도서 검색 API
======================================== */

async function fetchBooks(query, size = 8) {

    const params = new URLSearchParams({
        target: "title",
        query: query,
        size: size
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
        throw new Error(`HTTP 오류: ${response.status}`);
    }

    return response.json();
}


/* ========================================
   책 카드 생성
======================================== */

function bookCard(doc) {

    // 작가 정보
    const authors = Array.isArray(doc.authors)
        ? doc.authors.join(", ")
        : (doc.authors || "작가 미상");


    // 책 소개
    const desc = (
        doc.contents || "책 소개를 확인해 보세요."
    ).replace(/<[^>]*>/g, "");


    return `
        <article class="book-card">

            <div class="book-cover">
                <img
                    src="${doc.thumbnail || ""}"
                    alt="${doc.title || "책 표지"}"
                    loading="lazy"
                >
            </div>

            <div class="book-info">

                <h3>
                    ${doc.title || "제목 없음"}
                </h3>

                <h6>
                    ${authors}
                </h6>

                <p>
                    ${desc.substring(0, 90)}
                </p>

            </div>

        </article>
    `;
}


/* ========================================
   메인 배너 카드 생성
======================================== */

function heroCard(doc, index) {

    // 제목
    const title =
        doc?.title || "오늘의 책을 발견하세요";


    // 책 소개
    const desc = (
        doc?.contents ||
        "취향에 맞는 새로운 이야기를 만나보세요."
    ).replace(/<[^>]*>/g, "");


    return `
        <div class="swiper-slide">

            <div class="hero-card ${index % 2 ? "dark" : ""}">

                <div class="hero-copy">

                    <div class="tag">
                        RIDI RECOMMEND
                    </div>

                    <h1>
                        ${title}
                    </h1>

                    <p>
                        ${desc.substring(0, 90)}
                    </p>

                </div>

                ${
                    doc?.thumbnail

                        ? `
                            <img
                                class="hero-book"
                                src="${doc.thumbnail}"
                                alt="${title}"
                            >
                        `

                        : `
                            <div class="hero-fallback">
                                RIDI
                            </div>
                        `
                }

            </div>

        </div>
    `;
}


/* ========================================
   도서 데이터 불러오기
======================================== */

async function loadBooks() {

    const hero =
        document.querySelector("#hero-slides");

    const discovery =
        document.querySelector("#discovery-list");

    const best =
        document.querySelector("#best-list");


    /* ----------------------------------------
       로딩 화면
    ---------------------------------------- */

    hero.innerHTML = `
        <div class="swiper-slide">

            <div class="hero-card">

                <div class="loading">
                    책을 불러오는 중...
                </div>

            </div>

        </div>
    `;


    try {

        /* ----------------------------------------
           도서 데이터 요청
        ---------------------------------------- */

        const [cook, coding] = await Promise.all([
            fetchBooks("요리", 8),
            fetchBooks("바이브 코딩", 8)
        ]);


        /* ----------------------------------------
           검색 결과 합치기
        ---------------------------------------- */

        const books = [
            ...(cook.documents || []),
            ...(coding.documents || [])
        ];


        /* ----------------------------------------
           메인 배너
        ---------------------------------------- */

        hero.innerHTML = (cook.documents || [])
            .slice(0, 3)
            .map(heroCard)
            .join("");


        /* ----------------------------------------
           리디 발견
        ---------------------------------------- */

        discovery.innerHTML = books
            .slice(0, 8)
            .map(bookCard)
            .join("");


        /* ----------------------------------------
           베스트 도서
        ---------------------------------------- */

        best.innerHTML = books
            .slice(4, 8)
            .map(bookCard)
            .join("");


        /* ----------------------------------------
           도서 데이터 로딩 완료
        ---------------------------------------- */

        window.dispatchEvent(
            new Event("books:loaded")
        );


    } catch (error) {

        /* ----------------------------------------
           오류 처리
        ---------------------------------------- */

        console.error(
            "도서 데이터 로딩 실패:",
            error
        );


        hero.innerHTML = `
            <div class="swiper-slide">

                <div class="hero-card">

                    <div class="hero-copy">

                        <h1>
                            리디에서 새로운 책을 만나보세요.
                        </h1>

                        <p>
                            도서 API 연결을 확인해 주세요.
                        </p>

                    </div>

                </div>

            </div>
        `;
    }
}


/* ========================================
   실행
======================================== */

loadBooks();