import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GiPopcorn } from "react-icons/gi";
import { FaBars } from "react-icons/fa";

import "./Header.scss";
import Nav from "./Nav/Nav";

// Thư mục chứa thành phần header của trang web(gồm logo, các đường dẫn).

const Header = () => {
  const history = useHistory();
  const [showNav, setShowNav] = useState(false);
  return (
    <header>
      <div className="logo" onClick={() => history.push("/")}>
        <GiPopcorn className="icon-logo" />
        <span className="bold orange-text">TEA </span> MOVIES
      </div>

      {/* Hiển thị thanh navigation bar của trang web nếu click vào FaBars */}
      <FaBars className="icon" onClick={() => setShowNav(true)} />
      {/* Thanh navigation bar*/}
      <Nav showNav={showNav} setShowNav={setShowNav} />
    </header>
  );
};

export default Header;
