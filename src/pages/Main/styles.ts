import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  padding: 20px;
  width: 90vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Map = styled.canvas`
  border: 10px solid #CCC;
  width: 500px;
  height: 500px;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  image-rendering: -moz-crisp-edges;
`;
