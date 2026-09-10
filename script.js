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
    lawyerConsultStatus.textContent = "전송 중입니다.";
    lawyerConsultStatus.classList.remove("error");

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
      lawyerConsultForm.reset();
      lawyerConsultForm.elements.lawyer.value = lawyerName;
    } catch (error) {
      console.error("Lawyer consultation submission failed", error);
      lawyerConsultStatus.textContent = "전송하지 못했습니다. 잠시 후 다시 시도해 주세요.";
      lawyerConsultStatus.classList.add("error");
    } finally {
      submitButton.disabled = false;
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
    finalDbStatus.textContent = "전송 중입니다.";
    finalDbStatus.classList.remove("error");

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
      finalDbForm.reset();
      caseTypeButtons[0]?.click();
    } catch (error) {
      console.error("Final consultation submission failed", error);
      finalDbStatus.textContent = "전송하지 못했습니다. 잠시 후 다시 시도해 주세요.";
      finalDbStatus.classList.add("error");
    } finally {
      submitButton.disabled = false;
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

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
