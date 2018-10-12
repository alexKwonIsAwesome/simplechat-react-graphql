import React from 'react';
import styled from 'styled-components';

class Landing extends React.Component {
  handleButtonClick = () => {
    const nickname = window.prompt('닉네임을 입력해 주세요');
    this.props.history.push('/chat', { nickname });
    
  }

  render() {
    return (
      <Wrapper>
        <Title>Alex's 심플 채팅</Title>
        <Button onClick={this.handleButtonClick}>입장하기</Button>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1.6rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 5rem;
`;

const Button = styled.button`
  font-family: 'NanumSquare';
  width: 100%;
  background-color: #333;
  border: 0rem;
  border-radius: 0.3rem;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.5rem;
`;

export default Landing;