import React from "react";

const Snow = () => {
  const snowArr = Array(60).fill("❅");
  return (
    <div className="snowFlakes" aria-hidden={true}>
      {snowArr.map((snow, index) => (
        <div
          className="snowflake"
          key={index}
          style={{
            left: `${Math.random() * 100}vw`, // 隨機水平位置
            animationDelay: `${Math.random() * 5}s`, // 隨機動畫延遲
            animationDuration: `${5 + Math.random() * 5}s`, // 隨機動畫時間
            fontSize: `${Math.random()}rem`,
          }}
        >
          {snow}
        </div>
      ))}
    </div>
  );
};

export default Snow;
