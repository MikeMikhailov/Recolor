import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  height: 5vh;
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
`;

export const Navigation = styled.nav`
  align-items: center;
  display: flex;
  & > *:not(:last-child) {
    margin-right: 30px;
  }
`;