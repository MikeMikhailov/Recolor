import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import { secondaryTextColor, primaryColor } from '../../constants/globalColors';

const TooSmallContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  text-align: center;
  background-color: #ffffff;
  & > *:not(:last-child) {
    margin-bottom: 50px;
  }
`;

const TooSmallHeading = styled.h1`
  color: ${primaryColor};
  font-size: 3rem;
  margin-top: 0px;
`;

const TooSmallSubheading = styled.h1`
  color: ${secondaryTextColor};
  font-size: 1.5rem;
  margin-bottom: 0px;
  margin-top: 0px;
`;

function TooSmallMessage() {
  const history = useHistory();
  return (
    <TooSmallContainer>
      <TooSmallHeading>Sorry, palette studio is only available on larger screens</TooSmallHeading>
      <TooSmallHeading>(𐐫𐑥𐑯𐐫)</TooSmallHeading>
      <TooSmallSubheading>Consider visiting this page on a table or PC</TooSmallSubheading>
      <Button type="primary" onClick={() => history.push('/')}>
        Go back to homepage
      </Button>
    </TooSmallContainer>
  );
}

export default TooSmallMessage;
