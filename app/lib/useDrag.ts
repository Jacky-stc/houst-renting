import React, { useEffect, useRef, useState } from "react";
import { useRentingData } from "../store/useRentingData";

const useDrag = (targetRef: React.RefObject<HTMLElement>) => {
  const touchStartX = useRef(0);
  const [translateX, setTranslateX] = useState(0);
  const [height, setHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const rentingData = useRentingData((s) => s.rentingData);

  useEffect(() => {
    function handleTouchStart(e: TouchEvent) {
      console.log("start");
      touchStartX.current = e.touches[0].clientX;
      setIsDragging(true);
    }

    function handleTouchMove(e: TouchEvent) {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - touchStartX.current;
      if (deltaX > 0) {
        // console.log(deltaX);
        e.preventDefault();
        setTranslateX(deltaX);
      }
    }

    function handleTouchEnd() {
      console.log("end");
      if (translateX > 200) {
        // 滑超過 100px，觸發關閉
        // onClose();
        useRentingData.setState({ rentingData: null });
      } else {
        // 沒滑夠，回到原位
        console.log("test");
        setTranslateX(0);
      }
      setIsDragging(false);
    }
    const currentTarget = targetRef.current;
    if (currentTarget === null) return;
    currentTarget.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    currentTarget.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    currentTarget.addEventListener("touchend", handleTouchEnd);

    return () => {
      currentTarget.removeEventListener("touchstart", handleTouchStart);
      currentTarget.removeEventListener("touchmove", handleTouchMove);
      currentTarget.removeEventListener("touchend", handleTouchEnd);
    };
  }, [targetRef, isDragging, translateX]);

  useEffect(() => {
    setTranslateX(0);
    console.log(targetRef.current?.clientHeight);
    setHeight(targetRef.current?.clientHeight || 0);
  }, [rentingData, targetRef]);

  return { translateX, isDragging, height };
};

export default useDrag;
