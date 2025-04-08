import moment from "moment";

export const formatDate = (timestamp: number) => {
  return new Date(timestamp).setHours(0, 0, 0, 0);
};

export const formatDateToString = (date: Date) => {
  return moment(date).format("ll");
};

export const formatDateToStringFull = (date: Date) => {
  return moment(date).format("L");
};

export const formatTimeToString = (time: Date) => {
  return moment(time).format("h:mm a");
};

export const formatTimeToHHMM = (time: Date) => {
  return moment(time).format("HH:mm");
};

export const formatDateToYYYYMMDD = (date: Date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const onlyDateDigit = (dateString: string) => {
  let date = new Date(dateString);
  return moment(date).format("D");
};

// get array of dates of current week
export const dateToWeekRange = () => {
  const currDate = new Date();
  const weekStart = moment(currDate).day(1).format("YYYY-MM-DD");
  const weekEnd = moment(currDate).day(7).format("YYYY-MM-DD");
  const weekDates = [];
  let loopDate = new Date(weekStart);
  while (loopDate <= new Date(weekEnd)) {
    weekDates.push({
      date: moment(loopDate).format("YYYY-MM-DD"),
      day: moment(loopDate).format("dddd"),
    });
    loopDate.setDate(loopDate.getDate() + 1);
  }
  return weekDates;
};

// get an array of every date between startDate and endDate
export const startToEndDates = (startDate: Date, endDate: Date) => {
  const start = moment(startDate, "MM/DD/YYYY");
  const end = moment(endDate, "MM/DD/YYYY");
  const dates = [];
  while (start.isSameOrBefore(end)) {
    dates.push(start.format("MM/DD/YYYY"));
    start.add(1, "days");
  }
  return dates;
};
