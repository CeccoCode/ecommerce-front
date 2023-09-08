import { styled } from "styled-components";
import ProductBox from "./ProductBox";



const StyledProductsGrid = styled.div`
    display: grid;                              //Utilizza un layout a griglia
    grid-template-columns: 1fr 1fr 1fr 1fr;     //4 colonne con larghezza uguale
    gap: 30px;                                  //Spazio tra le celle della griglia
    margin-bottom: 50px;                        //Margine inferiore di 50px
`;

export default function ProductsGrid({ products }) {
    return (
        <StyledProductsGrid>
            {products?.length > 0 && products.map(product => (
                <ProductBox key={product._id} {...product} />
            ))}
        </StyledProductsGrid>
    );
}