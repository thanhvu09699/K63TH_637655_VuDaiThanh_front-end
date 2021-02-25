import React, { useState, useEffect } from "react";
import { useGlobal } from "../../context";
import "./Manager.scss";
import db from "../../firebase";

// Trang này là nơi chứa form để thêm phim và chỉnh sửa phim , chỉ có tài khoản admin mới có thể truy cập vào trang này có route là ('/manager')

const Manager = () => {
  const { role, isEdit, setIsEdit, films } = useGlobal();
  const [filmData, setFilmData] = useState({
    title: "",
    url: "",
    image: "",
    stars: "",
    category: "",
    episode: "",
    directors: "",
    country: "",
    description: "",
    createAt: "date",
    upcoming: "",
    evaluate: 10,
    isMultiEp: "",
  });

  useEffect(() => {
    // Kiểm tra xem hiện tại có phải là ở trạng thái cập nhật phim hay không
    if (isEdit) {
      // Nếu là trạng thái cập nhật phim thì set các trường input bằng giá trị của phim đang cập nhật
      const film = films.find((item) => item.createAt === isEdit);
      setFilmData(film);
    }
  }, []);
  const handleChange = (e) => {
    setFilmData({ ...filmData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    // Hàm sử lý khi submit form thêm phim mới hoặc cập nhật phim cũ
    e.preventDefault();
    let id;
    const timer = new Date().getTime().toString();
    // Nếu trang thái cập nhật thì id của phim bằng id cũ của phim
    if (isEdit) {
      id = isEdit;
    } else {
      // Nếu không phải trạng thái cập nhật thì id được tạo mới bằng thời gian hiện tại (Lấy đơn vị là mili giây)
      id = timer;
    }
    // Kiểm tra xem tất cả các trường input đã được nhập và có giá trị hay chưa
    if (Object.values(filmData).every((item) => item !== "")) {
      // Lọc các đường dẫn youtube để nhúng vào phim (vì nếu lấy link trực tiếp từ youtube sẽ bị chặn)
      const regex = /youtube.com\/watch\?v=/g;
      // Cú pháp trên phim trên firestore
      db.collection("films")
        .doc(`${id}`)
        .set({
          ...filmData,
          createAt: id,
          url: filmData.url.match(regex) ? filmData.url.replace(regex, "youtube.com/embed/") : filmData.url,
        });
      setFilmData({
        title: "",
        url: "",
        image: "",
        stars: "",
        category: "",
        episode: "",
        directors: "",
        country: "",
        description: "",
        createAt: "date",
        upcoming: "",
        evaluate: 10,
        isMultiEp: "",
      });
      setIsEdit(null);
      // Khi thêm xong thì scroll về đầu form
      window.scrollTo({ top: 0, left: 0 });
    } else {
      alert("Phải điền đầy đủ các trường !");
    }
  };
  // Chỉ user admin mới hiển thị ra form nhập phim khi vào router này
  if (role === "admin") {
    return (
      <section className="manager">
        <div className="form-input">
          <form onSubmit={handleSubmit}>
            <label htmlFor="url" className="text-input">
              <input
                type="text"
                name="url"
                id="url"
                value={filmData.url}
                onChange={handleChange}
                placeholder="Đường dẫn video phim (ví dụ : https://video-phim-hay.mp4)"
              />
            </label>
            <label htmlFor="title" className="text-input">
              <input
                type="text"
                name="title"
                id="title"
                value={filmData.title}
                onChange={handleChange}
                placeholder="Tên Phim (ví dụ : Gái Già Lắm Chiêu)"
              />
            </label>
            <label htmlFor="image" className="text-input">
              <input
                type="text"
                name="image"
                id="image"
                value={filmData.image}
                onChange={handleChange}
                placeholder="Đường dẫn ảnh đại diện phim  (ví dụ : https://image-phim-hay.jpg)"
              />
            </label>
            <label htmlFor="stars" className="text-input">
              <input
                type="number"
                name="stars"
                id="stars"
                value={filmData.stars}
                onChange={handleChange}
                placeholder="Số sao của phim (ví dụ: 4)"
                min="1"
                max="5"
              />
            </label>
            <label htmlFor="category" className="text-input">
              <input
                type="text"
                name="category"
                id="category"
                value={filmData.category}
                onChange={handleChange}
                placeholder="Thể loại phim (ví dụ: Phim ngôn tình)"
              />
            </label>
            <label htmlFor="episode" className="text-input">
              <input
                type="number"
                name="episode"
                id="episode"
                value={filmData.episode}
                onChange={handleChange}
                placeholder="Số tập phim (ví dụ : 3)"
                min="1"
              />
            </label>
            <label htmlFor="directors" className="text-input">
              <input
                type="text"
                name="directors"
                id="directors"
                value={filmData.directors}
                onChange={handleChange}
                placeholder="Đạo diễn (ví dụ: Fujitora)"
              />
            </label>
            <label htmlFor="country" className="text-input">
              <input
                type="text"
                name="country"
                id="country"
                value={filmData.country}
                onChange={handleChange}
                placeholder="Nước sản xuất (ví dụ : Việt Nam)"
              />
            </label>
            <label htmlFor="description" className="text-input">
              <textarea
                type="text"
                name="description"
                id="description"
                value={filmData.description}
                onChange={handleChange}
                placeholder="Mô tả phim (ví dụ : Cua Lại Vợ Bầu là một phim lẻ thuộc thể loại Hài hước nhưng không kém phần cảm xúc , nhiều lúc làm người xem phải khóc theo. Phim được thực hiện bởi đạo diễn Nhất Trung. Một đạo diễn rất nổi tiếng mà chắc hẳn fan của Phim Việt Nam chắc ai cũng biết. Phim với sự tham gia của dàn diễn viên nổi tiếng Showbiz Việt như Trấn Thành...)"
                rows="10"
              />
            </label>
            <div className="radio-group">
              <label className="radio-input">
                <input
                  type="radio"
                  name="upcoming"
                  checked={filmData.upcoming === "false"}
                  value="false"
                  onChange={handleChange}
                />{" "}
                Đã ra mắt
              </label>
              <label className="radio-input">
                <input
                  type="radio"
                  name="upcoming"
                  checked={filmData.upcoming === "true"}
                  value="true"
                  onChange={handleChange}
                />{" "}
                Chưa ra mắt
              </label>
            </div>
            <div className="radio-group">
              <label className="radio-input">
                <input
                  type="radio"
                  name="isMultiEp"
                  checked={filmData.isMultiEp === "false"}
                  value="false"
                  onChange={handleChange}
                />{" "}
                Phim Lẻ
              </label>
              <label className="radio-input">
                <input
                  type="radio"
                  name="isMultiEp"
                  checked={filmData.isMultiEp === "true"}
                  value="true"
                  onChange={handleChange}
                />{" "}
                Phim Bộ
              </label>
            </div>
            <button type="submit" className="submit-btn">
              {isEdit ? "Cập Nhật Phim" : "Thêm Phim"}
            </button>
          </form>
        </div>
      </section>
    );
  } else {
    // Các user khác nếu cố vào router này sẽ hiển thị không tìm thấy trang
    return (
      <div className="manager">
        <p className="not-found">Page not found</p>
      </div>
    );
  }
};

export default Manager;
