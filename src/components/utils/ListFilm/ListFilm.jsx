import React from "react";
import "./ListFilm.scss";
import Film from "./Film/Film";

// Dùng để hiện thị các bộ phim bằng danh sách phim được truyền vào như là 1 tham số.

const ListFilm = ({ type, films }) => {
  if (!films) {
    return <></>;
  }
  return (
    // nơi hiển thị các bộ phim bằng mảng [films] với phương thức map
    <section className={`films-container ${type}`}>
      {films.map((film) => (
        // Mỗi phim sẽ được tạo dựa trên component Film được import vào
        <Film film={film} key={film.createAt} />
      ))}
    </section>
  );
};

export default ListFilm;
