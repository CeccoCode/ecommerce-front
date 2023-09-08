import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";


//Definizione del componente ProductPage
export default function ProductsPage({ products }) {
    return (
        <>
            <Header />
            <Center>
                <Title>All products</Title>
                <ProductsGrid products={products} />
            </Center>
        </>
    );
}


//Funzione asincrona per ottenere i dati dei prodotti durante il server-side rendering
export async function getServerSideProps() {
    //Connessione a MongoDB
    await mongooseConnect();
    //Recupero dei prodotti dal database, ordinati per ID in ordine decrescente
    const products = await Product.find({}, null, { sort: { '_id': -1 } });
    //Restituzione dei dati dei prodotti come oggetto 'props'
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        }
    };
}