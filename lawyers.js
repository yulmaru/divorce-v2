const lawyers = {
  im: {
    name: "임재현",
    nameEn: "LIM JAE HYUN",
    role: "대표변호사",
    image: "assets/lawyer-cutout-im.png",
    quote: "“복잡한 사실관계를 차분히 정리해 이혼 절차의 방향을 세웁니다.”",
    summary: "협의 가능성과 재판상 이혼 사유, 재산분할과 위자료 쟁점을 함께 살펴 현재 상황에 맞는 단계별 대응을 준비합니다.",
    practice: ["협의이혼 및 조정 절차", "재판상 이혼 사유 검토", "상간소송 및 위자료", "재산분할 쟁점 정리"],
    education: ["부산국제고등학교 졸업", "성균관대학교 법과대학 법학학사", "부산대학교 법학전문대학원 법학전문석사"],
    career: ["사법연수원 실무연수 수료", "전 법률사무소 동률", "전 법무법인 김앤파트너스", "국토교통부 항공정책실 행정처분심의위원회 심의위원", "대한변호사협회 도산 전문변호사"]
  },
  park: {
    name: "박상준",
    nameEn: "PARK SANG JUN",
    role: "대표변호사",
    image: "assets/lawyer-cutout-park.png",
    quote: "“첫 상담부터 이혼 절차가 마무리될 때까지 사건의 흐름을 놓치지 않고 대응합니다.”",
    summary: "혼인 관계와 재산 형성 과정, 자녀의 양육 상황을 면밀히 살펴 협의·조정·재판 단계에 필요한 대응을 함께 준비합니다.",
    practice: ["재산분할 및 기여도 검토", "조정이혼 및 재판상 이혼", "상간소송 및 위자료", "상속·유류분 관련 분쟁"],
    education: ["김해가야고등학교 졸업", "부산교육대학교 초등교육학 학사", "부산대학교 법학전문대학원 법학전문석사"],
    career: ["서울시 초등교원임용경쟁시험 합격", "전 서울전농초등학교 교사", "사법연수원 실무연수 수료", "전 법무법인 김앤파트너스", "부산대학교 리걸클리닉 지도변호사"]
  },
  moon: {
    name: "문지영",
    nameEn: "MOON JI YEONG",
    role: "파트너변호사",
    image: "assets/lawyer-cutout-moon.png",
    quote: "“자녀의 안정과 의뢰인의 새로운 시작을 함께 살피며 대응합니다.”",
    summary: "현재 양육 상황과 자녀의 생활환경, 부모의 양육계획을 세심하게 확인해 친권·양육권·양육비 쟁점을 준비합니다.",
    practice: ["친권자 및 양육자 지정", "양육비 청구와 변경", "면접교섭 협의 및 조정", "가정폭력 관련 보호조치"],
    education: ["부산대학교 법학과 학사", "부산대학교 법학전문대학원 법학전문석사"],
    career: ["부산지방법원 실무수습", "법무법인 (유한)정인 실무수습", "전 법무법인 더킴로펌", "부산지방노동위원회 공익위원"]
  },
  lee: {
    name: "이주원",
    nameEn: "LEE JU WON",
    role: "변호사",
    image: "assets/lawyer-cutout-lee.png",
    quote: "“이혼 과정의 핵심 쟁점과 자료를 빠르게 파악해 필요한 대응을 준비합니다.”",
    summary: "혼인 파탄의 경위와 재산·양육 관련 사실관계를 꼼꼼히 확인하고, 현재 절차와 향후 대응 방향을 이해하기 쉽게 설명합니다.",
    practice: ["협의이혼 절차 안내", "재판상 이혼 청구", "재산분할 자료 검토", "접근금지 및 사전처분"],
    education: ["동아대학교 석당인재학부 공공정책학 학사", "동아대학교 법학전문대학원 법학전문석사"],
    career: ["사법연수원 주관 대전지방법원 실무수습", "동아대학교 법학전문대학원 우수졸업자(제14회)", "법무법인 율마루 변호사"]
  }
};

const profileImage = document.querySelector("#profile-image");
const profileName = document.querySelector("#profile-name");
const profileNameEn = document.querySelector("#profile-name-en");
const profileRole = document.querySelector("#profile-role");
const profileQuote = document.querySelector("#profile-quote");
const profileSummary = document.querySelector("#profile-summary");
const profilePractice = document.querySelector("#profile-practice");
const profileEducation = document.querySelector("#profile-education");
const profileCareer = document.querySelector("#profile-career");
const lawyerCards = document.querySelectorAll("[data-lawyer]");

function fillList(element, items) {
  element.replaceChildren(...items.map(item => {
    const entry = document.createElement("li");
    entry.textContent = item;
    return entry;
  }));
}

function selectLawyer(key) {
  const lawyer = lawyers[key];
  if (!lawyer) return;

  profileImage.src = lawyer.image;
  profileImage.alt = `${lawyer.name} ${lawyer.role}`;
  profileName.textContent = lawyer.name;
  profileNameEn.textContent = lawyer.nameEn;
  profileRole.textContent = lawyer.role;
  profileQuote.textContent = lawyer.quote;
  profileSummary.textContent = lawyer.summary;
  fillList(profilePractice, lawyer.practice);
  fillList(profileEducation, lawyer.education);
  fillList(profileCareer, lawyer.career);

  lawyerCards.forEach(card => {
    const selected = card.dataset.lawyer === key;
    card.classList.toggle("active", selected);
    card.setAttribute("aria-pressed", String(selected));
  });
}

lawyerCards.forEach(card => card.addEventListener("click", () => selectLawyer(card.dataset.lawyer)));

const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".site-header nav");

menuButton?.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

selectLawyer("park");
