import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { timeSelector } from "../atom";
import React from "react";

function Card() {
    const { MIN, SEC } = useRecoilValue(timeSelector);
    console.log(MIN, SEC)
    return (
        <Wrapper>
            <CardWrapper key={MIN + Math.PI} variants={CardVariatns} initial="start"
                animate="end">
                <p>{MIN}</p>
            </CardWrapper>
            <Colon>:</Colon>
            <CardWrapper key={SEC} variants={CardVariatns} initial="start"
                animate="end">
                <p>{SEC}</p>
            </CardWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`;

const CardWrapper = styled(motion.div)`
  width: 200px;
  height: 300px;
  background-color: white;
  text-align: center;
  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #ffc93c;
  font-size: 100px;
  font-weight: 800;
`;

const Colon = styled.div`
    color: rgba(255, 255, 255, 0.5);
    font-size: 100px;
    margin: 0 10px 0 10px;
`;

const CardVariatns = {
    start: {
        scale: 0.1
    },
    end: {
        scale: 1
    }
}

export default React.memo(Card);