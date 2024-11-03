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

export const timeState = atom({
  key: "timeState",
  default: 2,
  effects: [localStorageEffect("time")],
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
  effects: [localStorageEffect("stage")],
});

export const timeSelector = selector({
  key: "timeSelector",
  get: ({ get }) => {
    const time = get(timeState);
    const MIN = String(Math.floor(time / 60) % 60).padStart(2, "0");
    const SEC = String(Math.floor(time % 60)).padStart(2, "0");
    return {
      MIN,
      SEC,
    };
  },
});
