export const step4Page = `
  <section class="wizard hidden" id="wizardStep4">
    <div class="wizard-header">
      <div>
        <p class="eyebrow">4단계 · 병원정보 세부설정(1)</p>
        <h3>좋습니다. 작성해주신 데이터를 가지고 우리병원 서버를 구성할게요.</h3>
        <p class="lead">
          우리병원 세부설정에 필요한 몇가지를 더 여쭤볼게요!<br />
          우리병원 대표 진료과목을 선택해 주세요!
        </p>
      </div>
      <div class="wizard-progress">
        <span>진행률</span>
        <strong>4 / 24</strong>
      </div>
    </div>

    <div class="form-grid">
      <label class="field">
        <span>대표 진료과목 코드 (필수)</span>
        <select id="departmentCode">
          <option value="" selected disabled>진료과목 코드를 선택해 주세요</option>
          <option value="00">일반의</option>
          <option value="01">내과</option>
          <option value="02">신경과</option>
          <option value="03">정신건강의학과</option>
          <option value="04">외과</option>
          <option value="05">정형외과</option>
          <option value="06">신경외과</option>
          <option value="07">흉부외과</option>
          <option value="08">성형외과</option>
          <option value="09">마취통증의학과</option>
          <option value="10">산부인과</option>
          <option value="11">소아청소년과</option>
          <option value="12">안과</option>
          <option value="13">이비인후과</option>
          <option value="14">피부과</option>
          <option value="15">비뇨의학과</option>
          <option value="16">영상의학과</option>
          <option value="17">방사선종양학과</option>
          <option value="18">병리과</option>
          <option value="19">진단검사의학과</option>
          <option value="20">결핵과</option>
          <option value="21">재활의학과</option>
          <option value="22">핵의학과</option>
          <option value="23">가정의학과</option>
          <option value="24">응급의학과</option>
          <option value="25">직업환경의학과</option>
          <option value="26">예방의학과</option>
          <option value="49">치과</option>
          <option value="50">구강악안면외과</option>
          <option value="51">치과보철과</option>
          <option value="52">치과교정과</option>
          <option value="80">한방내과</option>
          <option value="81">한방부인과</option>
          <option value="82">한방소아과</option>
          <option value="83">한방안이비인후피부과</option>
          <option value="84">한방신경정신과</option>
          <option value="85">침구과</option>
          <option value="86">한방재활의학과</option>
          <option value="87">사상체질과</option>
        </select>
      </label>
    </div>

    <div class="wizard-actions">
      <button class="secondary" id="backToStep3">이전 단계</button>
      <button class="ghost goStart" type="button">처음으로</button>
      <button class="primary" id="nextStep4" disabled>다음 단계</button>
    </div>
  </section>
`;
