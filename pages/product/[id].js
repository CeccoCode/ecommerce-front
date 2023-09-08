import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import CartIcon from "@/components/icons/CartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import { styled } from "styled-components";


//Definizione di stili con StyledComponents
const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: .8fr 1.2fr;
    gap: 40px;
    margin-top: 40px;
`;
const PriceRow = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;
const Price = styled.span`
    font-size: 1.4rem;
`;

//Definizione componente della pagina del singolo prodotto
export default function ProductPage({ product }) {
    //Utilizzo del context per aggiungere elementi al carrello
    const { addProduct } = useContext(CartContext);
    return (
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <ProductImages images={product.images} />
                    </WhiteBox>
                    <div>
                        <Title>{product.title}</Title>
                        <p>{product.description}</p>
                        <PriceRow>
                            <div>
                                <Price>
                                    €{product.price}
                                </Price>
                            </div>
                            <div>
                                <Button primary="true" onClick={() => addProduct(product._id)}>
                                    <CartIcon />
                                    Add to Cart
                                </Button>
                            </div>
                        </PriceRow>
                    </div>
                </ColWrapper>
            </Center>
        </>
    );
}


//Funzione asincrona per ottenere i dati del prodotto durante il server-side rendering
export async function getServerSideProps(context) {
    //Connessione a MongoDB
    await mongooseConnect();
    //Recupero l'ID del prodotto dalla query del context 
    const { id } = context.query;
    //Recupero i dati del prodotto che mi servono per dal database in base all'id del prodotto
    const product = await Product.findById(id);
    //Mando i dati del prodotto con un oggetto 'props'
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }

}