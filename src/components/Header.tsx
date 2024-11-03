import styled from "styled-components";

export default function Header() {
    return (
        <Wrapper>
            <Title>Pomodoro</Title>
        </Wrapper>
    )
}

const Title = styled.p`
  font-size: 48px;
  font-weight: 800;

  color: white;
`;

const Wrapper = styled.div`
  height: 200px;
`;