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
  age0_2: { index: 0, label: "0 ~ 2세" }, age3_5: { index: 1, label: "3 ~ 5세" }, age6_8: { index: 2, label: "6 ~ 8세" },
  age9_11: { index: 3, label: "9 ~ 11세" }, age12_14: { index: 4, label: "12 ~ 14세" }, age15_18: { index: 5, label: "15 ~ 18세" }
};

const supportCalcForm = document.querySelector("#support-calc-form");
const supportCalcError = document.querySelector("#support-calc-error");
const supportResult = document.querySelector("#support-result");
const supportWonFormatter = new Intl.NumberFormat("ko-KR");
const supportPercentFormatter = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 });
const roundToThousand = amount => Math.round(amount / 1000) * 1000;

supportCalcForm.addEventListener("submit", event => {
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

const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".site-header nav");

menuButton.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
