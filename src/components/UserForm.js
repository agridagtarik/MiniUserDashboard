"use client";

export default function UserForm({ formData, onChange, isReadOnly }) {
  return (
    <>
      {["name", "username", "email", "phone", "company"].map((field) => (
        <label key={field}>
          <input
            id={field}
            name={field}
            aria-label={field}
            placeholder={
              field === "company"
                ? "Şirket Adı"
                : field.charAt(0).toUpperCase() + field.slice(1)
            }
            value={formData[field]}
            onChange={onChange}
            type={field === "email" ? "email" : "text"}
            disabled={isReadOnly}
            className="user-detail-input"
          />
        </label>
      ))}
    </>
  );
}
