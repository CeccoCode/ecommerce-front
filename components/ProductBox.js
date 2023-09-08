import { styled } from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";


const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 20px;
    height: 120px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img {
        max-width: 100%;
        max-height: 100px;
        transition: transform 0.6s ease, opacity 0.6s ease; /* Aggiungi una transizione per un effetto di ingrandimento fluido */
    }
    &:hover {
        img {
            transform: scale(1.5); /* Ingrandisci l'immagine al passaggio del mouse */
            opacity: 0.7;
        }
    }
`;

const Title = styled(Link)`
    font-weight: normal;
    font-size: .9rem;
    color: inherit;
    text-decoration: none;
    margin: 0;
`;

const ProductInfoBox = styled.div`
    margin-top: 5px;
`;

const PriceRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`;

const Price = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
`;


export default function ProductBox({ _id, title, description, price, images }) {
    const { addProduct } = useContext(CartContext);
    const url = '/product/' + _id;      //Costruizione dell'URL del prodotto utilizzando l'ID
    return (
        <>
            <WhiteBox href={url}>
                <div>
                    <img src={images?.[0]} alt="" />    {/* Visualizzazione dell'immagine principale del prodotto */}
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>{title}</Title>       {/* Visualizzazione del titolo del prodotto come link */}
                <PriceRow>
                    <Price>€{price}</Price>             {/* Visualizzazione del prezzo del prodotto */}
                    <Button
                        onClick={() => addProduct(_id)} // Gestisce l'aggiunta del prodotto al carrello
                        primary="true"
                        outline="true">
                        <CartIcon />
                        Add to cart
                    </Button>
                </PriceRow>
            </ProductInfoBox>
        </>
    );
}