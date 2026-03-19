export const step8Page = `
  <section class="wizard hidden" id="wizardStep8">
    <div class="wizard-header">
      <div>
        <p class="eyebrow">8단계 · 병원정보 세부설정 (5)</p>
        <h3>우리병원에서 사용될 계정에 초대메일을 보내드릴 예정입니다.</h3>
        <p class="lead">
          사용하실 이메일 계정 및 권한, 부서, 직군을 포함하여 입력해주세요.<br />
          실제 로그인이 가능하신 이메일계정으로 입력 부탁드리며 원장님계정은 필수로 입력해주세요.<br />
          추가버튼을 눌러 현시점에 닥터팔레트를 사용하시게 될 직원분들의 이메일주소 및 부서, 직군을 입력해주시기 바랍니다.
        </p>
      </div>
      <div class="wizard-progress">
        <span>진행률</span>
        <strong>8 / 8</strong>
      </div>
    </div>

    <div class="form-grid">
      <div class="field span-2">
        <div class="table-wrap">
          <table class="data-table" id="accountInviteTable">
            <thead>
              <tr>
                <th>이메일</th>
                <th>부서</th>
                <th>직군</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody id="accountInviteTableBody"></tbody>
          </table>
        </div>
        <div class="inline-actions">
          <button class="secondary" type="button" id="addAccountInviteRow">계정 추가</button>
        </div>
      </div>
    </div>

    <div class="wizard-actions">
      <button class="secondary" id="backToStep7">이전 단계</button>
      <button class="ghost goStart" type="button">처음으로</button>
      <button class="primary" id="nextStep8" disabled>다음 단계</button>
    </div>
  </section>
`;
