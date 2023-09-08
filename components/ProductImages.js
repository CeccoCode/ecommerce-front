import { useState } from "react";
import { styled } from "styled-components";


const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`;
const BigImage = styled.img`
    max-width: 500px;       // Larghezza massima desiderata 
    max-height: 1000px;     // Altezza massima desiderata 
    width: auto;
    height: auto;
`;
const ImageButtons = styled.div`
    display: flex;
    gap: 10px;
    flex-grow: 0;
    margin-top: 10px;
`;
const ImageButton = styled.div`
    border: 2px solid #ccc;
    opacity: 0.6;                   // Opacità predefinita per le immagini non attive
    ${props => props.active && `
        border-color: black;
        opacity: 1;                 // Opacità per l'immagine attiva 
    `}
    height: 60px;
    padding: 2px;
    cursor: pointer;
    border-radius: 5px;
`;
const BigImageWrapper = styled.div`
    text-align: center;

`;

export default function ProductImages({ images }) {
    const [activeImage, setActiveImage] = useState(images?.[0]); //Stato per tenere traccia dell'immagine attualmente attiva
    return (
        <>
            <BigImageWrapper>
                <BigImage src={activeImage} />              {/* Visualizza l'immagine attiva in una dimensione più grande */}
            </BigImageWrapper>
            <ImageButtons>
                {images.map(image => (
                    <ImageButton
                        key={image}
                        active={image === activeImage}
                        onClick={() => setActiveImage(image)}>
                        <Image src={image} alt="" />        {/* Visualizza le miniature delle immagini con la possibilità di selezionarle */}
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    );
}