import styled from "styled-components";
import React from 'react';
import NavbarButton from './NavbarButton';


const Wrapper = styled.nav`
  display: flex;
  background: #5d5d5d;
  box-shadow: 0 10px 30px -10px rgb(30 30 30 / 70%);
  padding: 5px;

  .ButtonNav{
    @media(min-width: 768px) {
      display: none;
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


interface MenuModel {
  name: string;
  link: string;
}

const items: MenuModel[] = [
  { name: "Favoritos", link: "#favoritos" },
  { name: "Iniciar Sesión", link: "#aboutme" },
  { name: "Crear Outfit", link: "#projects" },
  { name: "Contacta", link: "#contact" },
];

// resposive MD: =- 991px
// resposive SM: =- 767px

function Navbar() {
  return (
    <>
      <Wrapper>
      <NavLogo>
            <NavLogoImg
              src="/imgs/logo.png"
              alt="Logo"
              className="logo-image"
            />
        </NavLogo>
      <Menu>
        {items.map((item, key) => (
          <MenuItem key={`menu-item-${key}`} href={item.link}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
      <div className='ButtonNav'>
        <NavbarButton />
      </div>
      </Wrapper>
    </>
  )
}

export default Navbar
