export const step5Page = `
  <section class="wizard hidden" id="wizardStep5">
    <div class="wizard-header">
      <div>
        <p class="eyebrow">5단계 · 병원설정 세부설정 (2)</p>
        <h3>우리병원에서 근무예정인 인원수를 기재해주세요!</h3>
        <p class="lead">
          의료진, 코디 등 직군별 인원수를 입력해주세요.
        </p>
      </div>
      <div class="wizard-progress">
        <span>진행률</span>
        <strong>5 / 24</strong>
      </div>
    </div>

    <div class="form-grid">
      <div class="field span-2">
        <span>근무 예정 인원</span>
        <div class="table-wrap">
          <table class="data-table" id="staffTable">
            <thead>
              <tr>
                <th>직군</th>
                <th>인원수</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody id="staffTableBody"></tbody>
          </table>
        </div>
        <div class="inline-actions">
          <button class="secondary" type="button" id="addStaffRow">항목 추가</button>
        </div>
      </div>
    </div>

    <div class="wizard-actions">
      <button class="secondary" id="backToStep4">이전 단계</button>
      <button class="primary" id="nextStep5">다음 단계</button>
    </div>
  </section>
`;
