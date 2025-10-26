"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../../store/userSlice";
import { useRouter } from "next/navigation";
import UserForm from "../../../components/UserForm";

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
    document.title = "MiniUserDashboard | Yeni Kullanıcı";
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addUser({ ...form, id: Date.now(), company: { name: form.company } })
    );
    router.push("/");
  };

  return (
    <div className="user-detail-page">
      <h2 className="user-detail-title">Yeni Kullanıcı</h2>
      <form className="user-detail-form" onSubmit={handleSubmit}>
        <UserForm formData={form} onChange={handleChange} />
        <button type="submit" className="user-detail-btn user-detail-save-btn">
          Kaydet
        </button>
        <button
          type="button"
          className="user-detail-btn user-detail-save-back"
          onClick={() => router.push("/")}
        >
          Geri
        </button>
      </form>
    </div>
  );
}
