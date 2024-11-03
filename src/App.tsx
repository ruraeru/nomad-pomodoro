import { useRecoilState } from "recoil";
import styled from "styled-components";
import { stageState, timerActiveState, timeState } from "./atom";
import { useEffect } from "react";
import Card from "./components/Card";
import StageInfo from "./components/StageInfo";
import Header from "./components/Header";
import StateBtn from "./components/StateBtn";

export default function App() {
  const [stage, setStage] = useRecoilState(stageState);
  const [time, setTime] = useRecoilState(timeState);
  const [timerActive, setTimerActive] = useRecoilState(timerActiveState);
  const { ROUND, GOAL } = stage;

  useEffect(() => {
    const timeLeft = setInterval(() => {
      if (timerActive) setTime((prevTime) => prevTime - 1);
    }, 1000);

    if (time <= 0) {
      clearInterval(timeLeft);
      setTimerActive(false);
      if (GOAL === 12) setStage((prev) => {
        return {
          ...prev,
          GOAL: 0
        }
      })
      else {
        if (ROUND < 4) {
          setStage((prev) => {
            return {
              ...prev,
              ROUND: prev.ROUND + 1
            }
          })
        }
        else {
          setStage((prev) => {
            return {
              ROUND: 0,
              GOAL: prev.GOAL + 1
            }
          })
        }
      }
      setTime(10);
    }
    return () => {
      clearInterval(timeLeft)
    };
  }, [GOAL, ROUND, setStage, setTime, setTimerActive, time, timerActive]);

  return (
    <Wrapper>
      <Header />
      <Card />
      <StateBtn />
      <StageInfo reset={{ stage: setStage, time: setTime, timerState: setTimerActive }} />
    </Wrapper >
  );
}

const Wrapper = styled.div` 
  width: 100vw;
  height: 100vh;
  background-color: #155263;

  display: flex;
  flex-direction: column;
  
  justify-content: center;
  align-items: center;
`;