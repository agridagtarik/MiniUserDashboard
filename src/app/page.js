"use client";

import { useState, useEffect, useMemo } from "react";
import { useGetUsersQuery } from "../store/api";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "@/store/userSlice";
import UserList from "../components/UserList";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";

export default function HomePage() {
  const dispatch = useDispatch();
  const { data: users = [], isLoading, isError } = useGetUsersQuery();

  const [search, setSearch] = useState("");
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [itemsPerLoad, setItemsPerLoad] = useState(6);
  const userList = useSelector((state) => state.users.list);

  useEffect(() => {
    if (userList.length === 0 && users.length > 0) {
      dispatch(setUsers(users));
    }
  }, [users, userList.length, dispatch]);

  useEffect(() => {
    const updateItemsPerLoad = () => {
      let perLoad;
      if (window.innerWidth >= 1400) perLoad = 12;
      else if (window.innerWidth >= 1200) perLoad = 10;
      else if (window.innerWidth >= 1024) perLoad = 8;
      else if (window.innerWidth >= 768) perLoad = 6;
      else perLoad = 2;

      setItemsPerLoad(perLoad);
    };

    updateItemsPerLoad();
    window.addEventListener("resize", updateItemsPerLoad);
    return () => window.removeEventListener("resize", updateItemsPerLoad);
  }, []);

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
    const calculateInitialCount = () => {
      const cardHeight = 350;
      const cardsPerRow = Math.floor(window.innerWidth / 280);
      const rowsVisible = Math.ceil(window.innerHeight / cardHeight);
      const initialCount = Math.max(itemsPerLoad, cardsPerRow * rowsVisible);
      setDisplayedUsers(filteredUsers.slice(0, initialCount));
    };

    calculateInitialCount();
  }, [filteredUsers, itemsPerLoad]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setDisplayedUsers((prev) => {
          const nextSlice = filteredUsers.slice(0, prev.length + itemsPerLoad);
          return nextSlice.length > prev.length ? nextSlice : prev;
        });
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [filteredUsers, itemsPerLoad]);

  return (
    <div className="home-container">
      <Header />

      <main className="content">
        <div className="search-box">
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <div className="user-list-wrapper">
          <UserList
            users={displayedUsers}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </main>
    </div>
  );
}
