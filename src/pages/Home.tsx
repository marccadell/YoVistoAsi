import styled from "styled-components";
import Carousel from "../components/Carousel";
import Testimonial from "../components/Testimonials";
import Sponsors from "../components/Sponsors";


const HomeWrapper = styled.div``;

const BgContainer = styled.div`
  background-image: url("src/assets/img/bg-homepage.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0px 10px 30px 7px rgb(30 30 30/70%);
  min-height: 700px;
  padding: 20px;
`;

const BgContainer_secondary = styled.div`
  background-image: url("src/assets/img/fondo_container.svg");
  background-size: cover;
  background-repeat: no-repeat;
  padding: 1px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 60px 30px;
  max-width: 1100px;
  margin: 30px auto 0px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 10px 30px -10px rgb(30 30 30 / 70%);
  border-radius: 30px;
  border: 0.2px solid black;

  @media screen and (max-width: 960px) and (min-width: 760px) {
        position: relative;
        padding: auto;
        max-width: 1100px;
        margin: 30px 0 auto;
    }

    @media screen and (max-width: 760px) and (min-width: 728px) {
        position: relative;
        padding: auto;
        max-width: 1100px;
        margin: 30px 0 auto;
    }

    @media screen and (max-width: 728px) and (min-width: 604px) {
        position: relative;
        padding: auto;
        max-width: 1100px;
        margin: 30px auto;
    }

    @media screen and (max-width: 604px) {
        position: relative;
        padding: auto;
        max-width: 1000px;
        margin: 30px auto;
        font-size: 20px;
    }
`;

const Container_secondary = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 120px 100px;
  margin: 80px auto 100px;
  height: auto; 
  max-width: 1140px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 10px 5px 5px rgb(30 30 30/40%);
  border-top: 0.1px black solid;
  border-radius: 10px;

  @media screen and (max-width: 1188px) and (min-width: 760px) {
        position: relative;
        max-width: 700px;
        height: auto;
  }

  @media screen and (max-width: 760px) and (min-width: 600px) {
      position: relative;
      max-width: 550px;
      height: auto;
      margin: 70px auto 70px auto;
  }

  @media screen and (max-width: 600px) and (min-width: 500px) {
      position: relative;
      max-width: 510px;
      height: auto;
      margin: 70px auto 70px auto;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;
`;

const LogoImg = styled.img`
  width: auto;
  height: auto;
`;

const Title = styled.h1`
  font-weight: 300, bold;
  font-size: 4.5rem;
  margin: 12px 0;
  padding: 10px;
`;

const SubTitleContainer = styled.h2`
  font-weight: 300;
  font-size: 2.5rem;
  margin-bottom: 48px;
  margin: 10px;

  @media screen and (max-width: 1188px) and (min-width: 760px) {
      font-size: 22px;
  }

  @media screen and (max-width: 760px) and (min-width: 604px) {
      font-size: 22px;
  }

  @media screen and (max-width: 604px) {
      font-size: 22px;
  }
`;

const SubTitle = styled.h2`
  font-weight: 300;
  font-size: 2.5rem;
  margin-bottom: 48px;
`;

const TestimonialsSection = styled.section``;

const TestimonialsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  justify-content: center;

  @media (max-width: 1188px) {
    flex-direction: column;
  }
`;

const Hr = styled.hr`
  width: 70%;
  margin: 30px auto 40px auto;
  border: none;
  border-top: 3px solid #534d4d51;
`;

const images = [
  "carousel2.jpg",
  "carousel3.jpg",
  "carousel4.jpg",
  "carousel5.jpg",
];


function Home() {
  return (
    <HomeWrapper>
      <BgContainer>
        <Container>
          <LogoContainer>
            <LogoImg className="logo_img" src="src/assets/img/logo.jpg"></LogoImg>
          </LogoContainer>
          <SubTitleContainer>
            En YoVistoAsí, nuestra pasión es ayudarte a brillar en cada ocasión. Ofrecemos asesoría de moda
            personalizada que se adapta a tus gustos, tu estilo de vida y los eventos que te importan. Desde
            fiestas elegantes hasta reuniones informales, nuestro equipo de expertos en moda te guiará para
            crear outfits impresionantes que reflejen tu personalidad y te hagan sentir seguro y radiante.
            Descubre cómo podemos llevarte al siguiente nivel de estilo y confianza.
            <br /><b>¡Comienza tu viaje de moda con nosotros hoy mismo!</b>
          </SubTitleContainer>
        </Container>
      </BgContainer>
      
      <BgContainer_secondary>
        <Container_secondary>
          <Title>Nuestros Outfits</Title>
          <SubTitle>
            Descubre la excelencia en moda con nuestros exclusivos outfits.
            En <b>YoVistoAsí</b>, nos enorgullece ofrecerte las tendencias más destacadas y
            los conjuntos más únicos. Nuestro compromiso con la calidad y la
            innovación nos distingue como líderes en el mundo de la moda.
            Explora nuestra galería y sumérgete en un mundo de estilo incomparable.
          </SubTitle>
          <Carousel images={images} autoPlay={true} showButtons={true} />
          <Sponsors />
          <Hr></Hr>
          <Title>Nuestros Testimonios</Title>
          <TestimonialsSection id="testimonials" className="section-x2">
            <TestimonialsContainer className="testimonial-container container">
              <Testimonial
                desc="`No me siento despecha con los outfits de YoVistoAsí`"
                name="Rosalia"
              />
              <Testimonial
                desc="`No te lo voy a negar, deja que YoVistoAsí la siga rompiendo`"
                name="Nicky Jam"
              />
              <Testimonial
                desc="`Soy el terror de las nenas en el Wolf`"
                name="Joel. M"
              />
            </TestimonialsContainer>
          </TestimonialsSection>
        </Container_secondary>
      </BgContainer_secondary>
    </HomeWrapper>
  );
}

export default Home;
