import React, { useState } from "react";
import "./Home.scss";
import RightContent from "../../components/Home/RightContent/RightContent";
import LeftContent from "../../components/Home/LeftContent/LeftContent";
import Search from "../../components/Search/Search";

//Trang hiển thị trang chủ, ở đây sử dụng LeftContent và RightContent đã được tạo ở components có route là ('/')

const Home = () => {
  const [value, setValue] = useState("");
  return (
    <>
      {/* Tất cả các thành phần của home được import vào từ components đã định nghía trước đó */}
      <Search setValue={setValue} value={value} />
      <div className="home">
        <RightContent value={value} setValue={setValue} />
        <LeftContent />
      </div>
    </>
  );
};

export default Home;
