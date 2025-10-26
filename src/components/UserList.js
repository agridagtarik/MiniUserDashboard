"use client";

import UserCard from "./UserCard";
import Loader from "./Loader";
import Error from "./Error";

export default function UserList({ users, isLoading, isError }) {
  if (isLoading) return <Loader />;
  if (isError) return <Error message="Kullanıcı bulunamadı!" />;

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
