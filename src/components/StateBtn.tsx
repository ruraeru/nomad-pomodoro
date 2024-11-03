import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { timerActiveState } from "../atom";

export default function StateBtn() {
    const [timerActive, setTimerActive] = useRecoilState(timerActiveState);
    const onClick = () => {
        setTimerActive(prev => !prev);
    }
    return (
        <div>
            <Svg whileHover={{ scale: 1.2 }} onClick={onClick} data-slot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                {timerActive ? (
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm5-2.25A.75.75 0 0 1 7.75 7h.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-4.5Zm4 0a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-4.5Z"></path>
                ) : (
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z"></path>
                )}
            </Svg>
        </div>
    )
}

export const Svg = styled(motion.svg)`
  width: 80px;
  height: 80px;
  
  border-radius: 100px;
  
  color: white;
  text-align: center;
`;