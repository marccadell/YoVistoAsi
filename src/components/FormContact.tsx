import React from "react";
import styled from "styled-components";


const FormContainer = styled.form`
    display: block;
    background-color: var(--clr-form-bg);
    box-shadow: 1px 1px 3px 2px #ddd;
    margin: 40px auto;
    max-width: 600px;
    max-height: 700px;
    padding: 20px;
    box-sizing: border-box;

    @media screen and (max-width: 648px) and (min-width: 500px) {
        max-width: 400px;
    }
`;

const Title = styled.h1`
    padding: 10px;
    width: 90%;
`;

const Input = styled.input`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 10px auto;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #ddd;
`;

const Button = styled.button`
    height: 25px;
    width: 60px;
    margin: 10px 18px;
    align-items: center;
    border: none;
    border-radius: 0%;
    background-color: rgb(29, 185, 237);
    color: #fff;

    @media screen and (max-width: 648px) and (min-width: 500px) {
        margin: 10px 8px;
    }
`;

const TextArea = styled.textarea`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 25vh;
    margin: 10px auto;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    font-family: "Roboto", sans-serif;
`;

const FormContact: React.FC = () => {
    return (
        <FormContainer>
            <Title>
                Contacta <span>Aquí</span>
            </Title>
            <Input type="text" name="name" id="" placeholder="Escribe tu nombre" />
            <Input type="email" name="email" id="" placeholder="ejemplo@gmail.com" />
            <Input type="phone" name="phone" id="" placeholder="+34" />
            <TextArea name="message" id="" placeholder="Escribe aquí..." />
            <Button type="submit">Enviar</Button>
        </FormContainer>
    );
};

export default FormContact;
