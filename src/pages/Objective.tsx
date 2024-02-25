import styled from "styled-components";

const BgContainer = styled.div`
    background-image: url("src/assets/img/ods12.jpg");
    background-size: cover;
    background-repeat: no-repeat;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
`;

const ObjectiveBox = styled.div`
    margin: 80px 200px 80px 200px;
    padding: 20px;
    background-color: #ececec;
    height: auto;
    box-shadow: -1px 4px 6px 4px #606060a7;
    border-radius: 15px;
`;

const Titulo = styled.h1`
    font-size: 3.6rem;
    font-weight: bold;
    padding: 20px;
    margin-top: 50px;
    font-weight: 600;

    @media screen and (max-width: 770px) and (min-width: 500px) {
        text-align: center;
    }
`;

const Titulo2 = styled.h1`
    font-size: 2.7rem;
    font-weight: bold;
    padding: 20px 20px 10px 25px;
    font-weight: 500;
`;

const SubTitulo = styled.h2`
    font-size: 20px;
    font-weight: 400;
    padding-left: 30px;
`;

const Parrafo = styled.p`
    font-size: 15px;
    padding-left: 30px;
    font-weight: 300;
    margin-bottom: 30px;
    margin-right: 50px;
`;

const BoxImg = styled.div`
    display: flex;
    justify-content: center;
    justify-items: center;
`;

const BoxBanner = styled.div`
    display: flex;
    justify-content: start;
    justify-items: start;
`;

const Imagen = styled.img`
    width: 400px;
    height: auto;
    margin-bottom: 40px;
`;

const Banner = styled.img`
    width: 500px;
    height: auto;
    margin-bottom: 40px;
    padding-left: 40px;

    @media screen and (max-width: 1064px) and (min-width: 770px) {
        width: 500px;
        margin-right: 40px;
    }

    @media screen and (max-width: 770px) and (min-width: 500px) {
        width: 380px;
        margin-right: 40px;
    }
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


function Objective() {

    return (
        <BgContainer>
            <Container>
                <ObjectiveBox>
                    <Titulo>Nuestro Objetivo</Titulo>
                        <Titulo2>Objetivos de Desarrollo Sostenible (ODS)</Titulo2>
                            <SubTitulo>Introducción a los ODS</SubTitulo>
                            <Parrafo>En YoVistoAsí, nos comprometemos con los Objetivos de Desarrollo 
                                Sostenible establecidos por las Naciones Unidas. Estos 17 objetivos son 
                                nuestra guía para contribuir a un mundo más sostenible y justo para todos.
                            </Parrafo>
                            <BoxImg><Imagen src="src/assets/img/odsintro.png"/></BoxImg>  
                        <Titulo2>ODS 12: Producción y Consumo Responsables</Titulo2>
                            <SubTitulo>¿Qué es la ODS 12?</SubTitulo>
                            <Parrafo>En YoVistoAsí, entendemos que la ODS 12 es crucial para nuestro futuro. 
                                Se enfoca en la adopción de prácticas sostenibles de producción y consumo, 
                                reduciendo el impacto ambiental y maximizando la eficiencia de los recursos.
                            </Parrafo>
                            <BoxBanner><Banner src="src/assets/img/ods12banner.png"/></BoxBanner>
                            <SubTitulo>Importancia de la ODS 12 para Nosotros</SubTitulo>
                            <Parrafo>Para nosotros en YoVistoAsí, este objetivo es esencial. Nos esforzamos por 
                                lograr un equilibrio entre uso de ropa de forma responsable y la preservación del medio 
                                ambiente. Creemos firmemente que podemos mejorar la calidad de vida de todos, minimizando 
                                al mismo tiempo nuestro impacto en el planeta.
                            </Parrafo>
                        <Titulo2>Nuestra Implementación de la ODS 12</Titulo2>
                            <SubTitulo>Nuestras Acciones y Ejemplos</SubTitulo>
                            <Parrafo>En YoVistoAsí, adoptamos medidas concretas para cumplir con la ODS 12. Desde políticas 
                                de reciclaje en nuestras oficinas hasta la promoción de prendas de ropa y servicios sostenibles, 
                                cada paso cuenta.
                            </Parrafo>
                            <SubTitulo>Nuestro Compromiso en YoVistoAsí</SubTitulo>
                            <Parrafo>Estamos comprometidos con la reducción de residuos y el uso eficiente de recursos. 
                                Nuestras políticas y prácticas internas reflejan este compromiso, y estamos orgullosos de 
                                compartir nuestras iniciativas y logros con nuestra comunidad.
                            </Parrafo>
                        <Titulo2>Participa y Contribuye con Nosotros</Titulo2>
                            <SubTitulo>Llamado a la Acción</SubTitulo>
                            <Parrafo>En YoVistoAsí, animamos a todos a unirse a nosotros en la promoción de prácticas sostenibles. 
                                Pequeños cambios en el estilo de vida o la participación en iniciativas comunitarias pueden hacer 
                                una gran diferencia. Juntos, podemos lograr un impacto significativo hacia un futuro más sostenible.
                            </Parrafo>
                        <BoxLogo><Logo src="src/assets/img/logo.webp"/></BoxLogo>
                </ObjectiveBox>
            </Container>
        </BgContainer>
    );
}

export default Objective;