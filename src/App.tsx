import styled from "styled-components";
import Card from "./components/Card";
import StageInfo from "./components/StageInfo";
import Header from "./components/Header";
import StateBtn from "./components/StateBtn";
import Timer from "./components/Timer";

export default function App() {
  return (
    <Wrapper>
      <Header />
      <Card />
      <StateBtn />
      <Timer />
      <StageInfo />
    </Wrapper>
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