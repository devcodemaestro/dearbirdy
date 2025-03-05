const CategoryStep = ({ formData, setFormData, onNext }) => (
  <div>
    <p>관심 있는 카테고리를 선택하세요.</p>
    {Object.keys(formData.userCategory).map((key) => (
      <label key={key}>
        <input
          type="checkbox"
          name={key}
          checked={formData.userCategory[key]}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              userCategory: { ...prev.userCategory, [key]: e.target.checked },
            }))
          }
        />
        {key}
      </label>
    ))}
    <button onClick={onNext}>다음</button>
  </div>
);

export default CategoryStep;
