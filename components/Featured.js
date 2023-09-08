import Center from "./Center";
import { styled } from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";




const Bg = styled.div`
    background-color: #222;
    color:#fff;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin:0;
    font-weight: normal;
    font-size: 3rem;
`;

const Desc = styled.p`
    color: #aaa;
    font-size:.8rem;
`;

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: .9fr 1.1fr;
    gap: 40px;
    img{
        max-width: 50%;
    }
`;

const Column = styled.div`
    display: flex;
    align-items: end;
    flex-direction: column;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 25px;
`;

export default function Featured({ product }) {
    const { addProduct } = useContext(CartContext);
    //Funzione per aggiungere il prodotto in evidenza al carrello
    function addFeaturedToCart() {
        addProduct(product._id);
    }
    return (
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            {/* Titolo del prodotto */}
                            <Title>{product.title}</Title>
                            {/* Descrizione del prodotto */}
                            <Desc>{product.description}</Desc>
                            <ButtonWrapper>
                                {/* Pulsante che rimanda alla pagina del prodotto */}
                                <ButtonLink href={'/product/' + product._id} outline={1} white={1} >Read more</ButtonLink>
                                {/* Pulsante per aggiungere il prodotto al carrello */}
                                <Button primary="true" onClick={addFeaturedToCart}>
                                    <CartIcon />
                                    Add to cart
                                </Button>
                            </ButtonWrapper>
                        </div>
                    </Column>
                    <Column>
                        {/* Immagine del prodotto in evidenza */}
                        <img src="https://i.ebayimg.com/images/g/DVUAAOSw1Wliau-V/s-l1600.png" />
                    </Column>
                </ColumnsWrapper>

            </Center>
        </Bg>
    );
}