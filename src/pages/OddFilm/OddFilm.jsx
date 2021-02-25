import React, { useState } from "react";
import "./OddFilm.scss";
import ListFilm from "../../components/utils/ListFilm/ListFilm";
import Search from "../../components/Search/Search";
import { useGlobal } from "../../context";

// Trang hiện thị các bộ phim lẻ trong danh sách các phim ,có route là ('/oddfilm')

const OddFilm = () => {
  const { films } = useGlobal();
  const [value, setValue] = useState("");
  if (!films) return <></>;
  return (
    <>
      <Search setValue={setValue} value={value} />
      <section className="odd-film">
        <h3 className="odd-film__title">Phim Lẻ</h3>
        {/* Hiển thị danh sách phim bộ và đồng thời lọc phim theo giá trị của thanh tìm kiếm */}
        <ListFilm
          type="row"
          films={films
            .filter((film) => film.isMultiEp.toString() === "false")
            .filter((film) => film.title.toLowerCase().includes(value.toLowerCase()))}
        />
      </section>
    </>
  );
};

export default OddFilm;
