import { listDataType } from "./types";

export const medType: listDataType[] = [
  { name: "Tablet", imageSrc: require("../assets/images/tablet.png") },
  { name: "Capsule", imageSrc: require("../assets/images/capsule.png") },
  {
    name: "Injection",
    imageSrc: require("../assets/images/injection.png"),
  },
  {
    name: "Procedures",
    imageSrc: require("../assets/images/procedures.png"),
  },
  { name: "Drops", imageSrc: require("../assets/images/drops.png") },
  { name: "Liquid", imageSrc: require("../assets/images/liquid.png") },
  {
    name: "Ointment/Cream/Gel",
    imageSrc: require("../assets/images/ointment.png"),
  },
  { name: "Spray", imageSrc: require("../assets/images/spray.png") },
];

// export const mealTime: listDataType[] = [
//   {
//     name: "Before meals",
//     imageSrc: require("../assets/images/tablet.png"),
//   },
//   {
//     name: "After meals",
//     imageSrc: require("../assets/images/tablet.png"),
//   },
//   { name: "With food", imageSrc: require("../assets/images/tablet.png") },
//   {
//     name: "Doesn't matter",
//     imageSrc: require("../assets/images/tablet.png"),
//   },
// ];

export const doseTime: string[] = [
  "Before meals",
  "After meals",
  "With food",
  "Doesn't matter",
];
