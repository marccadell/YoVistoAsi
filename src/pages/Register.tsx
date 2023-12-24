import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import axios from '../api/axios';
import { Link } from "react-router-dom";

const USER_REGEX = /^[azA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/Register';


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
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 40px auto;
`;

// Titulos
const Titulo = styled.h1`
    font-weight: bold;
    font-size: 33px;
    text-align: center;
    margin-bottom: 30px;
`;

// Mensaje de error
const ErrorMessage = styled.p`
    color: var(--clr-error);
    font-size: 0.9em;
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
`;

// Instrucciones para el usuario
const InstructionUser = styled.p`
    display: none; // Oculta por defecto
    background-color: white;
    padding: 10px;
    margin-top: 90px;
    border: 1px solid var(--clr-form-primary);
    border-radius: 4px;
    font-size: 0.8em;
    position: absolute;
    z-index: 1; // Para asegurarse de que aparece sobre otros elementos
    // Ajusta el posicionamiento según sea necesario
`;

const InstructionPass = styled.p`
    display: none; // Oculta por defecto
    background-color: white;
    padding: 10px;
    margin-top: 100px;
    border: 1px solid var(--clr-form-primary);
    border-radius: 4px;
    font-size: 0.8em;
    position: absolute;
    z-index: 1; // Para asegurarse de que aparece sobre otros elementos
    // Ajusta el posicionamiento según sea necesario
`;

const InstructionConfirmPass = styled.p`
    display: none; // Oculta por defecto
    background-color: white;
    padding: 10px;
    margin-top: 80px;
    border: 1px solid var(--clr-form-primary);
    border-radius: 4px;
    font-size: 0.8em;
    position: absolute;
    z-index: 1; // Para asegurarse de que aparece sobre otros elementos
    // Ajusta el posicionamiento según sea necesario
`;

// Contenedor Input DIV
const InputContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:hover ${InstructionUser}, &:focus-within ${InstructionUser} {
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

    &:hover ${InstructionConfirmPass}, &:focus-within ${InstructionConfirmPass} {
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

// Button únicamente
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

// Dialogo para usuarios ya registrados
const AlreadyRegistered = styled.p`
    text-align: center;
    font-size: 10px;
    color: var(--clr-form-primary);
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
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response.data);
            const accessToken = response.data.accessToken; 
            console.log(accessToken);
            console.log(JSON.stringify(response));
            setSuccess(true);
        } catch (err: any) { 
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
            if (errRef.current) {
                errRef.current.focus();
            }
        }
    }

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

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
            {success ? (  // Actualizar a posteriori cuando haga el back.
                <RegisterSection>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </RegisterSection>
            ) : (
                <BgContainer>
                    <RegisterSection>
                        <ErrorMessage ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                            {errMsg}
                        </ErrorMessage>
                        <Titulo>Registro</Titulo>
                        <RegisterForm onSubmit={handleSubmit}>
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
                                <InstructionUser id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon className="icon-instruccion" icon={faInfoCircle} />
                                    De 4 a 24 caracteres.<br />
                                    Se permiten letras, números, guiones bajos y guiones.
                                </InstructionUser>
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
                                <InstructionPass id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon className="icon-instruccion" icon={faInfoCircle} />
                                    De 8 a 24 caracteres.<br />
                                    Debe incluir letras mayúsculas y minúsculas, un número y un caracter
                                    especial.<br />
                                    Caracteres especiales permitidos: !@#$%
                                </InstructionPass>
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
                                <InstructionConfirmPass id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon className="icon-instruccion" icon={faInfoCircle} />
                                    Debe coincidir con el primer campo de entrada de contraseña.
                                </InstructionConfirmPass>
                            </InputContainer>

                            <ButtonBox>
                                <Button disabled={!validName || !validPwd || !validMatch ? true : false}>
                                    Registrate
                                </Button>
                            </ButtonBox>

                            <AlreadyRegistered>
                                <Link to="/Login">Ya estas registrado?
                                    <span className="line">
                                        <a href="#"> <b>Iniciar Sesión</b></a>
                                    </span>
                                </Link>
                            </AlreadyRegistered>
                        </RegisterForm>
                    </RegisterSection>
                </BgContainer>
            )}
        </>
    )
}

export default Register;