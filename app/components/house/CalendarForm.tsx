import { RentingData } from '@/app/types/search';
import { memo, useState } from 'react';
import { Calendar } from '../calendar';
import DatePicker from 'react-datepicker';
import { DateSVG } from '../common/SVG';
import { FaRegCalendarAlt } from 'react-icons/fa';

const hourArray: string[] = [];
const minuteArray: string[] = ['00', '10', '20', '30', '40', '50'];
for (let i = 1; i <= 24; i++) {
  hourArray.push(i.toString());
}

interface CalendarFormProps {
  rentingData: RentingData;
  showCalendarForm: boolean;
}

export const CalendarForm = memo(({ rentingData, showCalendarForm }: CalendarFormProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [reservationMinute, setReserVationMinute] = useState<string>('00');
  const [reservationHour, setReserVationHour] = useState<string>(new Date().getHours().toString());
  const [reservationName, setReservationName] = useState<string>('');
  const [reservationText, setReservationText] = useState<string>('');

  const handleAddCalendar = () => {
    const selectedDateString = selectedDate.toLocaleDateString().split('/');
    const selectedYear = selectedDateString[0];
    const selectedMonth = selectedDateString[1];
    const selectedDay = selectedDateString[2];
    const reservationHourPlus = (parseInt(reservationHour) + 1).toString();

    const event = {
      DTSTART: `${selectedYear}${selectedMonth.length > 1 ? selectedMonth : '0' + selectedMonth}${selectedDay.length > 1 ? selectedDay : '0' + selectedDay}T${reservationHour.length > 1 ? reservationHour : '0' + reservationHour}${reservationMinute}00`, // 開始時間 (格式：YYYYMMDDTHHMMSSZ)
      DTEND: `${selectedYear}${selectedMonth.length > 1 ? selectedMonth : '0' + selectedMonth}${selectedDay.length > 1 ? selectedDay : '0' + selectedDay}T${reservationHourPlus.length > 1 ? reservationHourPlus : '0' + reservationHourPlus}${reservationMinute}00`, // 結束時間 (格式：YYYYMMDDTHHMMSSZ)
      SUMMARY: `${rentingData.編號} ${reservationName}預約看房`, // 標題
      DESCRIPTION: rentingData.對話要點 + '，' + reservationText, // 描述,
      LOCATION: rentingData.地址,
      TZID: 'Asia/Taipei', // 時區
    };
    //   // 建立 Calendar 實例
    const calendar = new Calendar(event);
    // 生成 Google Calendar 連結
    const googleCalendarLink = calendar.generateGoogleCalendarURL();
    const googleLinkContainer = document.createElement('a');
    googleLinkContainer.href = googleCalendarLink;
    googleLinkContainer.target = '_blank';
    googleLinkContainer.click();
  };
  return (
    <div
      className={`${showCalendarForm ? 'block bg-white dark:bg-[#0f0f14fa] z-50' : 'hidden bg-white dark:bg-[#0f0f14fa] md:block'} border rounded border-sky-200 p-4 w-[300px] absolute top-1/2 left-1/2 md:top-auto md:left-auto -translate-y-1/2 -translate-x-1/2 md:translate-x-0 md:translate-y-0 md:relative md:w-auto text-sm`}
      data-testid="calendar-form"
    >
      <div>
        <DatePicker
          showIcon
          toggleCalendarOnIconClick
          selected={selectedDate}
          onChange={(date) => {
            if (date) {
              setSelectedDate(date);
            }
          }}
          icon={<DateSVG />}
        />
      </div>
      <div>
        <select
          className="inline-block border border-gray-300 text-gray-900 text-sm rounded-lg  py-1.5 px-2.5 my-1"
          onChange={(e) => {
            console.log(e.target.value);
            setReserVationHour(e.target.value);
          }}
          value={reservationHour}
        >
          {hourArray.map((hour) => (
            <option key={hour}>{hour}</option>
          ))}
        </select>
        <span className="mx-1">時</span>
        <select
          className="inline-block border border-gray-300 text-gray-900 text-sm rounded-lg py-1.5 px-2.5 my-1"
          onChange={(e) => {
            setReserVationMinute(e.target.value);
          }}
          value={reservationMinute}
        >
          {minuteArray.map((minute) => (
            <option key={minute}>{minute}</option>
          ))}
        </select>
        <span className="mx-1">分</span>
      </div>
      <div className="my-2">
        <span className="mr-2 text-sm">姓名</span>
        <input
          type="name"
          className="text-base border rounded inline=block w-1/2 focus:outline-sky-300 focus:outline-1 pl-1"
          onChange={(e) => {
            setReservationName(e.target.value);
          }}
          value={reservationName}
        ></input>
      </div>
      <div className="my-2">
        <span className="mr-2 text-sm flex-1 text-nowrap">備註</span>
        <input
          type="text"
          className="text-base border rounded inline-block w-3/4 focus:outline-sky-300 focus:outline-1 pl-1"
          onChange={(e) => {
            setReservationText(e.target.value);
          }}
          value={reservationText}
        ></input>
      </div>
      <button
        className="block  border rounded border-gray-500 py-2 md:py-1 px-8 mx-auto mt-8 md:mt-4 hover:bg-slate-200"
        onClick={handleAddCalendar}
      >
        <FaRegCalendarAlt className="inline-block mr-2"></FaRegCalendarAlt>
        <span className="text-sm">添加到行事曆</span>
      </button>
    </div>
  );
});

CalendarForm.displayName = 'CalendarForm';
