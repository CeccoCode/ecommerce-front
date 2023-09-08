import { styled } from "styled-components";

const StyledTable = styled.table`
    width: 100%;                                 //Larghezza della tabella al 100%
    th{ 
        text-align: left;                        //Allineamento del testo nell'intestazione a sinistra
        text-transform: uppercase;               //Trasformazione del testo in maiuscolo
        color: #ccc;                             //Colore del testo grigio chiaro
        font-weight: 600;                        //Spessore del carattere in grassetto
        font-size: .7rem;                        //Dimensione del carattere
    }
    td{
        border-top: 1px solid rgba(0,0,0,0.1);  //Bordo superiore delle celle
    }
`;


export default function Table(props) {
    return <StyledTable {...props} />
}