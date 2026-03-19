export const consentPage = `
  <section class="wizard hidden" id="wizardForm">
    <div class="wizard-header">
      <div>
        <p class="eyebrow">1단계 · 병원 기본 정보</p>
        <h3>서버 세팅 동의</h3>
      </div>
      <div class="wizard-progress">
        <span>진행률</span>
        <strong>1 / 8</strong>
      </div>
    </div>

    <div class="consent-card">
      <p class="consent-text">
        지금부터 우리병원 서버세팅을 위한 프로세스를 시작합니다.<br />
        주신 정보를 토대로 우리병원 서버 및 프로그램이 세팅될 예정이며 해당정보들은<br />
        향후 닥터팔레트 병원세팅 프로그램의 고도화를 위한 분석 자료로 활용되는것에 동의합니다.
      </p>
      <label class="consent-check">
        <input type="checkbox" id="consentAgree" />
        <span>위 내용에 동의합니다.</span>
      </label>
    </div>

    <div class="wizard-actions">
      <button class="secondary" id="backToStart">처음으로</button>
      <button class="primary" id="nextStep" disabled>다음 단계</button>
    </div>
  </section>
`;
