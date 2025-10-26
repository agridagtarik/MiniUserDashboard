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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = "Mini User Dashboard | Yeni Kullanıcı";
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "İsim gerekli.";
    if (!form.username.trim()) newErrors.username = "Kullanıcı Adı gerekli.";
    if (!form.email.trim()) {
      newErrors.email = "Mail gerekli.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Geçerli bir mail girin.";
    }
    if (!form.phone.trim()) newErrors.phone = "Telefon numarası gerekli.";
    if (!form.company.trim()) newErrors.company = "Şirket Adı gerekli.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(
      addUser({ ...form, id: Date.now(), company: { name: form.company } })
    );
    router.push("/");
  };

  return (
    <div className="user-detail-page">
      <h2 className="user-detail-title">Yeni Kullanıcı</h2>
      <form className="user-detail-form" onSubmit={handleSubmit}>
        <UserForm formData={form} onChange={handleChange} errors={errors} />
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
