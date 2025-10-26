"use client";

export default function UserForm({
  formData,
  onChange,
  isReadOnly,
  errors = {},
}) {
  const fieldsNames = {
    name: "İsim",
    username: "Kullanıcı Adı",
    email: "Mail",
    phone: "Telefon",
    company: "Şirket",
  };
  return (
    <>
      {["name", "username", "email", "phone", "company"].map((field) => (
        <label key={field} className="user-detail-label">
          <input
            id={field}
            name={field}
            aria-label={field}
            placeholder={fieldsNames[field]}
            value={formData[field]}
            onChange={onChange}
            type={
              field === "email" ? "email" : field === "phone" ? "tel" : "text"
            }
            disabled={isReadOnly}
            className={`user-detail-input ${
              errors[field] ? "input-error" : ""
            }`}
          />
          {errors[field] && <span className="error-text">{errors[field]}</span>}
        </label>
      ))}
    </>
  );
}
