const issueContent = {
  property: {
    title: "재산분할은 명의보다 ‘혼인 중 기여’가 핵심입니다.",
    body: "취득·유지 과정, 가사와 육아 기여, 혼인 기간, 재산의 형성 시점을 함께 정리해야 합니다. 처분 우려가 있다면 보전 조치 가능성도 검토할 수 있습니다."
  },
  affair: {
    title: "외도는 정황보다 ‘적법하게 확보한 증거’가 중요합니다.",
    body: "메시지, 사진, 결제·이동 기록 등은 사안에 따라 의미가 달라집니다. 타인의 계정에 무단 접속하거나 불법 위치추적을 하는 방식은 오히려 불리해질 수 있습니다."
  },
  child: {
    title: "양육권의 기준은 부모의 승부가 아닌 ‘자녀의 복리’입니다.",
    body: "현재 양육상황과 주 양육자, 안정적인 생활환경, 부모의 양육계획 등을 종합적으로 살핍니다. 감정적인 대응보다 일관된 양육 기록이 중요합니다."
  },
  refusal: {
    title: "한쪽이 거부해도 재판상 이혼 사유가 있다면 진행할 수 있습니다.",
    body: "부정행위, 악의의 유기, 부당한 대우, 혼인을 계속하기 어려운 중대한 사유 등 사실관계를 확인하고 이를 뒷받침할 자료를 체계적으로 준비해야 합니다."
  }
};

const issueCards = document.querySelectorAll(".issue-card");
const detail = document.querySelector("#issue-detail");

issueCards.forEach((card, index) => {
  if (index === 0) card.classList.add("active");
  card.addEventListener("click", () => {
    const data = issueContent[card.dataset.target];
    issueCards.forEach(item => item.classList.remove("active"));
    card.classList.add("active");
    detail.querySelector("h3").textContent = data.title;
    detail.querySelector("p").textContent = data.body;
  });
});

document.querySelectorAll(".content-filters button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".content-filters button").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".story-card").forEach(card => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-header nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
