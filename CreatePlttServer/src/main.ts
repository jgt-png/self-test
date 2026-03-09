import "./style.css";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui.css";
import { startPage } from "./pageStart";
import { consentPage } from "./pageConsent";
import { step2Page } from "./pageStep2";
import { step3Page } from "./pageStep3";
import { step4Page } from "./pageStep4";
import { step5Page } from "./pageStep5";

declare global {
  interface Window {
    kakao?: {
      Postcode?: new (options: {
        oncomplete: (data: {
          address?: string;
          roadAddress?: string;
          zonecode?: string;
        }) => void;
      }) => { open: () => void };
    };
  }
}

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("#app not found");
}

app.innerHTML = `
  <main class="page">
    <header class="topbar">
      <div class="brand">
        <img
          class="brand-logo"
          src="https://cdn.imweb.me/thumbnail/20260225/77f992034fe2e.png"
          alt="닥터팔레트"
        />
        <div>
          <p class="brand-eyebrow">병원 설정 마법사</p>
          <h1>운영 정보를 입력해 초기 환경을 구성합니다.</h1>
        </div>
      </div>
    </header>

    ${startPage}
    ${consentPage}
    ${step2Page}
    ${step3Page}
    ${step4Page}
    ${step5Page}
  </main>
`;

const startButton = document.querySelector<HTMLButtonElement>("#startWizard");
const backButton = document.querySelector<HTMLButtonElement>("#backToStart");
const consentAgree = document.querySelector<HTMLInputElement>("#consentAgree");
const nextStep = document.querySelector<HTMLButtonElement>("#nextStep");
const backToConsent = document.querySelector<HTMLButtonElement>("#backToConsent");
const heroStart = document.querySelector<HTMLElement>("#heroStart");
const wizardPreview = document.querySelector<HTMLElement>("#wizardPreview");
const wizardForm = document.querySelector<HTMLElement>("#wizardForm");
const wizardStep2 = document.querySelector<HTMLElement>("#wizardStep2");
const wizardStep3 = document.querySelector<HTMLElement>("#wizardStep3");
const wizardStep4 = document.querySelector<HTMLElement>("#wizardStep4");
const wizardStep5 = document.querySelector<HTMLElement>("#wizardStep5");
const directorName = document.querySelector<HTMLInputElement>("#directorName");
const directorBirth = document.querySelector<HTMLInputElement>("#directorBirth");
const nextStep2 = document.querySelector<HTMLButtonElement>("#nextStep2");
const backToStep2 = document.querySelector<HTMLButtonElement>("#backToStep2");
const hospitalName = document.querySelector<HTMLInputElement>("#hospitalName");
const hospitalNameEn = document.querySelector<HTMLInputElement>("#hospitalNameEn");
const hospitalAddress = document.querySelector<HTMLInputElement>("#hospitalAddress");
const hospitalAddressDetail =
  document.querySelector<HTMLInputElement>("#hospitalAddressDetail");
const hospitalAddressSearch =
  document.querySelector<HTMLButtonElement>("#hospitalAddressSearch");
const nextStep3 = document.querySelector<HTMLButtonElement>("#nextStep3");
const backToStep3 = document.querySelector<HTMLButtonElement>("#backToStep3");
const nextStep4 = document.querySelector<HTMLButtonElement>("#nextStep4");
const departmentCode = document.querySelector<HTMLSelectElement>("#departmentCode");
const backToStep4 = document.querySelector<HTMLButtonElement>("#backToStep4");
const nextStep5 = document.querySelector<HTMLButtonElement>("#nextStep5");
const staffTableBody =
  document.querySelector<HTMLTableSectionElement>("#staffTableBody");
const addStaffRow = document.querySelector<HTMLButtonElement>("#addStaffRow");

if (
  !startButton ||
  !backButton ||
  !consentAgree ||
  !nextStep ||
  !backToConsent ||
  !heroStart ||
  !wizardPreview ||
  !wizardForm ||
  !wizardStep2 ||
  !wizardStep3 ||
  !wizardStep4 ||
  !wizardStep5 ||
  !directorName ||
  !directorBirth ||
  !nextStep2 ||
  !backToStep2 ||
  !hospitalName ||
  !hospitalNameEn ||
  !hospitalAddress ||
  !hospitalAddressDetail ||
  !hospitalAddressSearch ||
  !nextStep3 ||
  !backToStep3 ||
  !nextStep4 ||
  !departmentCode ||
  !backToStep4 ||
  !nextStep5 ||
  !staffTableBody ||
  !addStaffRow
) {
  throw new Error("wizard elements not found");
}

const showOnlyStep = (step: HTMLElement) => {
  heroStart.classList.add("hidden");
  wizardPreview.classList.add("hidden");
  wizardForm.classList.add("hidden");
  wizardStep2.classList.add("hidden");
  wizardStep3.classList.add("hidden");
  wizardStep4.classList.add("hidden");
  step.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const initDatepicker = () => {
  const datepicker = ($ as any).datepicker;
  if (!datepicker) return;
  datepicker.regional = datepicker.regional || {};
  datepicker.regional.ko = {
    closeText: "닫기",
    prevText: "이전달",
    nextText: "다음달",
    currentText: "오늘",
    monthNames: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    monthNamesShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    weekHeader: "주",
    dateFormat: "yy-mm-dd",
    firstDay: 0,
    isRTL: false,
    showMonthAfterYear: true,
    yearSuffix: "년",
  };
  datepicker.setDefaults(datepicker.regional.ko);

  $(directorBirth).datepicker({
    dateFormat: "yy-mm-dd",
    changeMonth: true,
    changeYear: true,
    yearRange: `1900:${new Date().getFullYear()}`,
    onSelect: () => validateDirectorStep(),
  });
};

const loadDatepicker = async () => {
  (window as any).$ = $;
  (window as any).jQuery = $;
  await import("jquery-ui-dist/jquery-ui");
  initDatepicker();
};

loadDatepicker();

const skipMode = new URLSearchParams(window.location.search).get("skip");
const shouldSkipToLast =
  skipMode === "last" || localStorage.getItem("skipWizard") === "last";
if (shouldSkipToLast) {
  showOnlyStep(wizardStep5);
}

startButton.addEventListener("click", () => {
  heroStart.classList.add("hidden");
  wizardPreview.classList.add("hidden");
  wizardForm.classList.remove("hidden");
  wizardStep2.classList.add("hidden");
  wizardStep3.classList.add("hidden");
  wizardStep4.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

backButton.addEventListener("click", () => {
  wizardForm.classList.add("hidden");
  wizardStep2.classList.add("hidden");
  wizardStep3.classList.add("hidden");
  wizardStep4.classList.add("hidden");
  wizardStep5.classList.add("hidden");
  heroStart.classList.remove("hidden");
  wizardPreview.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

consentAgree.addEventListener("change", () => {
  nextStep.disabled = !consentAgree.checked;
});

nextStep.addEventListener("click", () => {
  if (nextStep.disabled) return;
  wizardForm.classList.add("hidden");
  wizardStep2.classList.remove("hidden");
  wizardStep3.classList.add("hidden");
  wizardStep4.classList.add("hidden");
  wizardStep5.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

backToConsent.addEventListener("click", () => {
  wizardStep2.classList.add("hidden");
  wizardForm.classList.remove("hidden");
  wizardStep4.classList.add("hidden");
  wizardStep5.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function validateDirectorStep() {
  const name = directorName.value.trim();
  const birth = directorBirth.value.trim();
  const nameValid = name.length > 0 && name.length <= 30;
  const birthValid = birth.length > 0;
  nextStep2.disabled = !(nameValid && birthValid);
}

directorName.addEventListener("input", validateDirectorStep);
directorBirth.addEventListener("change", validateDirectorStep);

nextStep2.addEventListener("click", () => {
  if (nextStep2.disabled) return;
  wizardStep2.classList.add("hidden");
  wizardStep3.classList.remove("hidden");
  wizardStep4.classList.add("hidden");
  wizardStep5.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

backToStep2.addEventListener("click", () => {
  wizardStep3.classList.add("hidden");
  wizardStep2.classList.remove("hidden");
  wizardStep4.classList.add("hidden");
  wizardStep5.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function validateHospitalStep() {
  const name = hospitalName.value.trim();
  const nameEn = hospitalNameEn.value.trim();
  const address = hospitalAddress.value.trim();
  nextStep3.disabled = !(name && nameEn && address);
}

hospitalName.addEventListener("input", validateHospitalStep);
hospitalNameEn.addEventListener("input", validateHospitalStep);
hospitalAddress.addEventListener("input", validateHospitalStep);

function openKakaoAddressSearch() {
  const postcode = window.kakao?.Postcode;

  if (!postcode) {
    alert("주소 검색 서비스를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
    return;
  }

  new postcode({
    oncomplete: (data) => {
      const address = data.roadAddress?.trim() || data.address?.trim() || "";
      hospitalAddress.value = address;
      validateHospitalStep();
      hospitalAddressDetail.focus();
    },
  }).open();
}

hospitalAddressSearch.addEventListener("click", openKakaoAddressSearch);

nextStep3.addEventListener("click", () => {
  if (nextStep3.disabled) return;
  wizardStep3.classList.add("hidden");
  wizardStep4.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

backToStep3.addEventListener("click", () => {
  wizardStep4.classList.add("hidden");
  wizardStep3.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

nextStep4.addEventListener("click", async () => {
  if (nextStep4.disabled) return;
  const payload = buildHospitalSetupPayload();
  await hospitalSetupRepository.save(payload);
  wizardStep4.classList.add("hidden");
  wizardStep5.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

backToStep4.addEventListener("click", () => {
  wizardStep5.classList.add("hidden");
  wizardStep4.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function validateStep4() {
  nextStep4.disabled = departmentCode.value.trim().length === 0;
}

departmentCode.addEventListener("change", validateStep4);

type HospitalSetupPayload = {
  director: {
    name: string;
    birthDate: string;
  };
  hospital: {
    name: string;
    nameEn: string;
    address: string;
    addressDetail?: string;
  };
  departmentMaster: DepartmentRow[];
  selectedDepartment: DepartmentRow | null;
  staffPlan: StaffRow[];
};

const hospitalSetupRepository = {
  save: async (payload: HospitalSetupPayload) => {
    // TODO: 서버 API 연결 시 이 함수에서 POST 요청으로 교체
    (window as any).__hospitalSetupDraft = payload;
  },
};

type DepartmentRow = { code: string; name: string };
const departmentMaster: DepartmentRow[] = [
  { code: "00", name: "일반의" },
  { code: "01", name: "내과" },
  { code: "02", name: "신경과" },
  { code: "03", name: "정신건강의학과" },
  { code: "04", name: "외과" },
  { code: "05", name: "정형외과" },
  { code: "06", name: "신경외과" },
  { code: "07", name: "흉부외과" },
  { code: "08", name: "성형외과" },
  { code: "09", name: "마취통증의학과" },
  { code: "10", name: "산부인과" },
  { code: "11", name: "소아청소년과" },
  { code: "12", name: "안과" },
  { code: "13", name: "이비인후과" },
  { code: "14", name: "피부과" },
  { code: "15", name: "비뇨의학과" },
  { code: "16", name: "영상의학과" },
  { code: "17", name: "방사선종양학과" },
  { code: "18", name: "병리과" },
  { code: "19", name: "진단검사의학과" },
  { code: "20", name: "결핵과" },
  { code: "21", name: "재활의학과" },
  { code: "22", name: "핵의학과" },
  { code: "23", name: "가정의학과" },
  { code: "24", name: "응급의학과" },
  { code: "25", name: "직업환경의학과" },
  { code: "26", name: "예방의학과" },
  { code: "49", name: "치과" },
  { code: "50", name: "구강악안면외과" },
  { code: "51", name: "치과보철과" },
  { code: "52", name: "치과교정과" },
  { code: "80", name: "한방내과" },
  { code: "81", name: "한방부인과" },
  { code: "82", name: "한방소아과" },
  { code: "83", name: "한방안이비인후피부과" },
  { code: "84", name: "한방신경정신과" },
  { code: "85", name: "침구과" },
  { code: "86", name: "한방재활의학과" },
  { code: "87", name: "사상체질과" },
];

const departmentMasterMap = new Map(
  departmentMaster.map((department) => [department.code, department.name])
);

function getSelectedDepartment(): DepartmentRow | null {
  const code = departmentCode.value.trim();
  if (!code) return null;
  const name =
    departmentMasterMap.get(code) ||
    departmentCode.options[departmentCode.selectedIndex]?.text ||
    "";
  return { code, name };
}

function buildHospitalSetupPayload(): HospitalSetupPayload {
  return {
    director: {
      name: directorName.value.trim(),
      birthDate: directorBirth.value.trim(),
    },
    hospital: {
      name: hospitalName.value.trim(),
      nameEn: hospitalNameEn.value.trim(),
      address: hospitalAddress.value.trim(),
      addressDetail: hospitalAddressDetail.value.trim() || undefined,
    },
    departmentMaster: [...departmentMaster],
    selectedDepartment: getSelectedDepartment(),
    staffPlan: staffRows.map((row) => ({
      role: row.role.trim(),
      count: Number(row.count || 0),
    })),
  };
}

type StaffRow = { role: string; count: number };
const staffRows: StaffRow[] = [
  { role: "의료진", count: 0 },
  { role: "코디", count: 0 },
];

function renderStaffRows() {
  staffTableBody.innerHTML = staffRows
    .map(
      (row, index) => `
        <tr data-index="${index}">
          <td>
            <input
              type="text"
              value="${row.role}"
              placeholder="예: 관리/간호"
              ${index === 0 ? "readonly" : ""}
              data-role-input="${index}"
            />
          </td>
          <td>
            <input
              type="number"
              min="0"
              value="${row.count}"
              placeholder="0"
              data-count-input="${index}"
            />
          </td>
          <td>
            ${
              index === 0
                ? ""
                : `<button class="ghost" type="button" data-remove-staff="${index}">삭제</button>`
            }
          </td>
        </tr>
      `
    )
    .join("");
}

addStaffRow.addEventListener("click", () => {
  staffRows.push({ role: "", count: 0 });
  renderStaffRows();
  validateStaffStep();
});

staffTableBody.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  const roleIndex = target.getAttribute("data-role-input");
  const countIndex = target.getAttribute("data-count-input");
  if (roleIndex !== null) {
    if (Number(roleIndex) !== 0) {
      staffRows[Number(roleIndex)].role = target.value;
    }
  }
  if (countIndex !== null) {
    staffRows[Number(countIndex)].count = Number(target.value || 0);
  }
  validateStaffStep();
});

staffTableBody.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const removeIndex = target.getAttribute("data-remove-staff");
  if (removeIndex === null) return;
  staffRows.splice(Number(removeIndex), 1);
  renderStaffRows();
  validateStaffStep();
});

function validateStaffStep() {
  const medicalCount = staffRows[0]?.count ?? 0;
  nextStep5.disabled = !(medicalCount > 0);
}

renderStaffRows();
validateStaffStep();





