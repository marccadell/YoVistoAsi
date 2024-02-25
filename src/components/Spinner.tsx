import styled, { keyframes } from 'styled-components';


const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.2); 
  border-top-color: #3498db; 
  border-radius: 50%; 
  width: 50px; 
  height: 50px; 
  animation: ${spin} 2s linear infinite; 
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
`;


const Spinner = () => (
  <SpinnerContainer>
    <StyledSpinner />
  </SpinnerContainer>
);

export default Spinner;