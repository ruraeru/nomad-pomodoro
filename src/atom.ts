import { atom, selector } from "recoil";

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: string, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

interface ITime {
  hours: number;
  MIN: number;
  SEC: number;
}

export const timeState = atom({
  key: "timeState",
  default: 0.1 * 60 * 1000,
  //   effects: [localStorageEffect("time")],
});

export const timerActiveState = atom({
  key: "timerActiveState",
  default: false,
});

export interface IStage {
  ROUND: number;
  GOAL: number;
}

export const stageState = atom<IStage>({
  key: "stageState",
  default: {
    ROUND: 0,
    GOAL: 0,
  },
  //   effects: [localStorageEffect("stage")],
});

export const timeSelector = selector({
  key: "timeSelector",
  get: ({ get }) => {
    const stage = get(stageState);
  },
});
