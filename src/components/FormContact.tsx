import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const FormContainer = styled.form`
  display: block;
  background-color: var(--clr-form-bg);
  box-shadow: 1px 1px 3px 2px #ddd;
  margin: 40px auto;
  max-width: 600px;
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
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
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
  &:focus {
    outline: none;
    border-color: var(--clr-form-primary);
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const FormContact = () => {
    const [data, setData] = useState({ name: "", email: "", phone: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  
    useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsUserLoggedIn(true);
        } else {
          setIsUserLoggedIn(false);
          toast.info("Debes iniciar sesión para enviar un mensaje.");
        }
      });
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!isUserLoggedIn) {
        toast.error("Debes iniciar sesión para enviar este formulario.");
        return;
      }

      setLoading(true);
        if (!data.name || !data.email || !data.phone || !data.message) {
            toast.error("Por favor, rellena todos los campos.");
            setLoading(false);
            return;
        }

        try {
            await addDoc(collection(db, 'Contacta'), { ...data });
            setData({ name: '', email: '', phone: '', message: '' });
            toast.success('¡Datos enviados correctamente!');
        } catch (error) {
            toast.error('Error al enviar los datos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Title>Contacta <span>Aquí</span></Title>
            <Input type="text" name="name" value={data.name} placeholder="Escribe tu nombre" onChange={handleChange} />
            <Input type="email" name="email" value={data.email} placeholder="ejemplo@gmail.com" onChange={handleChange} />
            <Input type="tel" name="phone" value={data.phone} placeholder="+34" onChange={handleChange} />
            <TextArea name="message" value={data.message} placeholder="Escribe aquí..." onChange={handleChange} />
            <ButtonBox><Button type="submit" disabled={!isUserLoggedIn || loading}>Enviar</Button></ButtonBox>
        </FormContainer>
    );
};

export default FormContact;