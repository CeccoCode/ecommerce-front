import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import logo from '/public/Logo.png';
import Image from 'next/image';



const StyledHeadr = styled.header`
    background-color: #222;
    border: 1px bottom #fff;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.div`
  margin-left: 10px; /* Aggiungi margine a sinistra per separare il logo dal testo */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Allinea il testo in alto */
  font-size: 1.5rem; /* Imposta la dimensione del carattere del testo */
  margin-bottom: 20px; /* Alza il testo spostandolo verso l'alto */
`;


const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
`;

const StyledNav = styled.nav`
    display: flex;
    gap: 15px;
`;

const NavLink = styled(Link)`
    margin-top:10px;
    color: #aaa;
    text-decoration: none;
`;

const StyledImage = styled(Image)`
  margin-top: 0px; /* Imposta il margine superiore dell'immagine per abbassarla ulteriormente */
`;

export default function Header() {
    const { cartProducts } = useContext(CartContext);
    return (
        <StyledHeadr>
            <Center>
                <Wrapper>
                    {/* Logo dell'azienda */}
                    <Logo href="/">
                        <StyledImage src={logo} alt="Logo" width={100} height={60} />
                        <LogoText>MusicHero</LogoText>
                    </Logo>
                    {/* Link di navigazione */}
                    <StyledNav>
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/products">All products</NavLink>
                        <NavLink href={'/cart'}>Cart ({cartProducts?.length}) </NavLink>
                    </StyledNav>
                </Wrapper>
            </Center>
        </StyledHeadr>
    );
}