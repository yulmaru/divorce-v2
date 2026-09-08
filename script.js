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

const legendLibrary = {
  im: {
    name: "박상준 변호사",
    image: "assets/lawyer-park-sang-jun.webp",
    videos: [
      { id: "J6ZrGSALPNY", title: "SK 주식 3배 폭등, 이혼 재산분할도 3배 늘어날까?" },
      { id: "eo-q3RdrXjI", title: "이혼 재산분할 특유재산·기여도, 혼인 10년 넘으면 무조건 5:5일까요?" },
      { id: "iTzh9SpjjJ8", title: "이혼 전문 변호사가 알려주는 상간 소송 진행 절차와 주의사항" }
    ]
  },
  park: {
    name: "박상준 변호사",
    image: "assets/lawyer-park-sang-jun.webp",
    videos: [
      { id: "iTzh9SpjjJ8", title: "이혼 전문 변호사가 알려주는 상간 소송 진행 절차와 주의사항" },
      { id: "3yG2TD5_e8A", title: "이혼소송 얼마나 걸릴까? 현실적인 기간 알려드립니다!" },
      { id: "eo-q3RdrXjI", title: "이혼 재산분할 특유재산·기여도, 혼인 10년 넘으면 무조건 5:5일까요?" }
    ]
  },
  moon: {
    name: "문지영 변호사",
    image: "assets/lawyer-moon-ji-young.webp",
    videos: [
      { id: "3yG2TD5_e8A", title: "이혼소송 얼마나 걸릴까? 현실적인 기간 알려드립니다" },
      { id: "J6ZrGSALPNY", title: "SK 주식 3배 폭등, 이혼 재산분할도 3배 늘어날까?" },
      { id: "iTzh9SpjjJ8", title: "이혼 전문 변호사가 알려주는 상간 소송 진행 절차와 주의사항" }
    ]
  },
  lee: {
    name: "이주원 변호사",
    image: "assets/lawyer-lee-ju-won.webp",
    videos: [
      { id: "eo-q3RdrXjI", title: "이혼 재산분할 특유재산·기여도, 혼인 10년 넘으면 무조건 5:5일까요?" },
      { id: "3yG2TD5_e8A", title: "이혼소송 얼마나 걸릴까? 현실적인 기간 알려드립니다!" },
      { id: "J6ZrGSALPNY", title: "SK 주식 3배 폭등, 이혼 재산분할도 3배 늘어날까?" }
    ]
  }
};

const legendPlayer = document.querySelector("#legend-player");
const legendPlaylist = document.querySelector("#legend-playlist");
const legendCurrentTitle = document.querySelector("#legend-current-title");
const legendLawyerImage = document.querySelector("#legend-lawyer-image");
const legendLawyerName = document.querySelector("#legend-lawyer-name");
let activeLegendLawyer = "im";
let activeLegendVideo = 0;

const thumbnailUrl = id => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

function renderLegendVideo() {
  const lawyer = legendLibrary[activeLegendLawyer];
  const video = lawyer.videos[activeLegendVideo];

  legendLawyerImage.src = lawyer.image;
  legendLawyerImage.alt = lawyer.name;
  legendLawyerName.textContent = lawyer.name;
  legendCurrentTitle.textContent = video.title;

  legendPlayer.innerHTML = "";
  const poster = document.createElement("button");
  poster.className = "legend-poster";
  poster.type = "button";
  poster.setAttribute("aria-label", `${video.title} 재생`);
  poster.innerHTML = `<img src="${thumbnailUrl(video.id)}" alt="${video.title} 영상 썸네일" /><span aria-hidden="true">▶</span>`;
  poster.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`;
    iframe.title = video.title;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    legendPlayer.replaceChildren(iframe);
  });
  legendPlayer.appendChild(poster);

  legendPlaylist.innerHTML = "";
  lawyer.videos.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.toggle("active", index === activeLegendVideo);
    button.setAttribute("aria-current", index === activeLegendVideo ? "true" : "false");
    button.innerHTML = `<span class="legend-list-no">${index + 1}</span><img src="${thumbnailUrl(item.id)}" alt="" /><span class="legend-list-title">${item.title}</span>`;
    button.addEventListener("click", () => {
      activeLegendVideo = index;
      renderLegendVideo();
    });
    legendPlaylist.appendChild(button);
  });
}

renderLegendVideo();

const featuredLawyerProfiles = [
  { name: "임재현", hook: "상황을 차분히 정리하는", image: "assets/lawyer-cutout-im.png" },
  { name: "박상준", hook: "사건의 핵심을 먼저 보는", image: "assets/lawyer-cutout-park.png" },
  { name: "문지영", hook: "놓치기 쉬운 쟁점까지 살피는", image: "assets/lawyer-cutout-moon.png" },
  { name: "이주원", hook: "다음 대응을 함께 설계하는", image: "assets/lawyer-cutout-lee.png" }
];

const featuredLawyerSection = document.querySelector("#featured-lawyer");
const featuredLawyerHook = document.querySelector("#featured-lawyer-hook");
const featuredLawyerName = document.querySelector("#featured-lawyer-name");
const featuredLawyerFields = document.querySelector("#featured-lawyer-fields");
const featuredLawyerCta = document.querySelector("#featured-lawyer-cta");
const featuredLawyerImage = document.querySelector("#featured-lawyer-image");
const featuredLawyerMetaName = document.querySelector("#featured-lawyer-meta-name");
const featuredLawyerPagination = document.querySelector("#featured-lawyer-pagination");
const featuredLawyerDuration = 6000;
const featuredLawyerReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeFeaturedLawyer = 0;
let featuredLawyerTimer = null;
let featuredLawyerTransitionTimer = null;

function renderFeaturedLawyerPagination() {
  featuredLawyerPagination.replaceChildren();
  featuredLawyerProfiles.forEach((profile, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "featured-lawyer-page";
    button.classList.toggle("active", index === activeFeaturedLawyer);
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(index === activeFeaturedLawyer));
    button.setAttribute("aria-label", `${index + 1}페이지 ${profile.name} 변호사`);
    button.addEventListener("click", () => showFeaturedLawyer(index));
    featuredLawyerPagination.appendChild(button);
  });
}

function applyFeaturedLawyer(profile) {
  featuredLawyerHook.textContent = profile.hook;
  featuredLawyerName.textContent = `${profile.name} 변호사`;
  featuredLawyerFields.setAttribute("aria-label", `${profile.name} 변호사 주요 상담 분야`);
  featuredLawyerCta.textContent = `${profile.name} 변호사 상담 요청`;
  featuredLawyerImage.src = profile.image;
  featuredLawyerImage.alt = `${profile.name} 변호사`;
  featuredLawyerMetaName.textContent = profile.name;
}

function scheduleFeaturedLawyer() {
  window.clearTimeout(featuredLawyerTimer);
  if (featuredLawyerReduceMotion.matches || document.hidden) return;
  featuredLawyerTimer = window.setTimeout(() => {
    showFeaturedLawyer((activeFeaturedLawyer + 1) % featuredLawyerProfiles.length);
  }, featuredLawyerDuration);
}

function showFeaturedLawyer(nextIndex) {
  window.clearTimeout(featuredLawyerTimer);
  window.clearTimeout(featuredLawyerTransitionTimer);

  if (nextIndex === activeFeaturedLawyer) {
    renderFeaturedLawyerPagination();
    scheduleFeaturedLawyer();
    return;
  }

  featuredLawyerSection.classList.add("is-changing");
  featuredLawyerTransitionTimer = window.setTimeout(() => {
    activeFeaturedLawyer = nextIndex;
    applyFeaturedLawyer(featuredLawyerProfiles[activeFeaturedLawyer]);
    renderFeaturedLawyerPagination();
    requestAnimationFrame(() => featuredLawyerSection.classList.remove("is-changing"));
    scheduleFeaturedLawyer();
  }, featuredLawyerReduceMotion.matches ? 0 : 280);
}

renderFeaturedLawyerPagination();
scheduleFeaturedLawyer();

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    window.clearTimeout(featuredLawyerTimer);
  } else {
    renderFeaturedLawyerPagination();
    scheduleFeaturedLawyer();
  }
});

const childSupportStandards = [
  { under: 200, amounts: [621000, 631000, 648000, 667000, 679000, 703000] },
  { under: 300, amounts: [752000, 759000, 767000, 782000, 790000, 957000] },
  { under: 400, amounts: [945000, 949000, 959000, 988000, 998000, 1227000] },
  { under: 500, amounts: [1098000, 1113000, 1140000, 1163000, 1280000, 1402000] },
  { under: 600, amounts: [1245000, 1266000, 1292000, 1318000, 1423000, 1604000] },
  { under: 700, amounts: [1401000, 1422000, 1479000, 1494000, 1598000, 1794000] },
  { under: 800, amounts: [1582000, 1598000, 1614000, 1630000, 1711000, 1964000] },
  { under: 900, amounts: [1789000, 1807000, 1850000, 1887000, 1984000, 2163000] },
  { under: 1000, amounts: [1997000, 2017000, 2065000, 2137000, 2159000, 2246000] },
  { under: 1200, amounts: [2095000, 2116000, 2137000, 2180000, 2223000, 2540000] },
  { under: Infinity, amounts: [2207000, 2245000, 2312000, 2405000, 2476000, 2883000] }
];

const childAgeBands = {
  age0_2: { index: 0, label: "만 0~2세" },
  age3_5: { index: 1, label: "만 3~5세" },
  age6_8: { index: 2, label: "만 6~8세" },
  age9_11: { index: 3, label: "만 9~11세" },
  age12_14: { index: 4, label: "만 12~14세" },
  age15_18: { index: 5, label: "만 15~18세" }
};

const supportCalcForm = document.querySelector("#support-calc-form");
const supportCalcError = document.querySelector("#support-calc-error");
const supportResult = document.querySelector("#support-result");
const supportWonFormatter = new Intl.NumberFormat("ko-KR");
const supportPercentFormatter = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 });
const roundToThousand = amount => Math.round(amount / 1000) * 1000;

supportCalcForm?.addEventListener("submit", event => {
  event.preventDefault();

  const fatherIncomeValue = supportCalcForm.elements.fatherIncome.value.trim();
  const motherIncomeValue = supportCalcForm.elements.motherIncome.value.trim();
  const fatherIncome = Number(fatherIncomeValue);
  const motherIncome = Number(motherIncomeValue);
  const selectedAge = childAgeBands[supportCalcForm.elements.childAgeBand.value];
  const validIncome = fatherIncomeValue !== "" && motherIncomeValue !== "" && Number.isFinite(fatherIncome) && Number.isFinite(motherIncome) && fatherIncome >= 0 && motherIncome >= 0;
  const combinedIncome = fatherIncome + motherIncome;

  if (!validIncome || combinedIncome <= 0 || !selectedAge) {
    supportCalcError.hidden = false;
    supportResult.hidden = true;
    return;
  }

  supportCalcError.hidden = true;
  const standard = childSupportStandards.find(row => combinedIncome < row.under);
  const oneChildAmount = roundToThousand(standard.amounts[selectedAge.index] * 1.065);
  const fatherRatio = fatherIncome / combinedIncome;
  const motherRatio = motherIncome / combinedIncome;
  const fatherAmount = roundToThousand(oneChildAmount * fatherRatio);
  const motherAmount = roundToThousand(oneChildAmount * motherRatio);

  document.querySelector("#support-result-amount").textContent = `${supportWonFormatter.format(oneChildAmount)}원`;
  document.querySelector("#support-result-summary").textContent = `부모 합산 월소득 ${supportWonFormatter.format(combinedIncome)}만원 · ${selectedAge.label} 기준`;
  document.querySelector("#father-share-result").textContent = `${supportPercentFormatter.format(fatherRatio * 100)}% · 약 ${supportWonFormatter.format(fatherAmount)}원`;
  document.querySelector("#mother-share-result").textContent = `${supportPercentFormatter.format(motherRatio * 100)}% · 약 ${supportWonFormatter.format(motherAmount)}원`;
  document.querySelector("#support-result-note").textContent = fatherIncome === 0 || motherIncome === 0
    ? "소득이 0원이어도 실제 재판에서는 학력·경력·과거 소득 등에 따른 추정소득이 적용될 수 있습니다. 양육자 여부와 재산·교육비·치료비·양육환경 등에 따라 실제 지급액은 달라질 수 있습니다."
    : "입력한 소득 비율에 따른 단순 참고값이며, 실제 지급액은 양육자 여부와 재산·교육비·치료비·양육환경 등에 따라 달라질 수 있습니다.";

  supportResult.hidden = false;
  supportResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

const heroInquiry = document.querySelector("#hero-inquiry");
const heroInquiryCount = document.querySelector("#hero-inquiry-count");
const heroInquiryError = document.querySelector("#hero-inquiry-error");
const consultNextButton = document.querySelector("#hero-consult-next");
const consultModal = document.querySelector("#consult-modal");
const consultDetailsForm = document.querySelector("#consult-details-form");
const consultName = document.querySelector("#consult-name");
const consultSubmitStatus = document.querySelector("#consult-submit-status");
let consultReturnFocus = null;

function updateInquiryCount() {
  const length = heroInquiry.value.length;
  heroInquiryCount.textContent = `${length.toLocaleString("ko-KR")} / 1,000`;
  if (length > 0) {
    heroInquiryError.hidden = true;
  }
}

function openConsultModal() {
  if (!heroInquiry.value.trim()) {
    heroInquiryError.hidden = false;
    heroInquiry.focus();
    return;
  }

  consultReturnFocus = document.activeElement;
  consultModal.hidden = false;
  document.body.classList.add("consult-modal-open");
  requestAnimationFrame(() => {
    consultModal.classList.add("open");
    consultName.focus();
  });
}

function closeConsultModal() {
  consultModal.classList.remove("open");
  document.body.classList.remove("consult-modal-open");
  window.setTimeout(() => {
    consultModal.hidden = true;
    consultSubmitStatus.textContent = "";
    consultSubmitStatus.classList.remove("error");
    consultReturnFocus?.focus();
  }, 240);
}

heroInquiry.addEventListener("input", updateInquiryCount);
consultNextButton.addEventListener("click", openConsultModal);
consultModal.querySelectorAll("[data-consult-close]").forEach(element => {
  element.addEventListener("click", closeConsultModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !consultModal.hidden) {
    closeConsultModal();
  }
});

consultDetailsForm.querySelectorAll('input[type="tel"]').forEach(input => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 4);
  });
});

consultDetailsForm.addEventListener("submit", async event => {
  event.preventDefault();
  if (!consultDetailsForm.reportValidity()) return;
  if (consultDetailsForm.elements.website.value) return;

  const endpoint = consultDetailsForm.dataset.endpoint.trim();
  if (!endpoint) {
    consultSubmitStatus.textContent = "온라인 접수 저장소 연결 전입니다. 즉시 상담은 1800-6419로 연락해 주세요.";
    consultSubmitStatus.classList.add("error");
    return;
  }

  const submitButton = consultDetailsForm.querySelector(".consult-submit");
  const phone = [
    consultDetailsForm.elements.phonePrefix.value,
    consultDetailsForm.elements.phoneMiddle.value,
    consultDetailsForm.elements.phoneLast.value
  ].join("-");
  const query = new URLSearchParams(window.location.search);
  const payload = new URLSearchParams({
    name: consultDetailsForm.elements.name.value.trim(),
    phone,
    inquiry: heroInquiry.value.trim(),
    privacyConsent: "동의",
    submittedAt: new Date().toISOString(),
    pageUrl: window.location.href,
    utmSource: query.get("utm_source") || "",
    utmCampaign: query.get("utm_campaign") || ""
  });

  submitButton.disabled = true;
  submitButton.firstChild.textContent = "전송 중... ";
  consultSubmitStatus.textContent = "";
  consultSubmitStatus.classList.remove("error");

  try {
    const destination = new URL(endpoint, window.location.href);
    const crossOrigin = destination.origin !== window.location.origin;
    const response = await fetch(destination, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: payload.toString(),
      ...(crossOrigin ? { mode: "no-cors" } : {})
    });
    if (!crossOrigin && !response.ok) throw new Error(`HTTP ${response.status}`);

    consultSubmitStatus.textContent = "상담 신청이 접수되었습니다. 확인 후 연락드리겠습니다.";
    consultDetailsForm.reset();
    heroInquiry.value = "";
    updateInquiryCount();
  } catch (error) {
    console.error("Consultation submission failed", error);
    consultSubmitStatus.textContent = "전송하지 못했습니다. 잠시 후 다시 시도하거나 1800-6419로 연락해 주세요.";
    consultSubmitStatus.classList.add("error");
  } finally {
    submitButton.disabled = false;
    submitButton.firstChild.textContent = "상담 신청 완료 ";
  }
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
