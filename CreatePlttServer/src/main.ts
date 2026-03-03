import "./style.css";
import { startPage } from "./pageStart";
import { consentPage } from "./pageConsent";
import { step2Page } from "./pageStep2";
import { step3Page } from "./pageStep3";

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
  !directorName ||
  !directorBirth ||
  !nextStep2 ||
  !backToStep2 ||
  !hospitalName ||
  !hospitalNameEn ||
  !hospitalAddress ||
  !hospitalAddressDetail ||
  !hospitalAddressSearch ||
  !nextStep3
) {
  throw new Error("wizard elements not found");
}

startButton.addEventListener("click", () => {
  heroStart.classList.add("hidden");
  wizardPreview.classList.add("hidden");
  wizardForm.classList.remove("hidden");
  wizardStep2.classList.add("hidden");
  wizardStep3.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

backButton.addEventListener("click", () => {
  wizardForm.classList.add("hidden");
  wizardStep2.classList.add("hidden");
  wizardStep3.classList.add("hidden");
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
  window.scrollTo({ top: 0, behavior: "smooth" });
});

backToConsent.addEventListener("click", () => {
  wizardStep2.classList.add("hidden");
  wizardForm.classList.remove("hidden");
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
  window.scrollTo({ top: 0, behavior: "smooth" });
});

backToStep2.addEventListener("click", () => {
  wizardStep3.classList.add("hidden");
  wizardStep2.classList.remove("hidden");
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
