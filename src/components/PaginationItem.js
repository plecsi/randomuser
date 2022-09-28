import React, { useState } from "react";
const PaginationItem = (props) => {
  const { count, page } = props;
  const [currentPage, setCurrentPage] = useState(props.page);

  const handlePrev = (e) => {
    setCurrentPage(Number(e.target.value));
    props.onChange(Number(e.target.value));
  };
  const handleNext = (e) => {
    setCurrentPage(Number(e.target.value));
    props.onChange(Number(e.target.value));
  };

  const handlePageClick = (e) => {
    setCurrentPage(Number(e.target.id));
    props.onChange(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= count; i++) {
    pages.push(i);
  }
  return (
    <>
      <ul className="page-numbers">
        <li>
          <button
            onClick={handlePrev}
            value={currentPage - 1}
            disabled={currentPage - 1 === 0}
          >
            Prev
          </button>
        </li>
        {pages.map((item, index) => {
          return (
            <li
              key={index}
              id={index}
              onClick={handlePageClick}
              className={index === page - 1 ? "active" : null}
            >
              {item}
            </li>
          );
        })}
        <li>
          <button
            onClick={handleNext}
            value={currentPage + 1}
            disabled={currentPage === count}
          >
            next
          </button>
        </li>
      </ul>
    </>
  );
};

export default PaginationItem;
