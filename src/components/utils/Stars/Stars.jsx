import React from "react";
import { HiStar } from "react-icons/hi";
import "./Stars.scss";

// Dùng để in ra số sao của mỗi bộ phim bằng tham số được truyền vào là 1 con số từ 1-5.

const Stars = ({ stars }) => {
  let result = [];
  // hàm để in ra số sao : được truyền vào là số sao của phim ,những ngôi sao nào có index nhỏ hơn hoặc bằng số sao của phim sẽ được in màu vàng( ví dụ: phim có 3 sao thì những ngôi sao có index nhỏ hơn hoặc bằng 3 sẽ được in màu vàng và những ngôi sao còn lại sẽ để màu xám)

  const renderStars = () => {
    for (let i = 1; i <= 5; i++) {
      if (i <= stars) {
        result.push("active");
      } else {
        result.push("");
      }
    }
  };
  renderStars();
  return (
    <div className="stars">
      {result.map((item, index) => (
        <HiStar className={`star ${item}`} key={index} />
      ))}
    </div>
  );
};

export default Stars;
