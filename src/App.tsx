import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { stageState, timerActiveState, timeState } from "./atom";
import { useEffect, useState } from "react";

const Card = styled(motion.div)`
  width: 200px;
  height: 300px;
  background-color: white;
  text-align: center;
  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: tomato;
  font-size: 100px;
  font-weight: 800;
`
const Wrapper = styled.div` 
  width: 100vw;
  height: 100vh;
  background-color: tomato;

  display: flex;
  flex-direction: column;
  
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`;

const Svg = styled.svg`
  /* background-color: rgba(0, 0, 0, 0.2); */
  border-radius: 100px;
  width: 80px;
  height: 80px;
  /* padding: 5px; */
  color: white;
  text-align: center;
`;

const StateWrapper = styled.div`  
  width: 50vw;
  text-align: center;
  color: white;
  font-size: 24px;
  display: flex;
  justify-content: space-around;
`;

const Title = styled.p`
  font-size: 48px;
  font-weight: 800;

  color: white;
`;

const Header = styled.div`
  height: 200px;
  display: flex;
  /* align-items: center; */
`

function App() {
  const [stage, setStage] = useRecoilState(stageState);
  const [time, setTime] = useRecoilState(timeState);
  const [timerActive, setTimerActive] = useRecoilState(timerActiveState);
  const { ROUND, GOAL } = stage;

  useEffect(() => {
    const timeLeft = setInterval(() => {
      if (timerActive) setTime((prevTime) => prevTime - 1000);
    }, 1000);

    if (time <= 0) {
      clearInterval(timeLeft);
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
      setTime(0.1 * 60 * 1000);
    }

    return () => {
      clearInterval(timeLeft)
    };
  }, [GOAL, ROUND, setStage, setTime, setTimerActive, time, timerActive]);

  const onClick = () => {
    setTimerActive(prev => !prev);
  }
  return (
    <Wrapper>
      <Header>
        <Title>Pomodoro</Title>
      </Header>
      <CardWrapper>
        <Card key={Math.floor(time / (1000 * 60)) % 60} initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}>
          <p>{String(Math.floor(time / (1000 * 60)) % 60).padStart(2, "0")}</p>
        </Card>
        <div>
          <p style={{
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "100px",
            margin: "0 10px 0 10px",
          }}>
            :
          </p>
        </div>
        <Card key={time} initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}>
          <p>{String(Math.floor(time / 1000) % 60).padStart(2, "0")}</p>
        </Card>
      </CardWrapper>
      {
        timerActive ? (
          <Svg onClick={onClick} data-slot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm5-2.25A.75.75 0 0 1 7.75 7h.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-4.5Zm4 0a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-4.5Z"></path>
          </Svg>
        ) : (
          <Svg onClick={onClick} data-slot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z"></path>
          </Svg>
        )
      }
      <StateWrapper>
        <div>
          <p>{ROUND}/4</p>
          &nbsp;
          <p>ROUND</p>
        </div>
        <div>
          <p>{GOAL}/12</p>
          &nbsp;
          <p>GOAL</p>
        </div>
        <button onClick={() => {
          setStage({ ROUND: 0, GOAL: 0 })
          setTime(25 * 60 * 1000)
        }}>Reset</button>
      </StateWrapper>
    </Wrapper >
  );
}

export default App;
