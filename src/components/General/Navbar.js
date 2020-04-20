import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  height: 5vh;
  min-height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  @media (min-width: 500px) {
    padding: 0 50px;
  }
`;

export const Navigation = styled.nav`
  align-items: center;
  display: flex;
  & > *:not(:last-child) {
    margin-right: 50px;
  }
`;
