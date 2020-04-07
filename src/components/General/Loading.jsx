import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loading() {
  return (
    <Container>
      <Spin size="large" />
    </Container>
  );
}

export default Loading;
