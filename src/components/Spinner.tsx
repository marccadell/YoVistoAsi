import { ClipLoader } from "react-spinners";
import styled, { keyframes } from 'styled-components';

// Animación de giro para el spinner
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled component para el Spinner
const StyledSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.2); // Borde ligero para el efecto de "casi completo"
  border-top-color: #3498db; // Color del borde superior
  border-radius: 50%; // Hace el div completamente redondo
  width: 50px; // Ancho del spinner
  height: 50px; // Alto del spinner
  animation: ${spin} 2s linear infinite; // Aplica la animación de giro
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // O ajusta según necesites para que el spinner se centre en tu contenido
`;

const Spinner = () => (
  <SpinnerContainer>
    <StyledSpinner />
  </SpinnerContainer>
);

export default Spinner;