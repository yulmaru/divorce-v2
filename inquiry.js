const inquiry = document.querySelector("#hero-inquiry");
const inquiryCount = document.querySelector("#hero-inquiry-count");
const inquiryError = document.querySelector("#hero-inquiry-error");
const nextButton = document.querySelector("#hero-consult-next");
const modal = document.querySelector("#consult-modal");
const detailsForm = document.querySelector("#consult-details-form");
const status = document.querySelector("#consult-submit-status");
const consultLawyerCards = document.querySelectorAll("[data-consult-lawyer]");

consultLawyerCards.forEach(card => card.addEventListener("click", () => {
  const shouldDeselect = card.classList.contains("active");
  consultLawyerCards.forEach(item => {
    const selected = !shouldDeselect && item === card;
    item.classList.toggle("active", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
  detailsForm.elements.lawyer.value = shouldDeselect ? "" : card.dataset.consultLawyer;
}));

function phoneDigits(value) { return String(value || "").replace(/\D/g, "").slice(0, 11); }
function formatPhone(value) {
  const digits = phoneDigits(value);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}
function updateCount() {
  inquiryCount.textContent = `${inquiry.value.length.toLocaleString("ko-KR")} / 1,000`;
  if (inquiry.value.trim()) inquiryError.hidden = true;
}
function closeModal() {
  modal.classList.remove("open");
  document.body.classList.remove("consult-modal-open");
  window.setTimeout(() => { modal.hidden = true; status.textContent = ""; }, 240);
}

inquiry.addEventListener("input", updateCount);
nextButton.addEventListener("click", () => {
  if (!inquiry.value.trim()) { inquiryError.hidden = false; inquiry.focus(); return; }
  modal.hidden = false;
  document.body.classList.add("consult-modal-open");
  requestAnimationFrame(() => { modal.classList.add("open"); detailsForm.elements.name.focus(); });
});
modal.querySelectorAll("[data-consult-close]").forEach(element => element.addEventListener("click", closeModal));
document.addEventListener("keydown", event => { if (event.key === "Escape" && !modal.hidden) closeModal(); });

detailsForm.elements.phone.addEventListener("input", event => {
  event.currentTarget.value = formatPhone(event.currentTarget.value);
  event.currentTarget.setCustomValidity("");
});
detailsForm.addEventListener("submit", async event => {
  event.preventDefault();
  if (!detailsForm.reportValidity() || detailsForm.elements.website.value) return;
  const phone = phoneDigits(detailsForm.elements.phone.value);
  if (!/^010\d{8}$/.test(phone)) {
    detailsForm.elements.phone.setCustomValidity("연락처를 정확히 입력해 주세요.");
    detailsForm.reportValidity();
    return;
  }
  const button = detailsForm.querySelector(".consult-submit");
  const ua = navigator.userAgent || "";
  const payload = { source: "문의 하기", name: detailsForm.elements.name.value.trim(), phone, caseType: "이혼 상담", lawyer: detailsForm.elements.lawyer.value, debt: "", message: inquiry.value.trim(), consent: true, createdAt: new Date().toISOString(), pageUrl: location.href, deviceType: /iPad|Tablet/i.test(ua) ? "태블릿" : /Mobi|Android|iPhone|iPod/i.test(ua) ? "모바일" : "PC", attachments: [] };
  button.disabled = true;
  button.firstChild.textContent = "전송 중... ";
  status.textContent = "";
  try {
    await fetch(detailsForm.dataset.endpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }, body: new URLSearchParams({ payload: JSON.stringify(payload) }).toString() });
    status.textContent = "상담 신청이 접수되었습니다. 확인 후 연락드리겠습니다.";
    detailsForm.reset(); inquiry.value = ""; updateCount();
  } catch (error) {
    console.error("Consultation submission failed", error);
    status.textContent = "전송하지 못했습니다. 잠시 후 다시 시도하거나 1800-6419로 연락해 주세요.";
    status.classList.add("error");
  } finally {
    button.disabled = false;
    button.firstChild.textContent = "상담 신청 완료 ";
  }
});

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-header nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
