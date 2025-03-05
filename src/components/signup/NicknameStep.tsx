const NicknameStep = ({ formData, setFormData, onNext }) => (
  <div>
    <p>닉네임을 입력해주세요.</p>
    <input
      type="text"
      name="nickname"
      value={formData.nickname}
      onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
      className="border p-2 w-full"
    />
    <button onClick={onNext}>다음</button>
  </div>
);

export default NicknameStep;
