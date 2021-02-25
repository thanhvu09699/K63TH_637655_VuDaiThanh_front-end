import React from "react";
import "./ModalFilm.scss";
import { FaTimes } from "react-icons/fa";

//Nơi tạo ra cửa sổ để người dùng xem phim (khung phim dùng thẻ iframe để nhúng)

const ModalFilm = ({ setModal, url }) => {
  return (
    <section className="modal-film-overlay">
      <button className="close-modal" onClick={() => setModal(false)}>
        <FaTimes /> Đóng
      </button>
      {/* Phần link sẽ được nhúng ở đây */}
      <iframe src={url} allowFullScreen className="film"></iframe>
    </section>
  );
};

export default ModalFilm;
