import { atom } from "recoil";

export const codeAtom = atom({
  key: "code",
  default: "",
});

export const studentLocation = atom({
  key: "studentLocation",
  default: { latitude: 0, longitude: 0 },
});

export const studentInfo = atom({
  key: "studentInfo",
  default: {},
});
export const currentclassInfo = atom({
  key: "currentclassInfo",
  default: [],
});
