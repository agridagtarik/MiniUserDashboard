"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUsersQuery } from "../store/api";
import { setUsers } from "../store/userSlice";
import UserList from "../components/UserList";
import SearchBar from "../components/SearchBar";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useResponsiveItems } from "../hooks/useResponsiveItems";
import { CARD_HEIGHT, CARD_WIDTH } from "../constants/index";

export default function HomePage() {
  const dispatch = useDispatch();
  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const userList = useSelector((state) => state.users.list);

  const [search, setSearch] = useState("");
  const itemsPerLoad = useResponsiveItems(6);

  const filteredUsers = useMemo(
    () =>
      userList.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.username.toLowerCase().includes(search.toLowerCase())
      ),
    [userList, search]
  );

  useEffect(() => {
    document.title = "Mini User Dashboard";
  }, []);

  useEffect(() => {
    if (!userList.length && users.length) dispatch(setUsers(users));
  }, [users, userList, dispatch]);

  const [displayedUsers, setDisplayedUsers] = useState([]);

  useEffect(() => {
    const calculateInitialUsers = () => {
      const cardsPerRow = Math.floor(window.innerWidth / CARD_WIDTH);
      const rowsVisible = Math.ceil(window.innerHeight / CARD_HEIGHT);
      const initialCount = Math.max(itemsPerLoad, cardsPerRow * rowsVisible);
      setDisplayedUsers(filteredUsers.slice(0, initialCount));
    };

    calculateInitialUsers();
    window.addEventListener("resize", calculateInitialUsers);

    return () => window.removeEventListener("resize", calculateInitialUsers);
  }, [filteredUsers, itemsPerLoad]);

  useInfiniteScroll(() => {
    setDisplayedUsers((prev) => {
      const nextSlice = filteredUsers.slice(0, prev.length + itemsPerLoad);
      return nextSlice.length > prev.length ? nextSlice : prev;
    });
  });

  return (
    <div className="home-container">
      <main className="content">
        <SearchBar search={search} setSearch={setSearch} />
        <UserList
          users={displayedUsers}
          isLoading={isLoading}
          isError={isError}
        />
        {!isLoading && !isError && filteredUsers.length === 0 && (
          <div className="no-results-message">
            <span className="icon">😕</span>
            <p>Kullanıcı Bulunamadı</p>
          </div>
        )}
      </main>
    </div>
  );
}
