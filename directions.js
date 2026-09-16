const offices = {
  seocho: {
    name: "서울 서초점",
    address: "서울 서초구 서초중앙로 156, 2층 (블루원빌딩)",
    query: "서울 서초구 서초중앙로 156",
    lat: 37.4956331,
    lng: 127.0135384,
    naver: "https://naver.me/GM3faNeL"
  },
  myeongji: {
    name: "부산 명지점",
    address: "부산 강서구 명지국제2로 80, 2층 53-55호 (명지동, e편한세상명지)",
    query: "부산 강서구 명지국제2로 80, 2층 53-55호 (명지동, e편한세상명지)",
    lat: 35.0985915,
    lng: 128.9093061,
    naver: "https://naver.me/GsjRGwz8"
  },
  centum: {
    name: "부산 센텀점",
    address: "부산 해운대구 센텀중앙로 97, A동 3004호 (재송동, 센텀스카이비즈)",
    query: "부산 해운대구 센텀중앙로 97",
    lat: 35.1751167,
    lng: 129.1245269,
    naver: "https://naver.me/G7VABruD"
  },
  seomyeon: {
    name: "부산 서면점",
    address: "부산 부산진구 중앙대로 754, 8층 (부전동, 주간인물사빌딩)",
    query: "부산 부산진구 중앙대로 754",
    lat: 35.1595417,
    lng: 129.0608848,
    naver: "https://naver.me/FtTEb94J"
  },
  changwon: {
    name: "경남 창원점",
    address: "경남 창원시 성산구 창이대로689번길 4-16, 6층 (사파동, 법조빌딩)",
    query: "경남 창원시 성산구 창이대로689번길 4-16",
    lat: 35.2226209,
    lng: 128.7009634,
    naver: "https://naver.me/GlGVcayP"
  }
};

const mapFrame = document.querySelector("#directions-map");
const officeName = document.querySelector("#directions-office-name");
const officeAddress = document.querySelector("#directions-office-address");
const mapLink = document.querySelector("#directions-map-link");
const officeButtons = document.querySelectorAll("[data-office]");
let selectedOffice = "seocho";
let naverMap = null;
let naverMarker = null;

function renderOfficeMap(office) {
  if (!window.naver?.maps) {
    const fallback = document.createElement("a");
    fallback.href = office.naver;
    fallback.target = "_blank";
    fallback.rel = "noopener noreferrer";
    fallback.textContent = `${office.name} 네이버 지도 크게 보기`;
    fallback.style.cssText = "display:grid;width:100%;height:100%;place-items:center;color:#0b2453;font-weight:800;text-align:center;background:#dce8fa;";
    mapFrame.replaceChildren(fallback);
    return;
  }

  const position = new naver.maps.LatLng(office.lat, office.lng);

  if (!naverMap) {
    mapFrame.replaceChildren();
    naverMap = new naver.maps.Map(mapFrame, {
      center: position,
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT
      }
    });
    naverMarker = new naver.maps.Marker({
      position,
      map: naverMap,
      title: `법무법인 율마루 ${office.name}`
    });
    return;
  }

  naverMap.setCenter(position);
  naverMarker.setPosition(position);
  naverMarker.setTitle(`법무법인 율마루 ${office.name}`);
}

function selectOffice(key) {
  const office = offices[key];
  if (!office) return;

  selectedOffice = key;
  renderOfficeMap(office);
  mapFrame.setAttribute("aria-label", `법무법인 율마루 ${office.name} 지도`);
  officeName.textContent = office.name;
  officeAddress.textContent = office.address;
  mapLink.href = office.naver;

  officeButtons.forEach(button => {
    const selected = button.dataset.office === key;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

officeButtons.forEach(button => {
  button.addEventListener("click", () => selectOffice(button.dataset.office));
});

const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".site-header nav");

menuButton.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

selectOffice("seocho");
