import { useRecoilValue } from "recoil";
import { stageState } from "../atom";
import styled from "styled-components";
import { Svg } from "./StateBtn";

interface IInfoProps {
    reset: {
        stage: Function,
        time: Function,
        timerState: Function
    }
}

export default function StageInfo({ reset }: IInfoProps) {
    const { stage, time, timerState } = reset;
    const { ROUND, GOAL } = useRecoilValue(stageState);
    const onReset = () => {
        stage({
            ROUND: 0,
            GOAL: 0
        });
        time(10);
        timerState(false);
    }
    return (
        <Wrapper>
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
            </StateWrapper>
            <ResetWrapper>
                <Svg onClick={onReset} whileHover={{ scale: 1.2 }} data-slot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"></path>
                </Svg>
            </ResetWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`  
  width: 50vw;
  text-align: center;
  color: white;
  font-size: 24px;
  display: flex;

  flex-direction: column;
`;

const StateWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;

    font-weight: 800;
    font-size: 36px;
    line-height: 24px;

    color: #ff9a3c;
`

const ResetWrapper = styled.div`
`;
