const params = new URLSearchParams(location.search);
const item = window.YULMARU_CASES.find(entry => String(entry.id) === params.get("id")) || window.YULMARU_CASES[0];

const lawyerProfiles = {
  "박상준": { image: "assets/lawyer-cutout-park.png", fields: "재산분할 · 조정이혼 · 위자료" },
  "임재현": { image: "assets/lawyer-cutout-im.png", fields: "협의이혼 · 상간소송 · 위자료" },
  "문지영": { image: "assets/lawyer-cutout-moon.png", fields: "친권 · 양육권 · 양육비" },
  "이주원": { image: "assets/lawyer-cutout-lee.png", fields: "재판이혼 · 재산분할 · 협의이혼" }
};
const lawyerOrder = { "박상준": 0, "임재현": 1, "문지영": 2, "이주원": 3 };
const lawyerNames = item.lawyers.replaceAll(" 변호사", "").split(" · ").sort((a, b) =>
  (lawyerOrder[a] ?? 9) - (lawyerOrder[b] ?? 9)
);
const lawyerCards = lawyerNames.map(name => {
  const profile = lawyerProfiles[name] || lawyerProfiles["임재현"];
  return `<article class="case-detail-lawyer-card">
    <div><img src="${profile.image}" alt="${name} 변호사" /></div>
    <h3>${name} 변호사</h3>
    <p>${profile.fields}</p>
  </article>`;
}).join("");

document.title = `${item.title} | 법무법인 율마루`;
document.querySelector("#case-detail").innerHTML = `
  <section class="case-detail-hero">
    <div>
      <a href="index.html#success-cases">← 성공사례 목록</a>
      <p>YULMARU SUCCESSFUL CASE</p>
      <span>${item.tag}</span>
      <h1>${item.title}</h1>
      <em>${item.result.replace("\n", "<br>")}</em>
    </div>
    <figure data-case-id="${item.id}">
      <img src="${item.image}" alt="${item.title} 관련 판결문" />
      <strong>${item.result.replace("\n", "<br>")}</strong>
    </figure>
  </section>
  <article class="case-detail-body">
    <div class="case-detail-lawyers">
      <header><small>YULMARU LAWYERS</small><h2>사건 담당 변호사</h2></header>
      <div class="case-detail-lawyer-grid">${lawyerCards}</div>
    </div>
    <section>
      <small>01 · 사건의 핵심</small>
      <h2>의뢰인의 상황을 정확하게 정리했습니다.</h2>
      <p>${item.summary} 이혼 사건은 혼인 기간, 재산 형성 과정, 자녀의 현재 생활환경과 확보된 자료에 따라 판단 요소가 달라집니다.</p>
    </section>
    <section>
      <small>02 · 율마루의 대응</small>
      <h2>주장보다 자료가 말하도록 준비했습니다.</h2>
      <p>상대방의 주장과 실제 자료를 항목별로 대조하고, 재산·위자료·친권과 양육권 등 서로 다른 쟁점을 분리해 대응 방향을 설계했습니다.</p>
    </section>
    <section class="case-detail-result">
      <small>03 · 사건 결과</small>
      <h2>${item.result.replace("\n", "<br>")}</h2>
      <p>위 내용은 해당 성공사례를 이해하기 쉽게 정리한 것이며, 구체적인 사건 결과는 개별 사실관계에 따라 달라질 수 있습니다.</p>
    </section>
    <div class="case-detail-actions">
      <a href="inquiry.html">이혼 상담 요청하기 →</a>
      <a href="https://yulmaru.co.kr/bbs/board.php?bo_table=case&wr_id=${item.id}&sca=%EC%9D%B4%ED%98%BC" target="_blank" rel="noopener noreferrer">율마루 원문 확인 ↗</a>
    </div>
  </article>`;
