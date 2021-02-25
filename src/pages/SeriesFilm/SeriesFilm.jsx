import React, { useState } from "react";
import "./SeriesFilm.scss";
import ListFilm from "../../components/utils/ListFilm/ListFilm";
import Search from "../../components/Search/Search";
import { useGlobal } from "../../context";

// Trang hiện thị các bộ phim nhiều tập(phim bộ) trong danh sách các phim ,có route là ('/seriesfilm')

const SeriesFilm = () => {
  const { films } = useGlobal();
  const [value, setValue] = useState("");
  if (!films) return <></>;

  return (
    <>
      <Search setValue={setValue} value={value} />
      <section className="series-film">
        <h3 className="series-film__title">Phim Bộ</h3>
        {/* Hiển thị danh sách phim lẻ và đồng thời lọc phim theo giá trị của thanh tìm kiếm */}
        <ListFilm
          type="row"
          films={films
            .filter((film) => film.isMultiEp.toString() === "true")
            .filter((film) => film.title.toLowerCase().includes(value.toLowerCase()))}
        />
      </section>
    </>
  );
};

export default SeriesFilm;
