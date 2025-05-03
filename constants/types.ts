import { signInWithRedirect } from "firebase/auth";

export interface listDataType {
  name: string;
  imageSrc: number; // Type for require() result
}

export interface headerProps {
  title: string;
  color: string;
  iconName: "close" | "settings-outline" | "medkit-outline";
  onPressIcon: () => void;
}

export interface formDataType {
  name: { value: string; isValid: boolean };
  type: { value: string; isValid: boolean };
  dose: { value: string; isValid: boolean };
  when: { value: string; isValid: boolean };
  startDate: { value: Date | string; isValid: boolean };
  endDate: { value: Date | string; isValid: boolean };
  comment: { value: string; isValid: boolean };
  reminders: { value: { id: number; time: Date }[]; isValid: boolean };
}

// export interface medDataType {
//   name?: string;
//   type?: string;
//   dose?: string;
//   when?: string;
//   startDate?: Date;
//   endDate?: Date;
//   comment?: string;
//   reminders?: { id: number; time: Date }[];
//   dates?: string[];
//   docID: string;
//   userEmail?: string;
// }
