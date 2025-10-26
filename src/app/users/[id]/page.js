"use client";
import { useState, useEffect, useTransition } from "react";
import { useGetUserQuery } from "../../../store/api";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader";
import Error from "@/components/Error";

export default function UserDetailPage() {
  const params = useParams();

  const router = useRouter();
  const userList = useSelector((state) => state.users.list);

  const selectedUser = userList?.filter((user) => {
    return user?.id?.toString() === params?.id?.toString();
  });
  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserQuery(params.id, {
    skip: selectedUser?.length > 0,
  });
  const userData = selectedUser?.[0] || user;

  const [form, setForm] = useState(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (userData) {
      startTransition(() => {
        setForm({
          name: userData.name || "",
          username: userData.username || "",
          email: userData.email || "",
          phone: userData.phone || "",
          company: userData.company?.name || "",
        });
      });
    }
  }, [userData]);

  if (isLoading || !form) return <Loader />;
  if (isError || !selectedUser?.length === 0)
    return <Error message="Kullanıcı bulunamadı!" />;

  return (
    <div className="user-detail-page">
      <form className="user-detail-form">
        <h2 className="user-detail-title">Kullanıcı Detayı</h2>
        {["name", "username", "email", "phone", "company"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={
              field === "company"
                ? "Şirket Adı"
                : field.charAt(0).toUpperCase() + field.slice(1)
            }
            value={form[field]}
            type={field === "email" ? "email" : "text"}
            disabled
            className="user-detail-input"
          />
        ))}
        <button
          type="button"
          className="user-detail-save-back"
          onClick={() => router.push("/")}
          style={{ background: "#4c6ef5", color: "#fff" }}
        >
          Geri
        </button>
      </form>
    </div>
  );
}
