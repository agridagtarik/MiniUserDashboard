"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { deleteUser } from "../store/userSlice";
import { useState } from "react";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function UserCard({ user }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteUser(user.id));
    setOpen(false);
  };

  return (
    <>
      <div className="user-card">
        <div className="user-avatar">{user.name.charAt(0)}</div>
        <h3>{user.name}</h3>
        <p className="username">@{user.username}</p>
        <div className="info">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Company:</strong> {user.company?.name}
          </p>
        </div>
        <div className="buttons">
          <Link href={`/users/${user.id}`}>
            <button className="btn detail">Detay</button>
          </Link>
          <button className="btn delete" onClick={() => setOpen(true)}>
            Sil
          </button>
        </div>
      </div>
      <DeleteConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
