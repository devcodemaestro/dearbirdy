const RoleStep = ({ setFormData, onNext }) => (
  <div>
    <p>멘토 또는 멘티를 선택하세요.</p>
    <button
      onClick={() =>
        setFormData((prev) => ({ ...prev, userRole: "멘토" })) || onNext()
      }
    >
      멘토
    </button>
    <button
      onClick={() =>
        setFormData((prev) => ({ ...prev, userRole: "멘티" })) || onNext()
      }
    >
      멘티
    </button>
  </div>
);

export default RoleStep;
