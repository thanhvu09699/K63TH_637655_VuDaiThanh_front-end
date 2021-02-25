import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { useParams, useHistory } from "react-router-dom";
import { BsTagFill } from "react-icons/bs";
import { HiHeart, HiEye } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";

import db from "../../firebase";
import "./Film.scss";
import Stars from "../../components/utils/Stars/Stars";
import ListFilm from "../../components/utils/ListFilm/ListFilm";
import ModalFilm from "../../components/Modal/ModalFilm";
import { useGlobal } from "../../context";

//Trang hiện thị chi tiết bộ phim đã chọn có route là ('/film/:id').

const Film = () => {
  const [modal, setModal] = useState(false);
  const [film, setFilm] = useState({});
  const { films, setUser, user, role, setIsEdit } = useGlobal();

  // Lấy id của phim từ trên thanh đường dẫn của web
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    // Mỗi khi chuyển sang phim khác sẽ scroll trang web lên đầu trang
    if (films) {
      setFilm(films.find((film) => film.createAt === id));
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [films, id]);
  const handleFav = () => {
    // Hàm xử khi người dùng click vào yêu thích :Nếu đang đăng nhập và tìm thấy phim trong yêu thích thị óa phim đó khỏi danh sách phim yêu thích
    if (user && user.fav.find((item) => item === id)) {
      // cú pháp xóa phim khỏi danh sách yêu thích tại local
      setUser((prev) => ({ ...prev, fav: prev.fav.filter((item) => item !== id) }));
      // Cú pháp để xóa phim khỏi danh sách yêu thích trên firestore của firebase bằng uid của user và id của phim
      db.collection("users")
        .doc(`${user.uid}`)
        .update({ fav: user.fav.filter((item) => item !== id) });
    } else if (user) {
      // Nếu phim không có trong danh sách yêu thích của người dùng hiện tại thì thêm phim đó vào : cú pháp tương tự ở trên
      setUser((prev) => ({ ...prev, fav: [...prev.fav, id] }));
      db.collection("users")
        .doc(`${user.uid}`)
        .update({ fav: firebase.firestore.FieldValue.arrayUnion(id) });
    }
  };
  const handleWatch = () => {
    // Hàm xử lý khi người dùng click xem phim:Cú pháp tương tự với thêm yêu thích (nhưng khi click xem phim thì người dùng chỉ thêm phim vào danh sách đã xem mà không thể xóa nó đi được)

    if (user && !user.watched.find((item) => item === id)) {
      // Tương tự yêu thích
      setModal(!modal);
      setUser((prev) => ({ ...prev, watched: [...prev.watched, id] }));
      db.collection("users")
        .doc(`${user.uid}`)
        .update({ watched: firebase.firestore.FieldValue.arrayUnion(id) });
    } else if (!user) {
      // Nếu chưa đăng nhập thì chuyển qua router account để người dùng đăng nhập
      history.push("/account");
      alert("Phải Đăng Nhập Để Xem !");
    } else if (user) {
      setModal(!modal);
    }
  };
  const handleEdit = () => {
    // Hàm xử xử lý khi click cập nhật(set id hiện tại bằng id của phim để lấy tất cả thông tin của phim từ danh sách phim)
    setIsEdit(id);
    // Chuyển đến router manager để cập nhật thông tin phim
    history.push("/manager");
  };
  const handleRemove = () => {
    // Hàm xử lý xóa phim : xóa phim ở trên firestore
    db.collection("films")
      .doc(`${id}`)
      .delete()
      .then(() => {
        alert("Xóa Phim Thành Công!");
      })
      .catch((err) => console.log(err));
    // Xóa xong chuyển về router home
    history.push("/");
  };
  if (!film || !films) return <></>;
  return (
    <section className="film">
      {/* Ẩn hiện màn hình xem phim */}
      {modal && <ModalFilm setModal={setModal} url={film.url} />}
      <div className="film__introduce">
        <div className="film__introduce-left">
          <img src={film.image} alt={film.title} />
        </div>
        <div className="film__introduce-right">
          <h3 className="title">{film.title}</h3>
          <div className="evaluate">
            <Stars stars={film.stars * 1} />
            <p>
              <BsTagFill className="icon-tag" />
              {film.category}
            </p>
          </div>
          <div className="btn-group">
            <button
              className={`add-fav ${user && user.fav.find((item) => item === id) ? "disable" : ""}`}
              onClick={handleFav}
            >
              <HiHeart /> {user && user.fav.find((item) => item === id) ? "Hủy Thích" : "Yêu Thích"}
            </button>

            <button className="watch" onClick={handleWatch}>
              <HiEye /> {film.upcoming === "false" ? "Xem Phim" : "Trailer"}
            </button>
            {/* Nếu là admin thì mới hiển thị phần này */}
            {role === "admin" && (
              <>
                <button className="watch" onClick={handleEdit}>
                  <BiEdit /> Cập Nhật
                </button>
                <button className="add-fav" onClick={handleRemove}>
                  <FaTrash /> Xóa Phim
                </button>
              </>
            )}
          </div>
          <div className="details-option">
            <p>
              <span className="bold">Trạng thái:</span>
              <span className="orange-text"> {film.upcoming === "true" ? "Chưa ra mắt" : "Hoàn tất"}</span>
            </p>
            <p>
              <span className="bold">Đạo diễn:</span> <span className="orange-text">{film.directors},</span>
            </p>
            <p>
              <span className="bold">Quốc gia:</span> <span className="orange-text">{film.country},</span>
            </p>
            <p>
              <span className="bold">Năm:</span> <span className="orange-text">2020</span>
            </p>
            <p>
              <span className="bold">Thời lượng:</span>{" "}
              <span className="orange-text">{film.isMultiEp === "true" ? "45" : "90"} phút/tập</span>
            </p>
            <p>
              <span className="bold">Số tập:</span> <span className="orange-text">{film.episode} tập</span>
            </p>
            <p>
              <span className="bold">Chất lượng:</span> <span className="orange-text">Bản đẹp</span>
            </p>
            <p>
              <span className="bold">Độ phân giải:</span> <span className="orange-text">HD 720p</span>
            </p>
            <p>
              <span className="bold">Ngôn ngữ:</span> <span className="orange-text">Phụ đề Việt</span>
            </p>
            <p>
              <span className="bold">Thể loại:</span> <span className="orange-text">{film.category}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="film__detail">{film.description}</div>
      {/* In ra danh sách phim  có cùng loại phim (như cùng là phim lẻ hoặc phim bộ)*/}
      <ListFilm type="row" films={films.filter((item) => item.isMultiEp === film.isMultiEp)} />
    </section>
  );
};

export default Film;
