import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./Nav.scss";
import { useGlobal } from "../../../context";

// Nơi tạo các đường dẫn đến các router khác.

const Nav = ({ showNav, setShowNav }) => {
  const history = useHistory();
  const location = useLocation().pathname;
  const { user, role } = useGlobal();

  useEffect(() => {
    // Kiểm tra xem trang hiện tại thuốc đường dẫn nào để active( in gạch chân phía dưới đường dẫn :ví dụ Phim mới,Phim bộ)

    const handleEvent = (e) => {
      if (e.target.classList.contains("bold") || e.target.classList.contains("ul")) {
        setShowNav(false);
      }
    };
    window.addEventListener("click", handleEvent);
    return () => window.removeEventListener("click", handleEvent);
  }, []);
  return (
    // nếu ShowBar ==true thì hiển thị thanh navigation bar ở giao diện mobile
    <nav className={`nav ${showNav ? "show" : ""}`}>
      <ul className="ul">
        {/* Khi click sẽ set router là oddfilm và di chuyển đến trang tương ứng với router đó */}
        <li className={`bold ${location === "/oddfilm" ? "active" : ""}`} onClick={() => history.push("/oddfilm")}>
          Phim Lẻ
        </li>
        {/* Khi click sẽ set router là seriesfilm và di chuyển đến trang tương ứng với router đó */}
        <li
          className={`bold ${location === "/seriesfilm" ? "active" : ""}`}
          onClick={() => history.push("/seriesfilm")}
        >
          Phim Bộ
        </li>
        {/* Khi click sẽ set router là manager và di chuyển đến trang tương ứng với router đó */}
        {user && role === "admin" && (
          <li className={`bold ${location === "/manager" ? "active" : ""}`} onClick={() => history.push("/manager")}>
            Quản Lý Phim
          </li>
        )}
        <li className={`bold ${location === "/account" ? "active" : ""}`} onClick={() => history.push("/account")}>
          {/* Hiển thị avatar và tên đăng nhập */}
          {user ? (
            <div className="account bold">
              <img
                src={
                  user.photoURL ||
                  "https://lh3.googleusercontent.com/TuW_5qbJjB2LNHCs5ZfernjesNw936Bda_2mdRC4ruDtZVIxl5TST8ykOHbkcBBEcg=s250"
                }
                alt="avatar"
                className="avatar bold"
              />
              <p className="bold">{user.displayName}</p>
            </div>
          ) : (
            "Tài Khoản"
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
