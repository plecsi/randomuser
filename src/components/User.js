import React, { useState } from "react";
import usePagination from "../hooks/usePaginate";
import { useLocalStorage } from "../hooks/localStorage";
import PaginationItem from "./PaginationItem";
import style from "./user.module.scss";
const User = (props) => {
  const items = props.items;
  const [page, setPage] = useState(1);
  const { readStore } = useLocalStorage();
  const [currentUser, setCurrentUser] = useState(readStore("users"));
  const PER_PAGE = 10;

  const count = Math.ceil(items.length / PER_PAGE);
  const USER = usePagination(currentUser ? currentUser : items, PER_PAGE);

  const handleChange = (page) => {
    setPage(page);
    USER.jump(page);
  };
  const HandleGender = (e) => {
    const update = items.filter((item, index) => {
      return item.gender === e.target.value;
    });

    setCurrentUser(update);
  };
  return (
    <>
      <button onClick={HandleGender} value="male">
        Male
      </button>
      <button onClick={HandleGender} value="female">
        Female
      </button>
      <div className={style.items}>
        {USER.currentData().map((item, index) => {
          return (
            <div key={index} className={style.items__item}>
              <img src={item.picture.thumbnail} alt={item.name.first} />
              <h2 className="text-h2 mt-2 p-2">{`${item.name.title} ${item.name.first} ${item.name.last}`}</h2>
            </div>
          );
        })}
      </div>
      <PaginationItem count={count} page={page} onChange={handleChange} />
    </>
  );
};

export default User;
