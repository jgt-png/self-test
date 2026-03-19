export const startPage = `
  <section class="hero" id="heroStart">
    <div class="hero-content">
      <p class="eyebrow">시작 안내</p>
      <h2>닥터팔레트를 선택해 주셔서 진심으로 감사드립니다!</h2>
      <p class="lead">
        서비스 도입 과정이 원활하게 진행될 수 있도록 최선을 다해 지원하겠습니다.
      </p>
      <div class="cta-row">
        <button class="primary" id="startWizard">새 설정 시작</button>
      </div>
      <div class="meta">
        <div class="meta-item">
          <span class="meta-title">예상 소요</span>
          <span class="meta-value">12~18분</span>
        </div>
        <div class="meta-item">
          <span class="meta-title">입력 방식</span>
          <span class="meta-value">단계별 폼</span>
        </div>
        <div class="meta-item">
          <span class="meta-title">저장 방식</span>
          <span class="meta-value">JSON (임시)</span>
        </div>
      </div>
    </div>

    <aside class="hero-card">
      <div class="progress">
        <div class="progress-text">
          <span>진행률</span>
          <strong>0 / 8</strong>
        </div>
        <div class="progress-bar"><span style="width: 0%"></span></div>
      </div>
      <div class="checklist">
        <h3>준비물 체크</h3>
        <ul>
          <li>사업자등록번호</li>
          <li>요양기관번호 (해당 시)</li>
          <li>진료과목 및 운영 시간</li>
          <li>기본 사용자 계정 정보</li>
        </ul>
      </div>
      <div class="security-note">
        <h3>보안 안내</h3>
        <p>
          입력된 정보는 브라우저에 임시 저장되며, 완료 후 JSON으로 내려받습니다.
        </p>
      </div>
    </aside>
  </section>

  <section class="steps" id="wizardPreview">
    <div class="steps-header">
      <h3>마법사 흐름 미리보기</h3>
      <p>세부 단계는 병원 유형과 선택 항목에 따라 자동으로 조정됩니다.</p>
    </div>
    <div class="step-grid">
      <article class="step-card">
        <span class="step-tag">01</span>
        <h4>병원 기본 정보</h4>
        <p>병원명, 구분, 대표자, 개설일 등 핵심 정보를 입력합니다.</p>
      </article>
      <article class="step-card">
        <span class="step-tag">02</span>
        <h4>운영 및 진료 설정</h4>
        <p>진료과목, 운영시간, 예약 운영 여부 등을 설정합니다.</p>
      </article>
      <article class="step-card">
        <span class="step-tag">03</span>
        <h4>보험/청구 환경</h4>
        <p>요양기관번호, 청구 사용 여부 등 제도 설정을 확인합니다.</p>
      </article>
      <article class="step-card">
        <span class="step-tag">04</span>
        <h4>보안 및 마무리</h4>
        <p>보안 정책을 설정하고 입력 내용 요약을 확인합니다.</p>
      </article>
    </div>
  </section>
`;
