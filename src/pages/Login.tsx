import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import styled from "styled-components";

interface LoginInputs {
    username: string;
    password: string;
}

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 520px;
`;

const LoginTitle = styled.h1`
  font-weight: bold;
  font-size: 33px;
  text-align: center;
  margin-bottom: 30px;
`;

const LoginLabel = styled.label`
  font-weight: bold;
`;

const LoginForm = styled.form`
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
`;

const InputBox = styled.div`
  margin-bottom: 20px;

  input {
    width: 95%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;

    &:focus {
      outline: none;
      border: 1px solid #007bff;
    }
  }

  label {
    display: block;
    margin-bottom: 5px;
  }
`;

const ButtonBox = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 15px;
  font-size: 18px;
  cursor: pointer;
`;

const NoRegistered = styled.p`
    text-align: center;
    font-size: 10px;
    color: var(--clr-form-primary);
    margin-top: 15px;
`;

const BgContainer = styled.div`
  background-image: url("src/assets/img/bg-login.jpg");
  background-size: cover;
  background-repeat: no-repeat;

`;

function Login() {
    const [inputs, setInputs] = useState<LoginInputs>({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    if (!login) {
        console.error("Login function is not defined");
        return <div>Error: login function not available</div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await login(inputs);
            if (res.data.success) {
                navigate("/");
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };


    return (
        <BgContainer>
        <LoginContainer>
            <LoginForm autoComplete="off" onSubmit={handleSubmit}>
            <LoginTitle>Iniciar Sesión</LoginTitle>
                <InputBox>
                    <LoginLabel>Username</LoginLabel>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        required
                    />
                </InputBox>
                <InputBox>
                    <LoginLabel>Password</LoginLabel>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        required
                    />
                </InputBox>
                <ButtonBox>
                    <SubmitButton type="submit">Login</SubmitButton>
                </ButtonBox>
                
                <NoRegistered>
                    <Link to="/Register">No tienes cuenta? <b>Registrate aquí.</b></Link>
                </NoRegistered>
            </LoginForm>
        </LoginContainer>
        </BgContainer>
    );
}

export default Login;
