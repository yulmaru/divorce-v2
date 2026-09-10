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

issueCards.forEach(card => {
  const data = issueContent[card.dataset.target];
  const front = document.createElement("div");
  front.className = "issue-card-front";
  while (card.firstChild) front.appendChild(card.firstChild);
  card.appendChild(front);
  const checkpoint = document.createElement("div");
  checkpoint.className = "issue-card-checkpoint";
  checkpoint.innerHTML = `<span>CHECK POINT</span><h3>${data.title}</h3><p>${data.body}</p><small>원래 내용 보기 ←</small>`;
  card.appendChild(checkpoint);
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-expanded", "false");

  const toggleCheckpoint = () => {
    const alreadyActive = card.classList.contains("active");
    issueCards.forEach(item => {
      item.classList.remove("active");
      item.setAttribute("aria-expanded", "false");
    });
    if (!alreadyActive) {
      card.classList.add("active");
      card.setAttribute("aria-expanded", "true");
    }
  };

  card.addEventListener("click", toggleCheckpoint);
  card.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggleCheckpoint();
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
      { id: "iTzh9SpjjJ8", title: "이혼 전문 변호사가 알려주는 상간 소송 진행 절차와 주의사항" },
      { id: "J6ZrGSALPNY", title: "SK 주식 3배 폭등, 이혼 재산분할도 3배 늘어날까?" },
      { id: "eo-q3RdrXjI", title: "이혼 재산분할 특유재산·기여도, 혼인 10년 넘으면 무조건 5:5일까요?" }
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
  poster.setAttribute("aria-label", `${video.title} 유튜브에서 보기`);
  poster.innerHTML = `<img src="${thumbnailUrl(video.id)}" alt="${video.title} 영상 썸네일" /><span aria-hidden="true">▶</span>`;
  poster.addEventListener("click", () => {
    window.open(`https://www.youtube.com/watch?v=${video.id}`, "_blank", "noopener,noreferrer");
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
  { name: "박상준", hook: "사건의 핵심을 먼저 보는", image: "assets/lawyer-cutout-park.png", fields: ["재산분할", "조정이혼", "상속·유류분", "위자료"] },
  { name: "임재현", hook: "상황을 차분히 정리하는", image: "assets/lawyer-cutout-im.png", fields: ["협의이혼", "상간소송", "위자료", "재판상이혼"] },
  { name: "문지영", hook: "놓치기 쉬운 쟁점까지 살피는", image: "assets/lawyer-cutout-moon.png", fields: ["친권변경", "양육·양육비", "아동학대", "가정폭력"] },
  { name: "이주원", hook: "다음 대응을 함께 설계하는", image: "assets/lawyer-cutout-lee.png", fields: ["접근금지", "재판상이혼", "재산분할", "협의이혼"] }
];

const featuredLawyerSection = document.querySelector("#featured-lawyer");
const featuredLawyerHook = document.querySelector("#featured-lawyer-hook");
const featuredLawyerName = document.querySelector("#featured-lawyer-name");
const featuredLawyerFields = document.querySelector("#featured-lawyer-fields");
const featuredLawyerCta = document.querySelector("#featured-lawyer-cta");
const featuredLawyerImage = document.querySelector("#featured-lawyer-image");
const featuredLawyerMetaName = document.querySelector("#featured-lawyer-meta-name");
const featuredLawyerPagination = document.querySelector("#featured-lawyer-pagination");
const featuredLawyerDuration = 4600;
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
  featuredLawyerFields.replaceChildren(...profile.fields.map(field => {
    const item = document.createElement("span");
    item.textContent = field;
    return item;
  }));
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

const featuredLawyerConsultTrigger = document.querySelector(".featured-lawyer-consult-trigger");
const lawyerConsultModal = document.querySelector("#lawyer-consult-modal");
const lawyerConsultTitle = document.querySelector("#lawyer-consult-modal-title");
const lawyerConsultTitleName = document.querySelector("#lawyer-consult-title-name");
const lawyerConsultForm = document.querySelector("#lawyer-consult-form");
let lawyerConsultReturnFocus = null;

if (featuredLawyerConsultTrigger && lawyerConsultModal && lawyerConsultTitle && lawyerConsultTitleName && lawyerConsultForm) {
  const lawyerConsultPhone = lawyerConsultForm.elements.phone;
  const lawyerConsultStatus = lawyerConsultForm.querySelector(".consult-submit-status");

  const formatLawyerConsultPhone = value => {
    const digits = String(value || "").replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  };

  const closeLawyerConsultModal = () => {
    lawyerConsultModal.classList.remove("open");
    document.body.classList.remove("consult-modal-open");
    window.setTimeout(() => {
      lawyerConsultModal.hidden = true;
      lawyerConsultStatus.textContent = "";
      lawyerConsultStatus.classList.remove("error");
      lawyerConsultReturnFocus?.focus();
      scheduleFeaturedLawyer();
    }, 240);
  };

  featuredLawyerConsultTrigger.addEventListener("click", () => {
    const requestText = featuredLawyerCta.textContent.trim();
    const lawyerName = requestText.replace(/\s*변호사 상담 요청$/, "").trim();
    lawyerConsultTitleName.textContent = `${lawyerName} 변호사`;
    lawyerConsultForm.elements.lawyer.value = lawyerName;
    lawyerConsultReturnFocus = featuredLawyerConsultTrigger;
    window.clearTimeout(featuredLawyerTimer);
    lawyerConsultModal.hidden = false;
    document.body.classList.add("consult-modal-open");
    requestAnimationFrame(() => {
      lawyerConsultModal.classList.add("open");
      lawyerConsultForm.elements.name.focus();
    });
  });

  lawyerConsultModal.querySelectorAll("[data-lawyer-consult-close]").forEach(element => {
    element.addEventListener("click", closeLawyerConsultModal);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !lawyerConsultModal.hidden) closeLawyerConsultModal();
  });

  lawyerConsultPhone.addEventListener("input", () => {
    lawyerConsultPhone.value = formatLawyerConsultPhone(lawyerConsultPhone.value);
    lawyerConsultPhone.setCustomValidity("");
  });

  lawyerConsultForm.addEventListener("submit", async event => {
    event.preventDefault();
    if (!lawyerConsultForm.reportValidity() || lawyerConsultForm.elements.website.value) return;

    const phone = String(lawyerConsultPhone.value || "").replace(/\D/g, "");
    if (!/^010\d{8}$/.test(phone)) {
      lawyerConsultPhone.setCustomValidity("연락처를 정확히 입력해 주세요.");
      lawyerConsultForm.reportValidity();
      lawyerConsultPhone.focus();
      return;
    }

    const submitButton = lawyerConsultForm.querySelector(".consult-submit");
    const lawyerName = lawyerConsultForm.elements.lawyer.value;
    const endpoint = lawyerConsultForm.dataset.endpoint.trim();
    const userAgent = navigator.userAgent || "";
    const deviceType = /iPad|Tablet/i.test(userAgent) ? "태블릿" : /Mobi|Android|iPhone|iPod/i.test(userAgent) ? "모바일" : "PC";
    const leadPayload = {
      source: `${lawyerName} 변호사 상담 요청`,
      name: lawyerConsultForm.elements.name.value.trim(),
      phone,
      caseType: "변호사 지정 상담",
      lawyer: lawyerName,
      debt: "",
      message: lawyerConsultForm.elements.message.value.trim(),
      consent: true,
      createdAt: new Date().toISOString(),
      pageUrl: window.location.href,
      deviceType,
      attachments: []
    };

    submitButton.disabled = true;
    submitButton.classList.add("is-loading");
    submitButton.firstChild.textContent = "접수 중 ";
    lawyerConsultStatus.textContent = "접수 중입니다.";
    lawyerConsultStatus.classList.remove("error");
    let lawyerConsultationSubmitted = false;

    try {
      const destination = new URL(endpoint, window.location.href);
      const crossOrigin = destination.origin !== window.location.origin;
      const response = await fetch(destination, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: new URLSearchParams({ payload: JSON.stringify(leadPayload) }).toString(),
        ...(crossOrigin ? { mode: "no-cors" } : {})
      });
      if (!crossOrigin && !response.ok) throw new Error(`HTTP ${response.status}`);
      lawyerConsultStatus.textContent = "상담 요청이 접수되었습니다. 확인 후 연락드리겠습니다.";
      lawyerConsultationSubmitted = true;
      lawyerConsultForm.reset();
      lawyerConsultForm.elements.lawyer.value = lawyerName;
    } catch (error) {
      console.error("Lawyer consultation submission failed", error);
      lawyerConsultStatus.textContent = "전송하지 못했습니다. 잠시 후 다시 시도해 주세요.";
      lawyerConsultStatus.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.classList.remove("is-loading");
      submitButton.firstChild.textContent = lawyerConsultationSubmitted ? "접수 완료 " : "상담 요청하기 ";
    }
  });
}

const heroInquiry = document.querySelector("#hero-inquiry");
const heroInquiryCount = document.querySelector("#hero-inquiry-count");
const heroInquiryError = document.querySelector("#hero-inquiry-error");
const consultNextButton = document.querySelector("#hero-consult-next");
const consultModal = document.querySelector("#consult-modal");
const consultDetailsForm = document.querySelector("#consult-details-form");
const consultName = document.querySelector("#consult-name");
const consultSubmitStatus = document.querySelector("#consult-submit-status");
const consultLawyerCards = document.querySelectorAll("[data-consult-lawyer]");
let consultReturnFocus = null;

consultLawyerCards.forEach(card => card.addEventListener("click", () => {
  const shouldDeselect = card.classList.contains("active");
  consultLawyerCards.forEach(item => {
    const selected = !shouldDeselect && item === card;
    item.classList.toggle("active", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
  if (consultDetailsForm?.elements.lawyer) consultDetailsForm.elements.lawyer.value = shouldDeselect ? "" : card.dataset.consultLawyer;
}));

if (heroInquiry && heroInquiryCount && heroInquiryError && consultNextButton && consultModal && consultDetailsForm && consultName && consultSubmitStatus) {

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

function getPhoneDigits(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 11);
}

function formatPhoneNumber(value) {
  const digits = getPhoneDigits(value);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

const consultPhone = consultDetailsForm.elements.phone;
consultPhone.addEventListener("input", () => {
  consultPhone.value = formatPhoneNumber(consultPhone.value);
  consultPhone.setCustomValidity("");
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
  const phone = getPhoneDigits(consultDetailsForm.elements.phone.value);
  if (!/^010\d{8}$/.test(phone)) {
    consultPhone.setCustomValidity("연락처를 정확히 입력해 주세요.");
    consultDetailsForm.reportValidity();
    consultPhone.focus();
    return;
  }
  const userAgent = navigator.userAgent || "";
  const deviceType = /iPad|Tablet/i.test(userAgent) ? "태블릿" : /Mobi|Android|iPhone|iPod/i.test(userAgent) ? "모바일" : "PC";
  const leadPayload = {
    source: "첫 대응 상담",
    name: consultDetailsForm.elements.name.value.trim(),
    phone,
    caseType: "이혼 상담",
    lawyer: consultDetailsForm.elements.lawyer.value,
    debt: "",
    message: heroInquiry.value.trim(),
    consent: true,
    createdAt: new Date().toISOString(),
    pageUrl: window.location.href,
    deviceType,
    attachments: []
  };
  const payload = new URLSearchParams({ payload: JSON.stringify(leadPayload) });

  submitButton.disabled = true;
  submitButton.classList.add("is-loading");
  submitButton.firstChild.textContent = "접수 중 ";
  consultSubmitStatus.textContent = "";
  consultSubmitStatus.classList.remove("error");
  let consultationSubmitted = false;

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
    consultationSubmitted = true;
    consultDetailsForm.reset();
    heroInquiry.value = "";
    updateInquiryCount();
  } catch (error) {
    console.error("Consultation submission failed", error);
    consultSubmitStatus.textContent = "전송하지 못했습니다. 잠시 후 다시 시도하거나 1800-6419로 연락해 주세요.";
    consultSubmitStatus.classList.add("error");
  } finally {
    submitButton.disabled = false;
    submitButton.classList.remove("is-loading");
    submitButton.firstChild.textContent = consultationSubmitted ? "접수 완료 " : "상담 신청 완료 ";
  }
});
}

const finalDbForm = document.querySelector("#final-db-form");

if (finalDbForm) {
  const finalPhone = finalDbForm.elements.phone;
  const stepTwoPhone = document.querySelector("#consult-phone");
  const caseTypeInput = finalDbForm.elements.caseType;
  const caseTypeButtons = finalDbForm.querySelectorAll("[data-case-type]");
  const finalDbStatus = finalDbForm.querySelector(".final-db-status");

  const formatFinalPhone = value => {
    const digits = String(value || "").replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  };

  caseTypeButtons.forEach(button => {
    button.addEventListener("click", () => {
      caseTypeInput.value = button.dataset.caseType;
      caseTypeButtons.forEach(item => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
    });
  });

  finalPhone.addEventListener("input", () => {
    finalPhone.value = formatFinalPhone(finalPhone.value);
    finalPhone.setCustomValidity("");
    if (stepTwoPhone) stepTwoPhone.value = finalPhone.value;
  });

  finalPhone.addEventListener("blur", () => {
    finalPhone.value = formatFinalPhone(finalPhone.value);
    if (stepTwoPhone) stepTwoPhone.value = finalPhone.value;
  });

  stepTwoPhone?.addEventListener("input", () => {
    finalPhone.value = stepTwoPhone.value;
  });

  finalDbForm.addEventListener("submit", async event => {
    event.preventDefault();
    if (!finalDbForm.reportValidity() || finalDbForm.elements.website.value) return;

    const phone = String(finalPhone.value || "").replace(/\D/g, "");
    if (!/^010\d{8}$/.test(phone)) {
      finalPhone.setCustomValidity("연락처를 정확히 입력해 주세요.");
      finalDbForm.reportValidity();
      finalPhone.focus();
      return;
    }

    const submitButton = finalDbForm.querySelector(".final-db-submit");
    const endpoint = finalDbForm.dataset.endpoint.trim();
    const userAgent = navigator.userAgent || "";
    const deviceType = /iPad|Tablet/i.test(userAgent) ? "태블릿" : /Mobi|Android|iPhone|iPod/i.test(userAgent) ? "모바일" : "PC";
    const leadPayload = {
      source: "하단 DB 상담",
      name: finalDbForm.elements.name.value.trim(),
      phone,
      caseType: caseTypeInput.value,
      debt: "",
      message: finalDbForm.elements.message.value.trim(),
      consent: true,
      createdAt: new Date().toISOString(),
      pageUrl: window.location.href,
      deviceType,
      attachments: []
    };

    submitButton.disabled = true;
    submitButton.classList.add("is-loading");
    submitButton.querySelector("span").textContent = "접수 중";
    finalDbStatus.textContent = "접수 중입니다.";
    finalDbStatus.classList.remove("error");
    let finalConsultationSubmitted = false;

    try {
      const destination = new URL(endpoint, window.location.href);
      const crossOrigin = destination.origin !== window.location.origin;
      const response = await fetch(destination, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: new URLSearchParams({ payload: JSON.stringify(leadPayload) }).toString(),
        ...(crossOrigin ? { mode: "no-cors" } : {})
      });
      if (!crossOrigin && !response.ok) throw new Error(`HTTP ${response.status}`);
      finalDbStatus.textContent = "상담 신청이 접수되었습니다. 확인 후 연락드리겠습니다.";
      finalConsultationSubmitted = true;
      finalDbForm.reset();
      caseTypeButtons[0]?.click();
    } catch (error) {
      console.error("Final consultation submission failed", error);
      finalDbStatus.textContent = "전송하지 못했습니다. 잠시 후 다시 시도해 주세요.";
      finalDbStatus.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.classList.remove("is-loading");
      submitButton.querySelector("span").textContent = finalConsultationSubmitted ? "접수 완료" : "상담 신청하기";
    }
  });
}

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-header nav");
const menuBackdrop = document.createElement("button");
menuBackdrop.className = "menu-backdrop";
menuBackdrop.type = "button";
menuBackdrop.setAttribute("aria-label", "메뉴 닫기");
document.body.appendChild(menuBackdrop);

const setMenuOpen = open => {
  nav.classList.toggle("open", open);
  menuBackdrop.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
};

menuButton.addEventListener("click", () => setMenuOpen(!nav.classList.contains("open")));
menuBackdrop.addEventListener("click", () => setMenuOpen(false));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenuOpen(false)));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") setMenuOpen(false);
});

const successCaseTrack = document.querySelector("#success-case-track");
if (successCaseTrack && window.YULMARU_CASES) {
  const caseLawyerProfiles = {
    "임재현": "assets/lawyer-im-jae-hyun.webp",
    "박상준": "assets/lawyer-park-sang-jun.webp",
    "문지영": "assets/lawyer-moon-ji-young.webp",
    "이주원": "assets/lawyer-lee-ju-won.webp"
  };
  const renderCaseLawyers = lawyers => {
    const lawyerOrder = { "박상준": 0, "임재현": 1 };
    const names = lawyers.replaceAll(" 변호사", "").split(" · ").sort((a, b) =>
      (lawyerOrder[a] ?? 2) - (lawyerOrder[b] ?? 2)
    );
    const collapsible = names.length > 2;
    return `<div class="success-case-lawyers${collapsible ? " is-collapsible" : ""}"><div class="success-case-lawyers-head"><small>담당변호사</small>${collapsible ? `<button type="button" aria-expanded="false" aria-label="담당 변호사 전체 보기"></button>` : ""}</div><div class="success-case-lawyer-list">${names.map(name => `
      <span class="success-case-lawyer"><img src="${caseLawyerProfiles[name] || caseLawyerProfiles["임재현"]}" alt="${name} 변호사" /><b>${name} 변호사</b></span>`).join("")}</div></div>`;
  };
  const orderedSuccessCases = [...window.YULMARU_CASES].sort((a, b) =>
    Number(b.lawyers.includes("박상준")) - Number(a.lawyers.includes("박상준"))
  );
  successCaseTrack.innerHTML = orderedSuccessCases.map(item => `
    <a class="success-case-card" data-case-id="${item.id}" data-case-category="${item.category}" href="case-detail.html?id=${item.id}" target="_blank" rel="noopener">
      <div class="success-case-copy"><span>${item.tag.replaceAll(" · ", " ")}</span><h3>${item.title}</h3>${renderCaseLawyers(item.lawyers)}</div>
      <div class="success-case-document"><img src="${item.image}" alt="${item.title} 판결문 자료" loading="lazy" /><strong>${item.result.replace("\n", "<br />")}</strong></div>
    </a>`).join("");
  successCaseTrack.addEventListener("click", event => {
    const toggle = event.target.closest(".success-case-lawyers-head button");
    if (!toggle) return;
    event.preventDefault();
    event.stopPropagation();
    const panel = toggle.closest(".success-case-lawyers");
    const expanded = panel.classList.toggle("is-expanded");
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.setAttribute("aria-label", expanded ? "담당 변호사 접기" : "담당 변호사 전체 보기");
  });
}
const successSection = document.querySelector("#success-cases");
const clientReviewsSection = document.querySelector("#reviews");
const youtubeSection = document.querySelector("#videos");
const issuesSection = document.querySelector("#issues");
if (successSection && youtubeSection && issuesSection) {
  youtubeSection.before(successSection);
  if (clientReviewsSection) successSection.after(clientReviewsSection);
  youtubeSection.after(issuesSection);
}
const successCaseCards = [...document.querySelectorAll(".success-case-card")];
const successCaseCount = document.querySelector("#success-case-count");

const updateSuccessCaseCount = () => {
  if (!successCaseTrack || !successCaseCount) return;
  const visibleCards = successCaseCards.filter(card => !card.hidden);
  if (!visibleCards.length) {
    successCaseCount.textContent = "0 / 0";
    return;
  }
  const trackLeft = successCaseTrack.getBoundingClientRect().left;
  const firstVisible = visibleCards.findIndex(card => card.getBoundingClientRect().right > trackLeft + 10);
  const start = Math.max(0, firstVisible);
  const cardsPerView = window.innerWidth <= 720 ? 1 : window.innerWidth <= 1100 ? 2 : 4;
  const end = Math.min(visibleCards.length, start + cardsPerView);
  successCaseCount.textContent = `${start + 1}–${end} / ${visibleCards.length}`;
};

document.querySelectorAll("[data-case-filter]").forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.caseFilter;
    document.querySelectorAll("[data-case-filter]").forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    successCaseCards.forEach(card => {
      const categories = card.dataset.caseCategory.split(" ");
      const matchesFamily = filter === "family" && categories.includes("child");
      card.hidden = filter !== "all" && !categories.includes(filter) && !matchesFamily;
    });
    successCaseTrack?.scrollTo({ left: 0, behavior: "smooth" });
    window.setTimeout(() => { updateSuccessCaseCount(); updateSuccessCaseNav(); }, 250);
  });
});

document.querySelectorAll("[data-case-scroll]").forEach(button => {
  button.addEventListener("click", () => {
    if (!successCaseTrack) return;
    const direction = button.dataset.caseScroll === "prev" ? -1 : 1;
    const limit = Math.max(0, successCaseTrack.scrollWidth - successCaseTrack.clientWidth);
    const distance = Math.max(successCaseTrack.clientWidth * .78, 260);
    successCaseTrack.scrollTo({ left: Math.min(Math.max(successCaseTrack.scrollLeft + distance * direction, 0), limit), behavior: "smooth" });
  });
});
const updateSuccessCaseNav = () => {
  if (!successCaseTrack) return;
  const limit = Math.max(0, successCaseTrack.scrollWidth - successCaseTrack.clientWidth);
  const prev = document.querySelector('[data-case-scroll="prev"]');
  const next = document.querySelector('[data-case-scroll="next"]');
  if (prev) prev.disabled = limit <= 4 || successCaseTrack.scrollLeft <= 3;
  if (next) next.disabled = limit <= 4 || successCaseTrack.scrollLeft >= limit - 3;
};
successCaseTrack?.addEventListener("scroll", updateSuccessCaseCount, { passive: true });
successCaseTrack?.addEventListener("scroll", updateSuccessCaseNav, { passive: true });
window.addEventListener("resize", () => { updateSuccessCaseCount(); updateSuccessCaseNav(); });
updateSuccessCaseCount();
requestAnimationFrame(updateSuccessCaseNav);

if (successCaseTrack) {
  let pressed = false;
  let dragged = false;
  let startX = 0;
  let lastX = 0;
  let suppressCaseClick = false;
  let momentumFrame = 0;
  let lastFrameTime = 0;
  let velocity = 0;
  let dragHistory = [];

  const stopMomentum = () => {
    if (momentumFrame) cancelAnimationFrame(momentumFrame);
    momentumFrame = 0;
    velocity = 0;
    lastFrameTime = 0;
    successCaseTrack.style.scrollBehavior = "";
    successCaseTrack.style.scrollSnapType = "";
  };

  const applyMomentum = time => {
    if (!lastFrameTime) {
      lastFrameTime = time;
      momentumFrame = requestAnimationFrame(applyMomentum);
      return;
    }
    const deltaTime = Math.min(time - lastFrameTime, 32);
    lastFrameTime = time;
    const before = successCaseTrack.scrollLeft;
    successCaseTrack.scrollLeft += velocity * deltaTime;
    velocity *= Math.pow(.95, deltaTime / 16.67);
    const hitEdge = Math.abs(successCaseTrack.scrollLeft - before) < .5;
    if (Math.abs(velocity) < .01 || hitEdge) {
      stopMomentum();
      return;
    }
    momentumFrame = requestAnimationFrame(applyMomentum);
  };

  successCaseTrack.addEventListener("pointerdown", event => {
    if (event.button !== undefined && event.button !== 0) return;
    stopMomentum();
    pressed = true;
    dragged = false;
    suppressCaseClick = false;
    startX = lastX = event.clientX;
    dragHistory = [{ x: event.clientX, time: performance.now() }];
    successCaseTrack.classList.add("is-dragging");
  });

  successCaseTrack.addEventListener("pointermove", event => {
    if (!pressed) return;
    const now = performance.now();
    const distance = event.clientX - lastX;
    const totalDistance = event.clientX - startX;
    if (!dragged && Math.abs(totalDistance) > 12) {
      dragged = true;
      successCaseTrack.setPointerCapture?.(event.pointerId);
      successCaseTrack.style.scrollBehavior = "auto";
      successCaseTrack.style.scrollSnapType = "none";
    }
    if (!dragged) {
      lastX = event.clientX;
      return;
    }
    if (event.cancelable) event.preventDefault();
    successCaseTrack.scrollLeft -= distance;
    lastX = event.clientX;
    dragHistory.push({ x: event.clientX, time: now });
    while (dragHistory.length > 1 && now - dragHistory[0].time > 80) dragHistory.shift();
  });

  ["pointerup", "pointercancel"].forEach(type => successCaseTrack.addEventListener(type, event => {
    if (!pressed) return;
    pressed = false;
    successCaseTrack.classList.remove("is-dragging");
    if (successCaseTrack.hasPointerCapture?.(event.pointerId)) successCaseTrack.releasePointerCapture?.(event.pointerId);
    if (type === "pointerup" && dragged) {
      suppressCaseClick = true;
      const now = performance.now();
      const oldest = dragHistory[0] || { x: event.clientX, time: now };
      const elapsed = Math.max(now - oldest.time, 1);
      velocity = elapsed > 4 ? -(event.clientX - oldest.x) / elapsed : 0;
      velocity = Math.max(-2.8, Math.min(2.8, velocity));
      if (Math.abs(velocity) < .12) velocity = 0;
      lastFrameTime = 0;
      if (velocity) momentumFrame = requestAnimationFrame(applyMomentum);
      else stopMomentum();
      window.setTimeout(() => { suppressCaseClick = false; }, 80);
    }
    dragged = false;
    dragHistory = [];
  }));
  successCaseTrack.addEventListener("dragstart", event => event.preventDefault());
  successCaseTrack.addEventListener("click", event => {
    if (suppressCaseClick) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
}

const clientReviews = [
  { name:"레나짱", branch:"경남 창원점", date:"2026-09-10(목)", text:"학교 관련 상담을 받고 마음이 한결 후련해졌고, 도움받을 수 있는 부분을 확인할 수 있어 좋았습니다.", photo:"", source:"https://map.naver.com/p/entry/place/2023530761?placePath=/review/visitor" },
  { name:"후니혀니55", branch:"부산 명지점", date:"2026-09-08(화)", text:"해결되지 않을 것 같아 막막했는데 상담 후 마음이 한결 가벼워졌습니다. 이야기를 잘 들어주시고 어려운 부분도 이해하기 쉽게 설명해주셨습니다.", photo:"", source:"https://map.naver.com/p/entry/place/1189809417?placePath=/review/visitor" },
  { name:"맛있으면과식하는소식좌", branch:"부산 센텀점", date:"2026-09-04(금)", text:"감정이 앞서 두서없이 이야기했는데도 끝까지 차분히 들어주셔서 마음이 안정됐습니다. 어린아이와 함께 방문했는데 상담 공간도 편안했고 현실적인 조언이 큰 도움이 됐습니다.", photo:"https://pup-review-phinf.pstatic.net/MjAyNjA3MDJfMjk4/MDAxNzgyOTc4MDAyNDEz.0N5p-JKOGDN78eWp3qlQ42X01gkM6YmlsCyONCB6uxIg.RyyN6CBuLLbpWx3a0dIeg-P1DRyYwign9-ng1kCIAK8g.JPEG/E0C2D15D-B15D-46E2-B8A7-787F9979845E.jpeg?type=w278_sharpen", source:"https://map.naver.com/p/entry/place/1142946859?placePath=/review/visitor" },
  { name:"jha****", branch:"부산 명지점", date:"2026-08-28(금)", text:"이혼을 어디서부터 준비해야 할지 막연했는데 상담 후 답답했던 마음과 생각이 정리됐습니다. 편안하게 상담받았습니다.", photo:"", source:"https://map.naver.com/p/entry/place/1189809417?placePath=/review/visitor" },
  { name:"Hull22", branch:"경남 창원점", date:"2026-08-04(화)", text:"전문가의 도움이 절실했던 상황에서 여러 방향과 가능한 방법을 차분히 안내받았습니다. 제 일처럼 함께 고민해주는 든든한 지원군이 생긴 느낌이었습니다.", photo:"https://pup-review-phinf.pstatic.net/MjAyNjA0MDNfMTkg/MDAxNzc1MTgyMzE2NTcw.ikgZGA6RG8qkL6s1gtL7q1oItRAkMxLV3dh4OWNfCZsg.VqsLlHmbSdUfoY3NOL1sBW6Rh_PG15IH1iFnKlaYjlQg.JPEG/20260403_111054.heic.jpg?type=w278_sharpen", source:"https://map.naver.com/p/entry/place/2023530761?placePath=/review/visitor" },
  { name:"엘비라26", branch:"부산 센텀점", date:"2026-07-24(금)", text:"가족 문제로 처음 법률상담을 받았습니다. 객관적으로 설명해주시고 궁금한 질문에도 친절하게 답해주셔서 많은 도움이 됐습니다.", photo:"https://pup-review-phinf.pstatic.net/MjAyNjA1MjZfMTg5/MDAxNzc5NzcyODQwNjE1.EqBBUFuooAI6FEDp75G5wwH9gfoUDGtI8YJdOoPa3NYg.eCrbhy6PkpKepqMgwkWKbwVb3_tDRM8PbGzheLs7WWgg.JPEG/20260526_130847.jpg?type=w278_sharpen", source:"https://map.naver.com/p/entry/place/1142946859?placePath=/review/visitor" },
  { name:"su3****", branch:"부산 서면점", date:"2026-06-11(목)", text:"복잡하고 힘든 상황에서 미처 생각하지 못했던 부분까지 친절하게 설명하고 방법을 제시해주셔서 감사했습니다.", photo:"https://pup-review-phinf.pstatic.net/MjAyNjA0MjFfOTQg/MDAxNzc2NzM4OTgyMDUx.Y-38HmhYkh5lM-vrBwQGtrsIKw9V7jhIfnKCJNVOevAg.gClvdOlcrt9OgLW3lkNKAcHsixiZVOdRm_-VGoIMA8kg.JPEG/3E889132-5B71-47D9-96A2-3B4B37A02B4C.jpeg?type=w278_sharpen", source:"https://map.naver.com/p/entry/place/1381643972?placePath=/review/visitor" },
  { name:"으랏차차 형제맘", branch:"부산 서면점", date:"2026-05-29(금)", text:"걱정이 많았는데 상황을 일목요연하고 명쾌하게 설명해주셔서 감사했습니다.", photo:"", source:"https://map.naver.com/p/entry/place/1381643972?placePath=/review/visitor" }
].sort((a, b) => b.date.localeCompare(a.date));
const clientReviewTotal = 702;

const clientReviewFeature = document.querySelector("#client-review-feature");
const clientReviewList = document.querySelector("#client-review-list");
const clientReviewPosition = document.querySelector("#client-review-position");
if (clientReviewFeature && clientReviewList && clientReviewPosition) {
  const renderClientReview = index => {
    const review = clientReviews[index];
    const visual = review.photo ? `<div class="client-review-photo"><img src="${review.photo}" alt="${review.branch} 네이버 방문자 리뷰 첨부 사진" loading="lazy" referrerpolicy="no-referrer" /></div>` : "";
    clientReviewFeature.innerHTML = `<div class="client-review-feature-copy"><div class="client-review-feature-meta"><b>${review.name}</b><span class="client-review-stars" aria-label="별점 5점">★★★★★</span></div><blockquote>“${review.text}”</blockquote>${visual}<footer><span>${review.branch} · ${review.date}</span><a href="${review.source}" target="_blank" rel="noopener noreferrer">원문 출처 보기 ↗</a></footer></div>`;
    clientReviewPosition.textContent = `${String(index + 1).padStart(3,"0")} / ${String(clientReviewTotal).padStart(3,"0")}`;
    clientReviewList.querySelectorAll(".client-review-item").forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  };
  clientReviewList.innerHTML = clientReviews.map((review, index) => `<button class="client-review-item${index === 0 ? " active" : ""}" type="button" role="listitem" aria-pressed="${index === 0}"><span class="client-review-avatar" aria-hidden="true">${review.name.slice(0,1)}</span><span><strong>${review.name} · ${review.branch}</strong><p>${review.text}</p></span><small>${review.photo ? "사진 후기" : "방문 후기"}</small></button>`).join("");
  clientReviewList.querySelectorAll(".client-review-item").forEach((button, index) => button.addEventListener("click", () => renderClientReview(index)));
  renderClientReview(0);
}

const officeGallery = document.querySelector(".office-gallery");
if (officeGallery) {
  const officePhotos = [
    ["assets/office-01.jpg", "WELCOME DESK", "편안한 상담을 시작하는 공간", "법무법인 율마루 안내 데스크"],
    ["assets/office-02.jpg", "RECEPTION", "차분하게 맞이하는 안내 공간", "법무법인 율마루 리셉션과 복도"],
    ["assets/office-03.jpg", "YULMARU OFFICE", "신뢰를 마주하는 첫 공간", "율마루 로고가 보이는 안내 데스크"],
    ["assets/office-04.jpg", "CONSULTING LOUNGE", "도시를 바라보며 생각을 정리하는 곳", "전망이 보이는 사무실 상담 라운지"],
    ["assets/office-05.jpg", "OPEN LOUNGE", "밝고 편안하게 열린 상담 환경", "전망과 소파가 있는 사무실 라운지"],
    ["assets/office-06.jpg", "PRIVATE ROOM", "이야기에 온전히 집중하는 공간", "창가에 마련된 독립 상담 공간"],
    ["assets/office-07.jpg", "WELCOME DESK", "따뜻한 인상으로 시작되는 상담", "우드 벽면의 율마루 안내 데스크"],
    ["assets/office-08.jpg", "CLIENT LOUNGE", "상담 전 편안히 머무는 공간", "수상 내역이 전시된 고객 라운지"],
    ["assets/office-09.jpg", "WAITING LOUNGE", "차분한 기다림을 위한 공간", "소파와 전시장이 있는 대기 공간"],
    ["assets/office-10.jpg", "OFFICE LOUNGE", "안정감을 담은 넓고 밝은 공간", "유리벽 너머로 보이는 사무실 라운지"],
    ["assets/office-11.jpg", "CONFERENCE ROOM", "함께 해법을 찾는 회의 공간", "대형 테이블이 있는 사무실 회의실"],
    ["assets/office-12.jpg", "YULMARU RECORDS", "축적된 경험과 전문성이 보이는 곳", "자격 및 수상 내역 전시 공간"],
    ["assets/office-13.jpg", "MEETING ROOM", "사건을 깊이 검토하는 공간", "전시장과 회의 테이블이 있는 회의실"],
    ["assets/office-14.jpg", "OFFICE HALL", "각 공간을 조용히 잇는 동선", "전시장과 복도로 이어진 사무실 내부"],
    ["assets/office-15.jpg", "PRIVATE LOUNGE", "긴장을 덜어주는 편안한 공간", "소파와 조명이 놓인 상담 라운지"],
    ["assets/office-16.jpg", "YULMARU IDENTITY", "율마루의 이름으로 마주하는 신뢰", "벽면에 설치된 법무법인 율마루 로고"],
    ["assets/office-17.jpg", "RECEPTION DESK", "방문객을 정중하게 맞이하는 곳", "율마루 로고가 보이는 정면 안내 데스크"],
    ["assets/office-18.jpg", "OFFICE VIEW", "상담 공간으로 이어지는 차분한 내부", "안내 데스크와 복도가 보이는 사무실" ]
  ];
  const track = officeGallery.querySelector("#office-gallery-track");
  const background = officeGallery.querySelector("#office-gallery-bg");
  const officeLayout = [
    [4,1],[5,1],
    [3,2],[4,2],[5,2],[6,2],
    [2,3],[3,3],[4,3],[5,3],[6,3],
    [2,4],[3,4],[4,4],[5,4],[6,4],[7,4],
    [3,5],[4,5],[5,5],[6,5],
    [4,6],[5,6],
    [4,7],[5,7],[6,7],
    [3,8],[4,8],[5,8],[6,8],
    [2,9],[3,9],[4,9],[5,9],[6,9],
    [3,10],[4,10],[5,10],
    [1,11],[4,11]
  ];
  track.innerHTML = officeLayout.map(([column, row], tileIndex) => {
    const photoIndex = tileIndex % officePhotos.length;
    const [src, label, caption, alt] = officePhotos[photoIndex];
    return `<button class="office-gallery-item${tileIndex === 0 ? " active" : ""}" type="button" data-office-index="${photoIndex}" style="grid-column:${column};grid-row:${row}" aria-label="${alt}" aria-pressed="${tileIndex === 0}">
      <img src="${src}" alt="${alt}" loading="${tileIndex < 8 ? "eager" : "lazy"}" />
      <span><small>${label}</small><strong>${caption}</strong></span>
    </button>`;
  }).join("");
  const officeItems = [...track.querySelectorAll(".office-gallery-item")];
  let officeIndex = 0;
  let officeChangeTimer = 0;
  const showOfficePhoto = (nextIndex, selectedItem) => {
    officeIndex = (nextIndex + officePhotos.length) % officePhotos.length;
    const [src] = officePhotos[officeIndex];
    officeItems.forEach(item => {
      const active = item === selectedItem;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    officeGallery.classList.add("is-changing");
    window.clearTimeout(officeChangeTimer);
    officeChangeTimer = window.setTimeout(() => {
      background.src = src;
      officeGallery.classList.remove("is-changing");
    }, 180);
  };
  officeItems.forEach(item => item.addEventListener("click", () => showOfficePhoto(Number(item.dataset.officeIndex), item)));
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
