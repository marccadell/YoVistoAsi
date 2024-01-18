import React from "react"
import styled from "styled-components"


const Container = styled.div`
    margin: 70px 30px 130px;
    padding: 20px;
    background-color: #ececec;
    box-shadow: 0px 4px 6px 4px #ddd;
    border-radius: 15px;
`;

const TeamSection = styled.div`
    display: flex;
    flex-wrap: wrap;
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


const Team: React.FC = () => {

    return(
        <>
        <Container>
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
            
                
            
        </Container>
        </>
        
        
    )

}


export default Team;