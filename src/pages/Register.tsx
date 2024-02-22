import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

import { createUserWithEmailAndPassword, Auth } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import styled from 'styled-components';
import { toast } from "react-toastify";

// Background del Contenedor Raiz
const BgContainer = styled.div`
  background-image: url("src/assets/img/bg-register.png");
  background-size: cover;
  background-repeat: no-repeat;
  padding: 1px;
`;

// Contenedor Raiz
const RegisterSection = styled.section`
    background-color: var(--clr-form-bg);
    padding: 30px 40px 30px 40px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    margin: 70px auto;
`;

// Titulos
const Titulo = styled.h1`
    font-weight: bold;
    font-size: 40px;
    text-align: center;
    padding: 20px 0 20px 0;
`;

// Formulario
const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 10px;
    max-width: 400px;
    width: 100%;
`;

// Etiquetas
const Label = styled.label`
    font-weight: bold;
    font-size: 13px;
    margin: 3px 0 7px 0;
`;


// Instrucciones del input email
const InstructionEmail = styled.p`
    display: none;
    background-color: white;
    padding: 10px;
    margin-top: 90px;
    border: 1px solid var(--clr-form-primary);
    border-radius: 4px;
    font-size: 0.8em;
    position: absolute;
    z-index: 1;
`;

// Instrucciones del input password
const InstructionPass = styled.p`
    display: none; 
    background-color: white;
    padding: 10px;
    margin-top: 100px;
    border: 1px solid var(--clr-form-primary);
    border-radius: 4px;
    font-size: 0.8em;
    position: absolute;
    z-index: 1; 
`;

// Contenedor Input DIV
const InputContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:hover ${InstructionEmail}, &:focus-within ${InstructionEmail} {
        display: flex;
        .icon-instruccion {
            margin-right: 4px;
        }
    }

    &:hover ${InstructionPass}, &:focus-within ${InstructionPass} {
        display: flex;
        .icon-instruccion {
            margin-right: 4px;
        }
    }
    
`;

// Input dentro del InputContainer
const Input = styled.input`
    width: 95%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;

    &:focus {
        outline: none;
        border-color: var(--clr-form-primary);
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
`;

// Box del Button (Contenedor)
const ButtonBox = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

// Button
const Button = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    margin-top: 10px;
    font-size: 18px;
    cursor: pointer;
    width: 30%;

`;

// Recuadro para usuarios ya registrados
const AlreadyRegistered = styled.p`
    text-align: center;
    font-size: 12px;
    color: var(--clr-form-primary);
`;

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastName2, setLastName2] = useState('');
    const [sex, setSex] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Crear usuario en Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
            // Agregar datos adicionales a Firestore
            const user = userCredential.user;
    
            // Asegúrate de que la colección 'Usuarios' exista en tu Firestore
            // y de que tienes los permisos necesarios para escribir en ella.
            await setDoc(doc(db, 'Usuarios', user.uid), {
                email,
                name,
                lastName,
                lastName2,
                sex,
            });
    
            toast.success('Usuario registrado con UID:', user.uid);
    
            // Redirigir a la página principal (o a cualquier otra) después del registro
            navigate('/'); // Asegúrate de que esta ruta es correcta y lleva a donde deseas
        } catch (error) {
            toast.error("Error al crear la cuenta: ", error.message);
            // Aquí puedes manejar el error, como mostrar un mensaje al usuario
        }
    };

    return (
        <BgContainer>
            <RegisterSection>
                <Titulo>Registro</Titulo>
                <RegisterForm onSubmit={handleSubmit}>
                    <InputContainer>
                        <Label>Correo Electrónico *</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <InstructionEmail id="uidnote" className={email ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon className="icon-instruccion" icon={faInfoCircle} />
                                Introduzca su correo electrónico para proceder con el registro.
                        </InstructionEmail>
                    </InputContainer>
                    <InputContainer>
                        <Label>Password *</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            required
                        />
                        <InstructionPass id="uidnote" className={password ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon className="icon-instruccion" icon={faInfoCircle} />
                                De 8 a 24 caracteres.<br />
                                Debe incluir letras mayúsculas y minúsculas, un número y un caracter
                                especial. 
                        </InstructionPass>
                    </InputContainer>
                    <InputContainer>
                        <Label>Nombre *</Label>
                        <Input
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nombre"
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Label>Primer Apellido *</Label>
                        <Input
                            type="lastname"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="1er Apellido"
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Label>Segundo Apellido</Label>
                        <Input
                            type="lastname2"
                            value={lastName2}
                            onChange={(e) => setLastName2(e.target.value)}
                            placeholder="2nd Apellido (Opcional)"
                        />
                    </InputContainer>
                    <InputContainer>
                        <Label>Género</Label>
                        <Input
                            type="sex"
                            value={sex}
                            onChange={(e) => setSex(e.target.value)}
                            placeholder="Indique su Género (Opcional)"
                        />
                    </InputContainer>
                            
                    <ButtonBox><Button type="submit">Registrar</Button></ButtonBox>
                    <AlreadyRegistered>
                        ¿Ya tienes una cuenta? <Link to="/Login">Iniciar sesión</Link>
                    </AlreadyRegistered>
                </RegisterForm>
            </RegisterSection>

        </BgContainer>
        
    );
};

export default Register;


{/*
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth as Auth, email, password);
            // Redirigir a la página de tareas después del registro
            navigate('/');
        } catch (error) {
            console.error("Error al crear la cuenta: ", error.message);
            // Aquí puedes manejar el error, como mostrar un mensaje al usuario
        }
    };
*/}