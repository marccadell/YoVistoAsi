import React from "react"
import { Navigate, Route } from "react-router";
import styled from "styled-components"

const BgContainer = styled.div`
    background-image: url("src/assets/img/bg-termspage.jpg");
    background-size: cover;
    background-repeat: no-repeat;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
`;

const TermsBox = styled.div`
    margin: 80px 200px 80px 200px;
    padding: 20px;
    background-color: #ececec;
    height: auto;
    box-shadow: -1px 4px 6px 4px #606060a7;
    border-radius: 15px;

    @media screen and (max-width: 1338px) and (min-width: 1011px) {
        margin: 80px 160px 80px 160px;
    }

    @media screen and (max-width: 1011px) and (min-width: 800px) {
        margin: 80px 130px 80px 130px;
    }

    @media screen and (max-width: 799px) and (min-width: 500px) {
        margin: 80px 60px 80px 60px;
    }


`;

const Titulo = styled.h1`
    font-size: 3.6rem;
    font-weight: bold;
    padding: 20px;
    margin-top: 50px;
    font-weight: 600;

    @media screen and (max-width: 799px) and (min-width: 500px) {
        text-align: center;
    }
`;

const SubTitulo = styled.h2`
    font-size: 2.7rem;
    font-weight: bold;
    padding: 10px 20px 0px 25px;
    font-weight: 400;
`;

const Parrafo = styled.p`
    font-size: 15px;
    padding-left: 30px;
    font-weight: 300;
    margin-bottom: 30px;
    margin-right: 60px;
`;

const BoxLogo = styled.div`
    display: flex;
    justify-content: end;

    @media screen and (max-width: 799px) and (min-width: 500px) {
        justify-content: center;
    }
`;

const Logo = styled.img`
    width: 150px;
    height: auto;
    margin-top: 50px;
`;


const TermsAndConditions: React.FC = () => {

    return(
        <BgContainer>
            <Container>
                <TermsBox>
                    <Titulo>Términos y Condiciones de Uso de YoVistoAsí</Titulo>
                        <SubTitulo>1. Aceptación de los Términos</SubTitulo>
                            <Parrafo>Al acceder y utilizar el sitio web de YoVistoAsí, 
                                el usuario acepta cumplir con estos términos y condiciones.
                            </Parrafo>
                        <SubTitulo>2. Uso del Sitio Web</SubTitulo>
                            <Parrafo>El usuario se compromete a utilizar el sitio web solo para 
                                fines legales y de manera que no infrinja los derechos de, restrinja 
                                o inhiba el uso y disfrute del sitio web por parte de cualquier tercero.
                            </Parrafo>
                        <SubTitulo>3. Derechos de Propiedad Intelectual</SubTitulo>
                            <Parrafo>Todo el contenido del sitio web de YoVistoAsí, incluyendo textos, 
                                gráficos y código, está protegido por derechos de autor y es propiedad 
                                de YoVistoAsí.
                            </Parrafo>
                        <SubTitulo>4. Limitaciones de Responsabilidad</SubTitulo>
                            <Parrafo>YoVistoAsí no será responsable de cualquier daño resultante del uso o 
                                la incapacidad de usar el sitio web.
                            </Parrafo>
                        <SubTitulo>5. Enlaces a Terceros</SubTitulo>
                            <Parrafo>Este sitio web puede contener enlaces a sitios web operados por otras 
                                partes, sobre los cuales YoVistoAsí no tiene control.
                            </Parrafo>
                        <SubTitulo>6. Cambios en los Términos</SubTitulo>
                            <Parrafo>YoVistoAsí se reserva el derecho de modificar estos términos y condiciones 
                                en cualquier momento.
                            </Parrafo>
                        <SubTitulo>7. Ley Aplicable</SubTitulo>
                            <Parrafo>Estos términos y condiciones se regirán e interpretarán de acuerdo con las 
                                leyes del país de operación de YoVistoAsí.
                            </Parrafo>
                    <br></br>
                    <Titulo>Aviso de Privacidad de YoVistoAsí</Titulo>
                        <SubTitulo>1. Compromiso con la Privacidad</SubTitulo>
                            <Parrafo>En YoVistoAsí, el respeto a la privacidad y la seguridad de los datos personales
                                de nuestros usuarios es primordial.
                            </Parrafo>
                        <SubTitulo>2. Recopilación de Datos</SubTitulo>
                            <Parrafo>Recopilamos información personal como nombre, dirección de correo electrónico y 
                                otros detalles cuando los usuarios voluntariamente nos la proporcionan.
                            </Parrafo>
                        <SubTitulo>3. Uso de la Información</SubTitulo>
                            <Parrafo>La información recopilada se utiliza para mejorar la experiencia del usuario en 
                                nuestro sitio web y, en ocasiones, para enviar comunicaciones sobre servicios y ofertas.
                            </Parrafo>
                        <SubTitulo>4. Protección de la Información</SubTitulo>
                            <Parrafo>Nos comprometemos a proteger la seguridad de la información personal de nuestros usuarios.</Parrafo>
                        <SubTitulo>5. Acceso y Control de la Información Personal</SubTitulo>
                            <Parrafo>Los usuarios pueden revisar y actualizar su información personal en cualquier momento 
                                accediendo a su cuenta en el sitio web.
                            </Parrafo>
                        <SubTitulo>6. Cambios en el Aviso de Privacidad</SubTitulo>
                            <Parrafo>YoVistoAsí se reserva el derecho de modificar este aviso de privacidad en cualquier momento.</Parrafo>
                            
                        <BoxLogo><Logo src="/src/assets/img/logo.webp"/></BoxLogo>    
                </TermsBox>
            </Container>
        </BgContainer>
    )

}


export default TermsAndConditions;
