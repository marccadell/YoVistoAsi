import React from "react"
import styled from "styled-components"


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

const ContainerSecondary = styled.div`
    padding: 20px;
    background-color: #ececec;
    box-shadow: -1px 4px 6px 4px #606060a7;
    border-radius: 15px;
    margin: 70px auto;
`;


const TeamSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 2em;
    align-items: center;
`;

const TeamMembers = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 30px;
    text-align: center;
    margin: 26px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: var(--br);
    transition: var(--ts);
    background-color: var(--clr-box-bg);
    width: 199px;
    
`;

const Titulo = styled.h1`
    font-size: 3.2rem;
    font-weight: bold;
    padding: 20px;

    @media screen and (max-width: 1096px) and (min-width: 500px) {
        text-align: center;
    }
    
`;

const SubTitulo = styled.h2`
    font-size: 20px;
    font-weight: 600;
`;

const Parrafo = styled.p`
    font-size: 15px;
    font-weight: 400;
`;

const Imagen = styled.img`
    width: 154px;
    height: auto;
    border-radius: 50%;
    object-fit: cover;
`;

const BoxLogo = styled.div`
    display: flex;
    justify-content: end;

    @media screen and (max-width: 770px) and (min-width: 500px) {
        justify-content: center;
    }
`;

const Logo = styled.img`
    width: 150px;
    height: auto;
    margin-top: 50px;
`;


const Team: React.FC = () => {

    return(
        <BgContainer>
            <Container>
                <ContainerSecondary>
                        <Titulo>Nuestro Equipo</Titulo>
                        <TeamSection>
                            <TeamMembers>
                                <Imagen src="src/assets/img/mac.jpg"></Imagen>
                                <SubTitulo>Marc Adell</SubTitulo>
                                <Parrafo>CEO de YoVistoAsi</Parrafo>
                            </TeamMembers>
                            <TeamMembers>
                                <Imagen src="src/assets/img/sac.jpg"></Imagen>
                                <SubTitulo>Federico Ramos</SubTitulo>
                                <Parrafo>Desarrollador Web</Parrafo>
                            </TeamMembers>
                            <TeamMembers>
                                <Imagen src="src/assets/img/so.jpg"></Imagen>
                                <SubTitulo>Sohaib Muneeb</SubTitulo>
                                <Parrafo>Marketing</Parrafo>
                            </TeamMembers>
                            <TeamMembers>
                                <Imagen src="src/assets/img/mir.jpg"></Imagen>
                                <SubTitulo>Mirjhon Kaliwaz</SubTitulo>
                                <Parrafo>Director de Proyectos</Parrafo>
                            </TeamMembers>

                        </TeamSection>
                        <BoxLogo><Logo src="src/assets/img/logo.webp"></Logo></BoxLogo>
                </ContainerSecondary>
            </Container>
        </BgContainer>
    )

}


export default Team;