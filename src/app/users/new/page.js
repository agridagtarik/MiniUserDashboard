"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../../store/userSlice";
import { useRouter } from "next/navigation";

export default function NewUserPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    company: "",
  });
  useEffect(() => {
    document.title = "MiniUserDashboard|Yeni Kullanıcı";
  }, []);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addUser({
        id: Date.now(),
        name: form.name,
        username: form.username,
        email: form.email,
        phone: form.phone,
        company: { name: form.company },
      })
    );
    router.push("/");
  };

  return (
    <div className="user-detail-page">
      <form onSubmit={handleSubmit} className="user-detail-form">
        <h2 className="user-detail-title">Yeni Kullanıcı</h2>

        {["name", "username", "email", "phone", "company"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field === "company" ? "Şirket Adı" : field}
            onChange={handleChange}
            required
            className="user-detail-input"
          />
        ))}

        <button type="submit" className="user-detail-save-btn">
          Kaydet
        </button>
        <button
          type="button"
          className="user-detail-save-back"
          onClick={() => router.push("/")}
        >
          Geri
        </button>
      </form>
    </div>
  );
}
