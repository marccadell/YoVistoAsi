import styled from "styled-components";
import '../styles/Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 120px 100px;
    margin: 69px auto 0;
    height: calc(100vh - 69px);
    max-width: 1140px;
    box-sizing: border-box;
    // Box Border
    border: 2px dashed;
    border-color: var(--clr-boxborder-box1);
`;

const Title = styled.h1`
    font-weight: 300;
    font-size: 2.5rem;
    margin: 16px 0;
    // Box Border
    border: 2px dashed;
    border-color: var(--clr-boxborder-box2);
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

interface SocialModel {
    name: string;
    icon: string;
    url: string;
}

const links: SocialModel[] = [
    { name: "Github", icon: faGithub, url: "https://github.com/marccadell" },
]

export function Home() {
    return (
     <Container>
        <Title>Hola a todos, soy Marc Adell</Title>
        <SubTitle>
            Esto es un ejemplo usando Styled Components 
            para crear mi Portfolio.
        </SubTitle>
        <Social>
         {links.map((link, key) => 
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
         )}
        </Social>
     </Container>
    );
}