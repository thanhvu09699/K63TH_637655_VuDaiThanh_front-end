import React, { useState } from "react";
import "./RightContent.scss";
import ListFilm from "../../utils/ListFilm/ListFilm";
import { useGlobal } from "../../../context";

// Phần nội dung bên phải (gồm danh sách phim phân bố đều).

const RightContent = ({ value, setValue }) => {
  const [active, setActive] = useState("all");
  const { films } = useGlobal();

  const handleClick = (e) => {
    setValue("");
    setActive(e.target.dataset.id);
  };
  if (!films) {
    return <></>;
  }
  return (
    <section className="right-container">
      <div className="right-container__header">
        <h3 className="right-container__header-title">Phim Bộ Mới</h3>
        <div className="options-btn">
          {/* button ở các dạng phim ở trang chủ : khi click thì set biến active == giá trị button đó để đổi màu background */}
          <button className={active === "all" ? "active" : ""} data-id="all" onClick={handleClick}>
            Tất cả Phim
          </button>
          <button className={active === "upcoming" ? "active" : ""} data-id="upcoming" onClick={handleClick}>
            Sắp Chiếu
          </button>
          <button className={active === "new" ? "active" : ""} data-id="new" onClick={handleClick}>
            Phim Mới
          </button>
        </div>
      </div>
      {/* Hiển thị danh sách phim theo từng button ở phía trên.  */}
      {/* Lọc phim theo các điều kiện sau: all(hiển thị hết tất cả các phim ; upcoming(Hiện thị các phim sắp ra mắt) ; những bộ phim nào có thời gian upload nhỏ hơn 7 ngày thì được xem là nhưng bộ phim mới(được tính bằng cách lấy thời gian hiện tại trừ thời gian upload)) */}
      <ListFilm
        type="row"
        films={films
          .filter((film) =>
            active === "all"
              ? film
              : active === "upcoming"
              ? film.upcoming === "true" && film
              : new Date().getTime() - film.createAt < 1000 * 60 * 60 * 24 * 7 && film
          )
          .filter((film) => film.title.toLowerCase().includes(value.toLowerCase()))}
      />
    </section>
  );
};

export default RightContent;
