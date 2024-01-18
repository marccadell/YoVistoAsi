import React from "react"
import styled from "styled-components"
import FormContact from "../components/FormContact"

const ContainerPrimary = styled.div`

`;

const Container = styled.div`
    border: 2px solid #505050ae;
    margin: 20px 30px;
    padding: 20px;
    background-color: #bdbdbd13;
`;


const Titulo = styled.h1`
    font-size: 3.2rem;
    font-weight: bold;
    padding: 20px;
    box-shadow: 1px 1px 3px 2px #ddd;
    text-align: center;
`;

const SubTitulo = styled.h2`
    font-size: 20px;
    font-weight: bold;
`;

const Parrafo = styled.p`
    font-size: 15px;
`;


const Contact: React.FC = () => {

    return(
        <ContainerPrimary>
            <Titulo>Dispones de alguna duda o pregunta?</Titulo>
            <FormContact></FormContact>
        </ContainerPrimary>
    )

}


export default Contact;
