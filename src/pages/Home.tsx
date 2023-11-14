import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Carousel from "../components/Carousel";
import Testimonial from "../components/Testimonials";

const HomeWrapper = styled.div``;

const BgContainer = styled.div`
  background-image: url("src/assets/img/bg-homepage.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: calc(130vh - 69px);
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 120px 90px;
  max-width: 1100px;
  margin: 30px auto 0px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
  // Box Border
  border: 1px black solid;
  border-radius: 30px;
  border-color: var(--clr-boxborder-box1);
  box-shadow: 0 10px 30px -10px rgb(30 30 30 / 70%);

  @media screen and (max-width: 960px) and (min-width: 760px) {
        position: relative;
        padding: 100px 70px 70px;
        max-width: 1100px;
        margin: 30px 0 auto;
    }

    @media screen and (max-width: 760px) and (min-width: 728px) {
        position: relative;
        padding: 100px 70px 70px;
        max-width: 1100px;
        margin: 30px 0 auto;
    }

    @media screen and (max-width: 728px) and (min-width: 604px) {
        position: relative;
        padding: 100px 50px 60px;
        max-width: 1100px;
        margin: 30px auto;
    }

    @media screen and (max-width: 604px) {
        position: relative;
        padding: 50px 30px 0;
        max-width: 1100px;
        margin: auto;
    }
    


    

`;

const Container_secondary = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 120px 100px;
  margin: 30px auto 30px;
  height: calc(200vh - 69px);
  max-width: 1140px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 1);
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: auto;
  height: auto;
`;

const Title = styled.h1`
  font-weight: 300;
  font-size: 3.5rem;
  margin: 16px 0;
  // Box Border
  border: 2px dashed;
`;

const SubTitle = styled.h2`
  font-weight: 300;
  font-size: 2.5rem;
  margin-bottom: 48px;
  // Box Border
  border: 2px dashed;
  border-color: var(--clr-boxborder-box3);
`;

const Social = styled.div`
  // Box Border
  border: 2px dashed;
  border-color: var(--clr-boxborder-box4);
`;

const SocialLink = styled.a`
  text-decoration: none;
  margin-right: 16px;

  &:last-child {
    margin-right: 0;
  }
`;

const SocialIcon = styled.em`
  color: #141414;
  padding: 8px;
  font-size: 48px;
`;

const TestimonialsSection = styled.section``;

const TestimonialsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 755px) {
    flex-direction: column;
  }
`;

const Hr = styled.hr`
  width: 70%;
  margin: auto;
  border: none;
  border-top: 3px solid #534d4d51;
`;

interface SocialModel {
  name: string;
  icon: string;
  url: string;
}

const links: SocialModel[] = [
  { name: "Github", icon: faGithub, url: "https://github.com/marccadell" },
];

// Carousel Imagenes declaradas aquí
const images = [
  "carousel2.jpg",
  "carousel3.jpg",
  "carousel4.jpg",
  "carousel5.jpg",
];

export function Home() {
  return (
    <HomeWrapper>

    
    <BgContainer>
      <Container>
        <LogoContainer>
          <LogoImg className="logo_img" src="src/assets/img/logo.jpg"></LogoImg>
        </LogoContainer>
        <SubTitle>
          En YoVistoAsí, nuestra pasión es{" "}
          <b>ayudarte a brillar en cada ocasión.</b> Ofrecemos asesoría de moda
          personalizada que se adapta a tus <b>gustos</b>, tu{" "}
          <b>estilo de vida</b> y los <b>eventos</b> que te importan. Desde
          fiestas elegantes hasta reuniones informales,{" "}
          <b>
            nuestro equipo de expertos en moda te guiará para crear outfits
            impresionantes
          </b>{" "}
          que reflejen tu personalidad y te hagan sentir seguro y radiante.
          Descubre cómo podemos llevarte al siguiente nivel de estilo y
          confianza. <b>¡Comienza tu viaje de moda con nosotros hoy mismo!</b>
        </SubTitle>
      </Container>
      </BgContainer>
      <Container_secondary>
        <Title>
          Nuestros <b>Outfits</b>
        </Title>
        <SubTitle>Aquí te mostramos nuestras mejores inspiraciones 👇🏼</SubTitle>
        {/* Galeria de imagenes del Home */}
        <Carousel images={images} autoPlay={true} showButtons={true} />
        <Social>
          {links.map((link, key) => (
            <SocialLink
              key={`social-link-${key}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
            >
              <SocialIcon>
                <FontAwesomeIcon icon={link.icon} />
              </SocialIcon>
            </SocialLink>
          ))}
        </Social>
        <Hr></Hr>
        {/* Sección Testimonios */}
        <Title>
          Nuestros <b>Testimonios</b>
        </Title>
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
          {/* Agregar más testimonios aquí */}
        </TestimonialsSection>
      </Container_secondary>
    
    </HomeWrapper>
  );
}

export default Home;
