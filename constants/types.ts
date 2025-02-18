export interface listDataType {
  name: string;
  imageSrc: number; // Type for require() result
}

export interface headerProps {
  title: string;
  color: string;
  iconName: "close" | "settings-outline";
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
