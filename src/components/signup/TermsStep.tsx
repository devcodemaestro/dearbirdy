const TermsStep = ({ onNext }) => (
  <div>
    <p>약관에 동의해주세요.</p>
    <label>
      <input type="checkbox" /> 서비스 이용약관 (필수)
    </label>
    <label>
      <input type="checkbox" /> 개인정보 처리방침 (필수)
    </label>
    <button onClick={onNext}>다음</button>
  </div>
);

export default TermsStep;
