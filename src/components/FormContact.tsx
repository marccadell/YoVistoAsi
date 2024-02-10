import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";


const FormContainer = styled.form`
    display: block;
    background-color: var(--clr-form-bg);
    box-shadow: 1px 1px 3px 2px #ddd;
    margin: 40px auto;
    max-width: 600px;
    max-height: 700px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 15px;

    @media screen and (max-width: 648px) and (min-width: 500px) {
        max-width: 400px;
    }
`;

const Title = styled.h1`
    font-size: 3.2rem;
    font-weight: bold;
    padding: 20px;
    text-align: center;
`;

const Input = styled.input`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 10px auto;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #ddd;

    &:focus {
        outline: none;
        border-color: var(--clr-form-primary);
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
`;

const ButtonBox = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const Button = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    margin-top: 10px;
    font-size: 12px;
    cursor: pointer;
    min-width: 15%;
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

    &:focus {
        outline: none;
        border-color: var(--clr-form-primary);
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
`;

// Corregir 
const FormContact: React.FC = () => {

    const [data, setData] = useState({ name: "", email: "", phone: "", message: "" });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const contactCollection = collection(db, 'Contacta');

        try {
            // Agregar datos a la colección 'Contact'
            await addDoc(contactCollection, {
                name: data.name,
                email: data.email,
                phone: data.phone,
                message: data.message
            });

            // Limpiar el formulario después de enviar
            setData({ name: '', email: '', phone: '', message: '' });
            alert('¡Datos enviados correctamente!');
        } catch (error) {
            alert('Error al enviar los datos', error);
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Title>Contacta <span>Aquí</span></Title>
            <Input type="text" name="name" id="" value={data.name} placeholder="Escribe tu nombre" />
            <Input type="email" name="email" id="" value={data.email} placeholder="ejemplo@gmail.com" />
            <Input type="phone" name="phone" id="" value={data.phone} placeholder="+34" />
            <TextArea name="message" id="" value={data.message} placeholder="Escribe aquí..." />
            <ButtonBox><Button type="submit">Enviar</Button></ButtonBox>
        </FormContainer>
    );
};

// Hasta aquí
// Gracias mejor profe del mundo

export default FormContact;
