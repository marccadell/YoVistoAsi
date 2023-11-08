import styled from "styled-components";
import React, { useState } from 'react';
import NavbarButton from './NavbarButton';
import { Link } from 'react-router-dom';


const NavContainer = styled.nav`
  display: flex;
  background: var(--clr-navbar-bg);
  box-shadow: 0 10px 30px -10px rgb(30 30 30 / 70%);
  padding: 10px;
  width: auto;

  .ButtonNav{
    @media(min-width: 769px) {
      display: none;
    }

    @media(max-width: 768px) {
      display: flex;
      justify-content: flex-end;
      width: 100%;
    }
  }

`;

const NavLogo = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 40px;
`;

const NavLogoImg = styled.img`
  width: auto;
  height: auto;
`;

const Menu = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  position: ${props => (props.isOpen ? 'absolute' : 'none')};
  z-index: 100;
  
    @media(max-width: 768px) {
      display: ${props => (props.isOpen ? 'flex' : 'none')};
      position: absolute;
      background: var(--clr-navbartoogle-bg);
      width: 100%;
      right: 0;
      margin-top: 60px;
      padding-right: 10px;
      flex-direction: column;
      align-items: center;
      border: 2px red dashed;
    }
`;

const MenuItem = styled.a`
  padding: 16px;
  font-size: 13px;
  cursor: pointer;
  color: white;
  text-decoration: none;

  &:hover {
    background: #252526;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    color: #ccc;
  }
`;

interface MenuModel {
  name: string;
  link: string;
}

const items: MenuModel[] = [
  { name: "Favoritos", link: "/Home" },
  { name: "Iniciar Sesión", link: "/aboutme" },
  { name: "Crear Outfit", link: "/projects" },
  { name: "Contacta", link: "/contact" },
];

const Overlay = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: fixed; // Esto hace que el overlay sea fijo y cubra toda la pantalla
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5); // Color negro con opacidad
  z-index: 10; // Asegúrate de que esto esté debajo de tu menú desplegable
`;


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavContainer>
        <NavLogo className='Navlogo'>
              <NavLogoImg
                src="/imgs/logo.png"
                alt="Logo"
                className="logo-image"
              />
          </NavLogo>
        <Menu isOpen={isOpen}>
          {items.map((item, key) => (
            <MenuItem key={`menu-item-${key}`} className='NavLinks'>
              <StyledLink to={item.link} onClick={() => setIsOpen(false)}>
                {item.name}
              </StyledLink>
            </MenuItem>
          ))}
        </Menu>
        <div className='ButtonNav'>
          <NavbarButton onClick={toggleMenu} />
        </div>
      </NavContainer>
      <Overlay isOpen={isOpen} onClick={toggleMenu} />
    </>
  )
}

export default Navbar
