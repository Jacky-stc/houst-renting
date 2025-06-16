import React, { useMemo } from "react";

const Snow = React.memo(() => {
  const snowArr = useMemo(() => Array(15).fill("❅"), []);

  // 在 useMemo 中生成每個雪花的隨機樣式
  const snowStyles = useMemo(() => {
    return snowArr.map(() => ({
      left: `${Math.random() * 100}vw`, // 隨機水平位置
      animationDelay: `${Math.random() * 5}s`, // 隨機動畫延遲
      animationDuration: `${5 + Math.random() * 5}s`, // 隨機動畫時間
      fontSize: `${Math.random()}rem`, // 隨機大小
    }));
  }, [snowArr]);
  return (
    <div className="snowFlakes" aria-hidden={true}>
      {snowArr.map((snow, index) => (
        <div
          className="snowflake"
          key={index}
          style={snowStyles[index]} // 使用預生成的樣式
        >
          {snow}
        </div>
      ))}
    </div>
  );
});

Snow.displayName = "Snow";

export default Snow;
