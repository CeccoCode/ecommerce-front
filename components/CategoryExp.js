import { styled } from "styled-components";
import Center from "./Center";
import Link from "next/link";



const PageContainer = styled.div`
  display: flex;
  background-color: #222;
  //height: 55vh; //Imposta l'altezza della pagina a 100% della viewport

`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr); // 9 colonne nella griglia
  gap: 10px; // Imposta lo spazio tra le celle della griglia
  background-color: #222; // Imposta il colore di sfondo desiderato
  padding: 0px; // Aggiunge spaziatura interna per separare la griglia dai bordi
  margin-top: 10px; // Imposta un margine superiore per separare dalla navbar
`;

const CategoryItem = styled(Link)`
  position: relative;
  height: 400px; // Imposta l'altezza delle celle
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  transition: filter 0.5s ease; // Aggiunge una transizione per l'effetto di sfocatura

  ${CategoryItem}:hover & {
    filter: blur(2px); // Applica l'effetto di sfocatura all'immagine al passaggio del mouse
  }
`;

const CategoryName = styled.div`
  position: absolute;
  top: 50%; /* Posiziona il top al 50% dell'elemento genitore */
  left: 0;
  width: 100%;
  transform: translateY(-50%); /* Utilizza trasformazioni CSS per centrare verticalmente il testo */
  text-align: center; /* Allinea il testo al centro orizzontalmente */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  transition: opacity 0.5s ease;
  
  ${CategoryItem}:hover & {
    opacity: 1;
  }
`;

export default function CategoryExp() {

  return (
    <PageContainer>
      <Center>
        <GridContainer>
          <CategoryItem href={'/category/64daca13b148bcb55a7cc532'}>
            <Image src="https://img.freepik.com/free-photo/electric-guitar-body-close-up-view-is-wood-floor_186202-5712.jpg?w=996&t=st=1692835509~exp=1692836109~hmac=1c26fd301b52659be6d167c96ea4ffed6f3e19903a4c4a91496be478fade399e" alt="Strumenti a corda" />
            <CategoryName>Strumenti a Corda</CategoryName>
          </CategoryItem>
          <CategoryItem href={'/category/64daca33b148bcb55a7cc538'}>
            <Image src="https://img.freepik.com/premium-photo/snare-drum-blurred-dark-background-part-drum-kit_169016-30043.jpg?size=626&ext=jpg&ga=GA1.1.467230604.1692835213&semt=sph" alt="Percussioni" />
            <CategoryName>Percussioni</CategoryName>
          </CategoryItem>
          <CategoryItem href={'/category/64daca22b148bcb55a7cc535'}>
            <Image src="https://img.freepik.com/free-photo/music-instrument-store_23-2150608952.jpg?size=626&ext=jpg&ga=GA1.1.467230604.1692835213&semt=sph" alt="Strumenti a Fiato" />
            <CategoryName>Strumenti a Fiato</CategoryName>
          </CategoryItem>
          <CategoryItem href={'/category/64daca4eb148bcb55a7cc541'}>
            <Image src="https://img.freepik.com/free-photo/elegant-grand-piano-indoors-scene-generative-ai_188544-7785.jpg?size=626&ext=jpg&ga=GA1.1.467230604.1692835213&semt=sph" alt="Tastiere e Pianoforti" />
            <CategoryName>Tastiere e Pianoforti</CategoryName>
          </CategoryItem>
          <CategoryItem href={'/category/64daca68b148bcb55a7cc544'}>
            <Image src="https://img.freepik.com/premium-photo/midi-keyboard-all-background-close-up_185193-56742.jpg?w=900" alt="Strumenti Elettronici" />
            <CategoryName>Strumenti Elettronici</CategoryName>
          </CategoryItem>
          <CategoryItem href={'/category/64daca7db148bcb55a7cc54b'}>
            <Image src="https://img.freepik.com/free-photo/music-objects-with-coffee_23-2147670287.jpg?size=626&ext=jpg&ga=GA1.1.467230604.1692835213&semt=ais" alt="Accessori" />
            <CategoryName>Accessori</CategoryName>
          </CategoryItem>
          <CategoryItem href={'/category/64daca8db148bcb55a7cc54e'}>
            <Image src="https://img.freepik.com/free-photo/close-up-microphone-pop-filter_23-2149200001.jpg?size=626&ext=jpg&ga=GA1.1.467230604.1692835213&semt=sph" alt="Attrezzatura per Registrazione" />
            <CategoryName>Strumenti Registrazione</CategoryName>
          </CategoryItem>
          <CategoryItem href={'/category/64daca9db148bcb55a7cc551'}>
            <Image src="https://img.freepik.com/free-photo/close-up-sound-music-mixer-control-panel-blurred-background_169016-16564.jpg?size=626&ext=jpg&ga=GA1.1.467230604.1692835213&semt=ais" alt="Effetti e Processori" />
            <CategoryName>Effetti e Processori</CategoryName>
          </CategoryItem>
          <CategoryItem href={'/category/64dacaacb148bcb55a7cc554'}>
            <Image src="https://img.freepik.com/free-photo/macro-detail-rolled-up-musical-note-paper_23-2147927115.jpg?size=626&ext=jpg&ga=GA1.1.467230604.1692835213&semt=sph" alt="Libri e Spartiti" />
            <CategoryName>Libri e Spartiti</CategoryName>
          </CategoryItem>
        </GridContainer>
      </Center>
    </PageContainer>
  );
}
