import {useRef, useState, useEffect } from "react";
import {faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import axios from '../api/axios';

const USER_REGEX = /^[azA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/Register';

const colors = {
    primary: '#007bff', // Color primario
    error: '#dc3545',   // Color para mensajes de error
    success: '#28a745', // Color para mensajes de éxito
    text: '#333',       // Color principal del texto
    background: '#f8f9fa', // Color de fondo
};

const font = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const Section = styled.section`
    font-family: ${font};
    background-color: ${colors.background};
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 40px auto;
`;

const Titulo = styled.h1`
    text-align: center;
    font-size: 35px;
    font-weight: bold;
`;

const Parrafo = styled.p`
    text-align: center;
    font-size: 20px;
`;


// Mensaje de error
const ErrorMessage = styled.p`
    color: ${colors.error};
    font-size: 0.9em;
`;

// Formulario
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

// Etiquetas
const Label = styled.label`
    color: ${colors.text};
    font-size: 1em;
    font-weight: bold;
    text-align: center;
`;

// Instrucciones para el usuario
const Instruction1 = styled.p`
    display: none; // Oculta por defecto
    background-color: white;
    padding: 10px;
    margin-top: 90px;
    border: 1px solid ${colors.primary};
    border-radius: 4px;
    font-size: 0.8em;
    position: absolute;
    z-index: 1; // Para asegurarse de que aparece sobre otros elementos
    // Ajusta el posicionamiento según sea necesario
`;

const Instruction2 = styled.p`
    display: none; // Oculta por defecto
    background-color: white;
    padding: 10px;
    margin-top: 100px;
    border: 1px solid ${colors.primary};
    border-radius: 4px;
    font-size: 0.8em;
    position: absolute;
    z-index: 1; // Para asegurarse de que aparece sobre otros elementos
    // Ajusta el posicionamiento según sea necesario
`;

const Instruction3 = styled.p`
    display: none; // Oculta por defecto
    background-color: white;
    padding: 10px;
    margin-top: 80px;
    border: 1px solid ${colors.primary};
    border-radius: 4px;
    font-size: 0.8em;
    position: absolute;
    z-index: 1; // Para asegurarse de que aparece sobre otros elementos
    // Ajusta el posicionamiento según sea necesario
`;

const InputContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:hover ${Instruction1}, &:focus-within ${Instruction1} {
        display: flex;
        .icon-instruccion {
            margin-right: 4px;
        }
    }

    &:hover ${Instruction2}, &:focus-within ${Instruction2} {
        display: flex;
        .icon-instruccion {
            margin-right: 4px;
        }
    }

    &:hover ${Instruction3}, &:focus-within ${Instruction3} {
        display: flex;
        .icon-instruccion {
            margin-right: 4px;
        }
    }
    
`;

const Input = styled.input`
    padding: 7px 50px 7px 0;
    border: 1px solid ${colors.primary};
    border-radius: 4px;
    font-size: 1em;

    &:focus {
        outline: none;
        border-color: ${colors.primary};
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
`;

// Botón de envío
const Button = styled.button`
    background-color: ${colors.primary};
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: darken(${colors.primary}, 10%);
    }

    &:disabled {
        background-color: grey;
        cursor: default;
    }
`;

// Mensaje para usuarios ya registrados
const AlreadyRegistered = styled.p`
    text-align: center;
    font-size: 0.9em;
    color: ${colors.text};
`;

const BgContainer = styled.div`
  background-image: url("src/assets/img/bg-login.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  padding: 1px;

`;

const Register: React.FC = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState<string>('');
    const [validName, setValidName] = useState<boolean>(false);
    const [userFocus, setUserFocus] = useState<boolean>(false);

    const [pwd, setPwd] = useState<string>('');
    const [validPwd, setValidPwd] = useState<boolean>(false);
    const [pwdFocus, setPwdFocus] = useState<boolean>(false);

    const [matchPwd, setMatchPwd] = useState<string>('');
    const [validMatch, setValidMatch] = useState<boolean>(false);
    const [matchFocus, setMatchFocus] = useState<boolean>(false);

    const [errMsg, setErrMsg] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const version1 = USER_REGEX.test(user);
        const version2 = PWD_REGEX.test(pwd);
        if (!version1 || !version2) {
            setErrMsg("Invalid Entry");
            return;
        }
        
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response));
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            }
            else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } 
            else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }

    }

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd == matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])
 

    return (
        <>
        {success ? (
            <Section>
                <h1>Success!</h1>
                <p>
                    <a href="#">Sign In</a>
                </p>
            </Section>
        ) : (
        <BgContainer>

        <Section>
            <ErrorMessage ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
            </ErrorMessage>
            <Titulo>Registro</Titulo>
            <Form onSubmit={handleSubmit}>
                <InputContainer>
                <Label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                        {/*<FontAwesomeIcon icon={faCheck} />*/}
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                        {/*<FontAwesomeIcon icon={faTimes} />*/}
                    </span>
                </Label>
                <Input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <Instruction1 id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon className="icon-instruccion" icon={faInfoCircle} />
                    De 4 a 24 caracteres.<br />
                    Se permiten letras, números, guiones bajos y guiones.
                </Instruction1>
                </InputContainer>

                <InputContainer>
                <Label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                        {/*<FontAwesomeIcon icon={faCheck} />*/}
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        {/*<FontAwesomeIcon icon={faTimes} />*/}
                    </span>
                </Label>
                <Input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <Instruction2 id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon className="icon-instruccion" icon={faInfoCircle} />
                    De 8 a 24 caracteres.<br />
                    Debe incluir letras mayúsculas y minúsculas, un número y un caracter
                    especial.<br />                
                    Caracteres especiales permitidos: !@#$% 
                    {/* <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span> <span aria-label="hastag">#</span>
                    <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    */}
                    </Instruction2>
                </InputContainer>

                <InputContainer>
                <Label htmlFor="confirm_pwd">
                    Confirm Password:
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                        {/*<FontAwesomeIcon icon={faCheck} />*/}
                    </span>
                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                        {/*<FontAwesomeIcon icon={faTimes} />*/}
                    </span>
                </Label>
                <Input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <Instruction3 id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon className="icon-instruccion" icon={faInfoCircle} />
                    Debe coincidir con el primer campo de entrada de contraseña.
                </Instruction3>
                </InputContainer>

                <Button disabled={!validName || !validPwd || !validMatch ? true : false}>
                    Registrate
                </Button>
                <AlreadyRegistered>
                    Ya estas registrado?<br />
                    <span className="line">
                        <a href="#">Inicia Sesión</a>
                    </span>
                </AlreadyRegistered>
            </Form>
        </Section>
        </BgContainer>
        )}
        </>
    )
}

export default Register;