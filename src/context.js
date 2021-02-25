import React, { useState, useContext, useEffect, useCallback } from "react";

import db, { auth } from "./firebase";

const AppContext = React.createContext();

// Nơi phân phối các biến đến các thành phần khác của trang web.

const AppProvider = ({ children }) => {
  // Gồm biến (gọi 1 cách sang chảnh và đúng là các state của app) như user,role,films,isEdit
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [films, setFilms] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const fetchFilms = useCallback(async () => {
    // Hàm lấy dữ liệu của phim từ firestore mỗi khi có bất kỳ phim nào có thay đổi (Hàm này xử lý ngay lập tức với realtime)
    await db.collection("films").onSnapshot((snapshot) => setFilms(snapshot.docs.map((doc) => doc.data())));
  }, []);

  useEffect(() => {
    // Cú pháp kiểm tra xem user đã logout chưa mối khi refresh hoặc F5
    // Nếu chưa logout thì hiển thị lại tài khoản cho người dùng
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(`${user.uid}`)
          .get()
          .then((doc) => setUser(doc.data()));
      }
    });
    // Gọi hàm để lấy dữ liệu mỗi khi trang tải lại
    fetchFilms();
  }, [fetchFilms]);
  useEffect(() => {
    // Hàm kiểm tra mỗi khi user thay đổi thì set làm admin theo điều kiện dưới
    if (
      (user && user.uid === "qJJA1TDBfzdMXi4380OzfK5Eopw2") ||
      (user && user.uid === "PhtOZLe2I6bsJPQeEnwk9X1f3h42")
    ) {
      setRole("admin");
    } else {
      setRole("");
    }
  }, [user]);
  return (
    // Phân phối các state tới everywhere
    <AppContext.Provider value={{ user, setUser, role, films, isEdit, setIsEdit }}>{children}</AppContext.Provider>
  );
};
// Khai báo cú pháp để sử dùng state tại everywhere
export const useGlobal = () => useContext(AppContext);

export { AppProvider };
