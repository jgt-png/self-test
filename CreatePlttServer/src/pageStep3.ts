export const step3Page = `
  <section class="wizard hidden" id="wizardStep3">
    <div class="wizard-header">
      <div>
        <p class="eyebrow">3단계 · 병원 기본 정보</p>
        <h3>다음은 우리병원에 대한 정보블 여쭤보겠습니다!</h3>
        <p class="lead">
          현 시점으로 확정되어있는 정보들에 대한 내용을 기입해주세요
        </p>
      </div>
      <div class="wizard-progress">
        <span>진행률</span>
        <strong>3 / 24</strong>
      </div>
    </div>

    <div class="form-grid">
      <label class="field">
        <span>요양기관기호</span>
        <input type="text" maxlength="8" placeholder="예: 12345678" />
      </label>
      <label class="field">
        <span>병원명 (필수)</span>
        <input id="hospitalName" type="text" maxlength="30" placeholder="예: 닥터팔레트의원" />
      </label>
      <label class="field">
        <span>병원영문명 (필수)</span>
        <input id="hospitalNameEn" type="text" maxlength="50" placeholder="예: Doctor Palette Clinic" />
      </label>
      <label class="field span-2">
        <span>병원주소 (필수)</span>
        <div class="address-row">
          <input
            id="hospitalAddress"
            type="text"
            placeholder="도로명 주소"
            readonly
          />
          <button class="secondary" type="button" id="hospitalAddressSearch">
            주소 찾기
          </button>
        </div>
      </label>
      <label class="field span-2">
        <span>병원상세주소</span>
        <input
          id="hospitalAddressDetail"
          type="text"
          placeholder="층/호수 등"
        />
      </label>
      <label class="field">
        <span>사업자번호</span>
        <input
          id="businessNumber"
          type="text"
          maxlength="12"
          placeholder="000-00-00000"
        />
      </label>
      <label class="field">
        <span>병원전화번호</span>
        <input
          id="hospitalPhone"
          type="text"
          maxlength="13"
          placeholder="02-0000-0000"
        />
      </label>
      <label class="field">
        <span>병원FAX번호</span>
        <input
          id="hospitalFax"
          type="text"
          maxlength="13"
          placeholder="02-0000-0000"
        />
      </label>
    </div>

    <div class="wizard-actions">
      <button class="secondary" id="backToStep2">이전 단계</button>
      <button class="primary" id="nextStep3" disabled>다음 단계</button>
    </div>
  </section>
`;
