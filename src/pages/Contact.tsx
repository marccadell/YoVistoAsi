import React from "react"
import styled from "styled-components"
import FormContact from "../components/FormContact"


const BgContainer = styled.div`
    background-image: url("src/assets/img/bg-team.jpg");
    background-size: cover;
    background-repeat: no-repeat;
`;

const Container = styled.div`
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 2em;
`;

const BoxTitulo = styled.div`
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
    background-color: white;
`;

const Titulo = styled.h1`
    font-size: 3.2rem;
    font-weight: bold;
    padding: 20px;
    box-shadow: 1px 1px 3px 2px #ddd;
    text-align: center;
`;


const Contact: React.FC = () => {

    return(
        <BgContainer>
            <Container>
                <BoxTitulo><Titulo>Dispones de alguna duda o pregunta?</Titulo></BoxTitulo>
                <FormContact></FormContact>
            </Container>
        </BgContainer>
        
    )

}


export default Contact;
