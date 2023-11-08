import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const FooterWrapper = styled.div`
    background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);
`;

const FooterContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-column-gap: 20px;
    justify-content: center;

`;

const Section = styled.div`
    >h2{
        color: #fff;
    }
`;

const LinkRow = styled.div`
    display: flex;
    min-width: 200px;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
    padding: 3px 0;
    cursor: pointer;
    border: 2px black dashed;
    
    >h4{
        color: #fff;
        >span{
            width: 25px;
            height: 25px;
            border-radius: 25px;
            background: #afafbf50;
            display: flex;
            align-content: center;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
        }
        &:hover {
            color: #cdcbcb;
            >span {
                >i {
                    color: #cdcbcb;
                }
            }
        }
    }
    
`;

const FooterObj = [
    { 
        id: 'section1', 
        title: 'Company',
        links: [
            {
                name: 'Home',
                link: '#'
            },
            {
                name: 'Home1',
                link: '#'
            },
            {
                name: 'Home2',
                link: '#'
            }
        ]
    },
    { 
        id: 'section2', 
        title: 'Help and Suport',
        links: [
            {
                name: 'Home',
                link: '#'
            }
        ]
    },
    { 
        id: 'section3', 
        title: 'Follow us on',
        links: [
            {
                name: 'Facebook',
                link: '#',
                icon: faFacebook
            },
            {
                name: 'Google',
                link: '#'
            }
        ]
    }
]

function Footer() {
    return (
        <FooterWrapper>
            <FooterContainer>
                {FooterObj.map((elem, i)=>
                    <Section key={i}>
                        <h2>{elem.title}</h2>
                        {elem.links.map((link, j)=>
                            <LinkRow key={j}>
                                <h4>
                                {link.icon && <span>{link.icon}</span>}
                                {link.name}
                                </h4>
                            </LinkRow>
                        )}
                    </Section>
                )}
            </FooterContainer>
        </FooterWrapper>

    );

}

export default Footer;