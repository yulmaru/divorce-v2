const offices = {
  seocho: {
    name: "서울 서초점",
    address: "서울 서초구 서초중앙로 156, 2층 (블루원빌딩)",
    lat: 37.4956331,
    lng: 127.0135384,
    naver: "https://naver.me/GM3faNeL"
  },
  myeongji: {
    name: "부산 명지점",
    address: "부산 강서구 명지국제2로 80, 2층 53-55호 (명지동, e편한세상명지)",
    lat: 35.0985915,
    lng: 128.9093061,
    naver: "https://naver.me/GsjRGwz8"
  },
  centum: {
    name: "부산 센텀점",
    address: "부산 해운대구 센텀중앙로 97, A동 3004호 (재송동, 센텀스카이비즈)",
    lat: 35.1751167,
    lng: 129.1245269,
    naver: "https://naver.me/G7VABruD"
  },
  seomyeon: {
    name: "부산 서면점",
    address: "부산 부산진구 중앙대로 754, 8층 (부전동, 주간인물사빌딩)",
    lat: 35.1595417,
    lng: 129.0608848,
    naver: "https://naver.me/FtTEb94J"
  },
  changwon: {
    name: "경남 창원점",
    address: "경남 창원시 성산구 창이대로689번길 4-16, 6층 (사파동, 법조빌딩)",
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
const naverMapClientId = "xj39aabqzb";
let map = null;
let marker = null;
let selectedOffice = "seocho";

function loadNaverMaps() {
  return new Promise((resolve, reject) => {
    if (window.naver?.maps) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(naverMapClientId)}`;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function initializeMap() {
  const office = offices[selectedOffice];
  const position = new naver.maps.LatLng(office.lat, office.lng);
  mapFrame.replaceChildren();
  map = new naver.maps.Map(mapFrame, {
    center: position,
    zoom: 16,
    zoomControl: true,
    zoomControlOptions: { position: naver.maps.Position.TOP_RIGHT },
    mapDataControl: false,
    scaleControl: false,
    logoControl: false,
    scrollWheel: false
  });
  marker = new naver.maps.Marker({ position, map });

  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(() => {
      if (typeof map.autoResize === "function") map.autoResize();
    }).observe(mapFrame);
  }
}

function selectOffice(key) {
  const office = offices[key];
  if (!office) return;

  selectedOffice = key;
  if (map && marker) {
    const position = new naver.maps.LatLng(office.lat, office.lng);
    map.setCenter(position);
    map.setZoom(16);
    marker.setPosition(position);
  }
  mapFrame.setAttribute("aria-label", `법무법인 율마루 ${office.name} 네이버 지도`);
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
loadNaverMaps()
  .then(initializeMap)
  .catch(() => {
    mapFrame.textContent = "네이버 지도를 불러오지 못했습니다.";
  });
