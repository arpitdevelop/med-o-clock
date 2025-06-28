import { Timestamp } from "firebase/firestore";
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

// get array of dates of current week
// export const dateToWeekRange = () => {
//   const currDate = new Date();
//   const weekStart = moment(currDate).day(1).format("YYYY-MM-DD");
//   const weekEnd = moment(currDate).day(7).format("YYYY-MM-DD");
//   const weekDates = [];
//   let loopDate = new Date(weekStart);
//   while (loopDate <= new Date(weekEnd)) {
//     weekDates.push(moment(loopDate).format("YYYY-MM-DD"));
//     loopDate.setDate(loopDate.getDate() + 1);
//   }
//   console.log(weekDates);
//   console.log(moment().format("hh:mm"));

//   return weekDates;
// };

export const dateToWeekRange = () => {
  const currDate = moment();

  // Set Monday as the first day of the week
  const weekStart = currDate.clone().startOf("isoWeek"); // ISO week starts on Monday
  // const startOfWeek = moment(currDate).startOf("week").add(1, "day"); // Monday

  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    weekDates.push(weekStart.clone().add(i, "days").format("YYYY-MM-DD"));
  }
  return weekDates;
};

// get an array of every date between startDate and endDate
export const startToEndDates = (startDate: Date, endDate: Date) => {
  const start = moment(startDate, "YYYY-MM-DD");
  const end = moment(endDate, "YYYY-MM-DD");
  const dates = [];
  while (start.isSameOrBefore(end)) {
    dates.push(start.format("YYYY-MM-DD"));
    start.add(1, "days");
  }
  return dates;
};

export const fbTimestampToTime = (timestamp: Timestamp) => {
  const jsDate = new Timestamp(
    timestamp.seconds,
    timestamp.nanoseconds
  ).toDate();
  return moment(jsDate).format("h:mm a");
};
