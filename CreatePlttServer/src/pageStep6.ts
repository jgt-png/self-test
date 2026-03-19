export const step6Page = `
  <section class="wizard hidden" id="wizardStep6">
    <div class="wizard-header">
      <div>
        <p class="eyebrow">6단계 · 병원정보 세부설정 (3)</p>
        <h3>우리병원에 구성될 부서를 입력해주세요</h3>
        <p class="lead">
          우리병원 운영에 필요한 부서명을 직접 입력해 조직 구성을 정리해주세요.
        </p>
      </div>
      <div class="wizard-progress">
        <span>진행률</span>
        <strong>6 / 8</strong>
      </div>
    </div>

    <div class="form-grid">
      <div class="field span-2">
        <div class="table-wrap">
          <table class="data-table" id="departmentTeamTable">
            <thead>
              <tr>
                <th>부서명</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody id="departmentTeamTableBody"></tbody>
          </table>
        </div>
        <div class="inline-actions">
          <button class="secondary" type="button" id="addDepartmentTeamRow">부서 추가</button>
        </div>
      </div>
    </div>

    <div class="wizard-actions">
      <button class="secondary" id="backToStep5">이전 단계</button>
      <button class="ghost goStart" type="button">처음으로</button>
      <button class="primary" id="nextStep6" disabled>다음 단계</button>
    </div>
  </section>
`;
