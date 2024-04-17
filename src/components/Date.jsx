import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const CurrentDate = () => {
  const today = dayjs(new Date());
  const [currentDate, setCurrentDate] = useState(
    dayjs(today).format("DD.MM.YYYY - HH:mm:ss")
  );

  useEffect(() => {
    setInterval(() => {
      setCurrentDate(dayjs(today.now).format("DD.MM.YYYY - HH:mm:ss"));
    }, 1000);
  }, [currentDate]);
  return (
    <div className="pl-3 pt-3 text-white font-bold text-2xl">{currentDate}</div>
  );
};

export default CurrentDate;
