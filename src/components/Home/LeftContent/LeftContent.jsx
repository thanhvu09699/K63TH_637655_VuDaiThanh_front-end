import React from "react";
import "./LeftContent.scss";
import ListFilm from "../../utils/ListFilm/ListFilm";
import { useGlobal } from "../../../context";

// Phần nội dung bên trái của trang chủ(gồm danh sách phim theo chiều dọc).

const LeftContent = () => {
  const { films } = useGlobal();
  if (!films) return <></>;
  return (
    <section className="left-container">
      <div className="left-container__top">
        <h3 className="title-left">PHIM BỘ HOT</h3>
        {/* Lọc những phim nào có isMutiEp ==true để hiển thị (phim nhiều tập)*/}
        <ListFilm type="column" films={films.filter((film) => film.isMultiEp.toString() === "true")} />
      </div>
      <div className="left-container__bottom">
        <h3 className="title-left">PHIM LẺ HOT</h3>
        {/* Lọc những phim nào có isMutiEp ==false để hiển thị (phim ít tập)*/}
        <ListFilm type="column" films={films.filter((film) => film.isMultiEp.toString() === "false")} />
      </div>
    </section>
  );
};

export default LeftContent;
