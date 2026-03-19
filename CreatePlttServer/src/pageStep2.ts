export const step2Page = `
  <section class="wizard hidden" id="wizardStep2">
    <div class="wizard-header">
      <div>
        <p class="eyebrow">2단계 · 병원 대표자 정보</p>
        <h3>병원 세팅을 위한 첫단계 입니다!</h3>
        <p class="lead">
          병원 대표자 정보를 여쭤보겠습니다.<br />
          병원 대표자의 성함, 생년월일을 기입해주세요.
        </p>
      </div>
      <div class="wizard-progress">
        <span>진행률</span>
        <strong>2 / 8</strong>
      </div>
    </div>

    <div class="form-grid">
      <label class="field">
        <span>대표자 성함 (필수)</span>
        <input id="directorName" type="text" maxlength="30" placeholder="예: 홍길동" />
      </label>
      <label class="field">
        <span>대표자 생년월일 (필수)</span>
        <input
          id="directorBirth"
          type="text"
          inputmode="numeric"
          autocomplete="off"
          placeholder="YYYY-MM-DD"
        />
      </label>
    </div>

    <div class="wizard-actions">
      <button class="secondary" id="backToConsent">이전 단계</button>
      <button class="ghost goStart" type="button">처음으로</button>
      <button class="primary" id="nextStep2" disabled>다음 단계</button>
    </div>
  </section>
`;
