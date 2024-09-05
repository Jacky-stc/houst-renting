import moment from "moment";

/**
 * 產生日曆事件連結的工具類別
 */
export class Calendar {
  /**
   * @param {Object} event - 事件資訊
   * @param {String} event.DTSTART - 開始時間 (格式：YYYYMMDDTHHMMSSZ)
   * @param {String} event.DTEND - 結束時間 (格式：YYYYMMDDTHHMMSSZ)
   * @param {String} event.SUMMARY - 標題
   * @param {String} event.DESCRIPTION - 描述
   * @param {String} event.TZID - 時區 (例如：Asia/Taipei)
   */
  constructor(event) {
    this.event = {
      ...event,
      DTSTART: this.formatTime(event.DTSTART),
      DTEND: this.formatTime(event.DTEND),
    };
  }

  /**
   * 轉換時間格式
   * @param {String} time - 原始時間
   * @returns {String} - 轉換後的時間
   */
  formatTime(time) {
    console.log(moment(time).utc().format("YYYYMMDDTHHmmss") + "Z");
    return moment(time).utc().format("YYYYMMDDTHHmmss") + "Z";
  }

  /**
   * 產生 iCal 格式的文字
   * @returns {String} - iCal 格式的文字
   */
  generateICS() {
    const { DTSTART, DTEND, SUMMARY, DESCRIPTION, TZID } = this.event;
    const icsMSG = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART;VALUE=DATE;TZID=${TZID}:${DTSTART}
DTEND;VALUE=DATE;TZID=${TZID}:${DTEND}
SUMMARY:${SUMMARY}
DESCRIPTION:${DESCRIPTION}
END:VEVENT
END:VCALENDAR`;
    return "data:text/calendar;charset=utf-8," + encodeURIComponent(icsMSG);
  }
  generateWEBCAL() {
    const { DTSTART, DTEND, SUMMARY, DESCRIPTION, TZID } = this.event;
    const icsMSG = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART;VALUE=DATE;TZID=${TZID}:${DTSTART}
DTEND;VALUE=DATE;TZID=${TZID}:${DTEND}
SUMMARY:${SUMMARY}
DESCRIPTION:${DESCRIPTION}
END:VEVENT
END:VCALENDAR`;
    return "webcal:text/calendar;charset=utf-8," + encodeURIComponent(icsMSG);
  }

  /**
   * 產生 Google Calendar 的連結
   * @returns {String} - Google Calendar 的連結
   */
  generateGoogleCalendarURL() {
    const { DTSTART, DTEND, SUMMARY, DESCRIPTION, TZID } = this.event;
    return `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${DTSTART}/${DTEND}&text=${encodeURIComponent(SUMMARY)}&details=${encodeURIComponent(DESCRIPTION)}&ctz=${encodeURIComponent(TZID)}`;
  }

  /**
   * 產生 Yahoo Calendar 的連結
   * @returns {String} - Yahoo Calendar 的連結
   */
  generateYahooCalendarURL() {
    const { DTSTART, DTEND, SUMMARY, DESCRIPTION, TZID } = this.event;
    return `https://calendar.yahoo.com/?v=60&TYPE=20&VIEW=d&ST=${DTSTART}&ET=${DTEND}&TITLE=${encodeURIComponent(SUMMARY)}&desc=${encodeURIComponent(DESCRIPTION)}&vtz=${encodeURIComponent(TZID)}`;
  }
}
