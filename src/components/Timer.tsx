import { useRecoilState, useSetRecoilState } from "recoil";
import { stageState, timerActiveState, timeState } from "../atom";
import { useCallback, useEffect } from "react";

export default function Timer() {
    const setStage = useSetRecoilState(stageState);
    const [time, setTime] = useRecoilState(timeState);
    const [timerActive, setTimerActive] = useRecoilState(timerActiveState);
    const handleTimeComplete = useCallback(() => {
        setTimerActive(false);

        setStage((prev) => {
            if (prev.GOAL === 12) {
                return {
                    ...prev,
                    GOAL: 0
                }
            }
            if (prev.ROUND < 4) {
                return {
                    ...prev,
                    ROUND: prev.ROUND + 1
                }
            }
            return {
                ROUND: 0,
                GOAL: prev.GOAL + 1
            }
        });
        setTime(10);
    }, [setStage, setTime, setTimerActive]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | undefined;
        if (timerActive && time > 0) {
            timeoutId = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);
        }
        if (time <= 0) handleTimeComplete();
        return () => {
            if (timeoutId) clearInterval(timeoutId);
        }
    }, [handleTimeComplete, setTime, time, timerActive]);

    return null;
}
