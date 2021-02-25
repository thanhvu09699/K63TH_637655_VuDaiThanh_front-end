import React from "react";
import "./Film.scss";
import { BsTagFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { HiEye } from "react-icons/hi";
import Stars from "../../../utils/Stars/Stars";
import { useGlobal } from "../../../../context";

// Thư mục định dạng cho mỗi bộ phim( như ảnh đại diện,tên phim, số sao...)

const Film = ({ film }) => {
  const { user } = useGlobal();
  const history = useHistory();
  return (
    // Khi click vào mỗi phim sẽ chuyển đến router '/film/id' với id được lấy từ phim được truyền vào (ở đây là createAt)
    <article className="film-center" onClick={() => history.push(`/film/${film.createAt}`)}>
      <div className="img">
        <span className="evaluate">{film.evaluate}</span>
        <img src={film.image} alt={film.title} />
        {/* Kiểm tra hiện tại đã đăng nhập hay chưa? Nếu đã đăng nhập và phim này nằm trong danh sách đã xem của người dùng thì thêm phần hiển thị cho người dùng biết là đã xem phim này trước đó */}

        {user && user.watched.some((item) => item === film.createAt) && (
          <span className="watched">
            <HiEye />
            Đã Xem
          </span>
        )}
      </div>
      <div className="film-center__details">
        {/* In ra số sao của phim */}
        <Stars stars={film.stars * 1} />
        <h3 className="title">{film.title}</h3>
        <p>
          <BsTagFill className="icon-tag" />
          {film.category}
        </p>
      </div>
    </article>
  );
};

export default Film;
