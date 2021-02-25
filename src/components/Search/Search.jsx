import React, { useState } from "react";
import "./Search.scss";

// /Khung tìm kiếm phim (nằm ở phía dưới thanh header)

const Search = ({ value, setValue }) => {
  return (
    <div className="search-container">
      {/* form để nhập giá trị */}
      <form>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Bạn muốn tìm phim gì..."
        />
        <button className="submit-btn" type="submit">
          Tìm Kiếm
        </button>
      </form>
    </div>
  );
};

export default Search;
