"use client";

import { useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../../store/api";
import Loader from "../../../components/Loader";
import Error from "../../../components/Error";
import UserForm from "../../../components/UserForm";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userList = useSelector((state) => state.users.list);

  const selectedUser = useMemo(
    () => userList.find((u) => u.id.toString() === params.id),
    [userList, params.id]
  );

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserQuery(params.id, {
    skip: !!selectedUser,
  });

  const userData = selectedUser || user;
  useEffect(() => {
    document.title = `Mini User Dashboard | ${
      userData ? userData?.name : "Kullanıcı Bulunamadı"
    }`;
  }, [userData]);
  const formData = useMemo(() => {
    if (!userData) return null;
    return {
      name: userData.name || "",
      username: userData.username || "",
      email: userData.email || "",
      phone: userData.phone || "",
      company: userData.company?.name || "",
    };
  }, [userData]);

  if (isLoading) return <Loader />;
  if (isError || !userData) return <Error message="Kullanıcı bulunamadı!" />;

  return (
    <div className="user-detail-page">
      <h2 className="user-detail-title">Kullanıcı Detayı</h2>
      <form className="user-detail-form">
        <UserForm formData={formData} isReadOnly />
        <button
          type="button"
          className="user-detail-btn user-detail-save-back-filled"
          onClick={() => router.push("/")}
        >
          Geri
        </button>
      </form>
    </div>
  );
}
