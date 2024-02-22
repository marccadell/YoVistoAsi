import styled from "styled-components";
import React, { useState } from 'react';
import NavbarButton from './NavbarButton';
import { NavLink } from 'react-router-dom';


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

`;

const NavLogoImg = styled.img`
  width: auto;
  height: auto;
  max-height: 50px;
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
    }
`;

const MenuItem = styled.a`
  padding: 16px;
  font-size: 13px;
  cursor: pointer;
  color: white;
  text-decoration: none;

  &:hover {
    background: #8585859a;
    @media (min-width: 768px) {
      background: none;
    }
  }

  .NavLinks { // Color de los links
    color: #eaeaea;
    text-decoration: none;

    &:hover {
      color: #fafafa;
      font-weight: bold;
        @media (min-width: 768px) {
          color: #ffffff;
          font-weight: bolder;
        }
    }
  }

`;

const StyledNavLink = styled(NavLink)`
  margin-left: 40px;
`;

interface MenuModel {
  name: string;
  link: string;
}

const items: MenuModel[] = [
  { name: "Log in", link: "/Login" },
  { name: "Crear Outfit", link: "/CreateOutfit" },
  { name: "Generar Outfit", link: "/GenerateOutfit" }
];

const Overlay = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: fixed; 
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5); 
  z-index: 10; 
`;


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavContainer>
        <StyledNavLink to="/">
          <NavLogo className='Navlogo'>
                <NavLogoImg
                  src="src/assets/img/logo.jpg"
                  alt="Logo"
                  className="logo-image"
                />
            </NavLogo>
        </StyledNavLink>
          <Menu isOpen={isOpen}>
          {items.map((item, key) => (
            <MenuItem key={`menu-item-${key}`}>
              <NavLink 
                to={item.link} 
                onClick={() => setIsOpen(false)}
                className='NavLinks'
              >
                {item.name}
              </NavLink>
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
