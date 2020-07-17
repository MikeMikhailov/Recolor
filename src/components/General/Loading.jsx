import React from 'react';
import { Spin } from 'antd.macro';
import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

function Loading() {
  return (
    <Container>
      <Spin size="large" />
    </Container>
  );
}

export default Loading;
