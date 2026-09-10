const lawyers = {
  im: {
    name: "임재현",
    nameEn: "LIM JAE HYUN",
    role: "대표변호사",
    image: "assets/lawyer-cutout-im.png",
    quote: "“사건 초기에 쟁점과 증거를 정리해 형사 절차의 방향을 세웁니다.”",
    summary: "경찰·검찰 조사, 체포·구속과 영장 단계, 형사재판까지 현재 상황을 면밀히 확인하고 의뢰인에게 필요한 대응을 함께 준비합니다.",
    practice: ["경찰·검찰 피의자 조사", "고소·고발 및 피해자 조력", "체포·구속·영장 대응", "형사공판 및 항소심"],
    education: ["부산국제고등학교 졸업", "성균관대학교 법과대학 법학학사", "부산대학교 법학전문대학원 법학전문석사"],
    career: ["사법연수원 실무연수 수료", "전 법률사무소 동률", "전 법무법인 김앤파트너스", "국토교통부 항공정책실 행정처분심의위원회 심의위원", "창원중부경찰서 민원상담위원", "대법원 및 부산지방법원 서부지원 국선변호사", "대한변호사협회 도산 전문변호사"]
  },
  park: {
    name: "박상준",
    nameEn: "PARK SANG JUN",
    role: "대표변호사",
    image: "assets/lawyer-cutout-park.png",
    quote: "“첫 진술부터 재판까지 사건의 흐름을 놓치지 않고 대응합니다.”",
    summary: "수사기관의 질문과 확보된 자료를 검토해 진술 방향을 정리하고, 구속 가능성과 공판 절차를 고려한 단계별 대응 전략을 준비합니다.",
    practice: ["경찰 조사 및 진술 준비", "성범죄·폭력범죄 대응", "재산범죄·경제범죄 대응", "형사재판 변론"],
    education: ["김해가야고등학교 졸업", "부산교육대학교 초등교육학 학사", "부산대학교 법학전문대학원 법학전문석사"],
    career: ["서울시 초등교원임용경쟁시험 합격", "전 서울전농초등학교 교사", "사법연수원 실무연수 수료", "전 법무법인 김앤파트너스", "부산대학교 리걸클리닉 지도변호사", "대법원 및 부산지방법원 서부지원 국선변호사", "대한변호사협회 형사법 전문변호사"]
  },
  moon: {
    name: "문지영",
    nameEn: "MOON JI YEONG",
    role: "파트너변호사",
    image: "assets/lawyer-cutout-moon.png",
    quote: "“피해자와 피의자 모두의 입장에서 형사 절차를 세심하게 살핍니다.”",
    summary: "사건의 경위와 당사자의 입장을 충분히 듣고, 진술과 객관적 자료를 함께 검토해 수사 및 재판 단계에서 필요한 대응을 준비합니다.",
    practice: ["고소·고발 및 피해자 조력", "성범죄 사건 대응", "가정·학교 관련 형사 사건", "형사공판 및 국선변론"],
    education: ["부산대학교 법학과 학사", "부산대학교 법학전문대학원 법학전문석사"],
    career: ["부산지방법원 실무수습", "법무법인 (유한)정인 실무수습", "전 법무법인 더킴로펌", "부산지방노동위원회 공익위원", "부산광역시교육청 폭력·비행 근절 및 예방 법교육 변호사", "대법원 및 부산지방법원 서부지원 국선변호사", "대한변호사협회 형사법 전문변호사"]
  },
  lee: {
    name: "이주원",
    nameEn: "LEE JU WON",
    role: "변호사",
    image: "assets/lawyer-cutout-lee.png",
    quote: "“사건의 쟁점과 증거를 빠르게 파악해 필요한 대응을 준비합니다.”",
    summary: "수사 기록과 사실관계를 꼼꼼히 확인하고, 의뢰인이 이해하기 쉬운 방식으로 현재 절차와 향후 대응 방향을 설명합니다.",
    practice: ["수사기록 및 증거 검토", "경찰·검찰 조사 대응", "교통·재산범죄 대응", "형사재판 서면 및 변론"],
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

selectLawyer("im");
