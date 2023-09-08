import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import Title from "@/components/Title";
import ProductsGrid from "@/components/ProductsGrid";


//Definizione del componente CategoryPage (pagina per esporre i prodotti di una specifica categoria)
export default function CategoryPage({ parentCategory, products }) {
    //Verifica se la categoria padre esiste, altrimenti mostra un messaggio di errore
    if (!parentCategory) {
        return <p>Categoria non trovata.</p>;
    }

    return (
        <>
            <Header />
            <Center>
                <Title>{parentCategory.name}</Title>
                <ProductsGrid products={products} />
            </Center>
        </>

    );
}

//Funzione asincrona per ottenere i dati delle categorie e dei prodotti durante il server-side rendering 
export async function getServerSideProps(context) {
    try {
        //Connessione a MongoDB
        await mongooseConnect();
        //Ottengo l'ID della categoria dalla query del context 
        const { id } = context.query;

        // Eseguo una query per ottenere la categoria padre
        const parentCategory = await Category.findById(id);
        //Se la categoria padre non esiste, restituisce un errore
        if (!parentCategory) {
            return {
                notFound: true,
            };
        }

        // Eseguo una query per ottenere tutte le sottocategorie della categoria padre
        const childCategories = await Category.find({ parent: parentCategory._id });

        // Eseguo una query per ottenere tutti i prodotti associati alle sottocategorie
        const products = await Product.find({
            category: { $in: childCategories.map((childCategory) => childCategory._id) },
        });

        //Restituisce i dati della categoria padre e dei prodotti come props
        return {
            props: {
                parentCategory: JSON.parse(JSON.stringify(parentCategory)),
                products: JSON.parse(JSON.stringify(products)),
            },
        };
    } catch (error) {
        //Gesione degli errori: in caso di errore, restituisco una categoria vuota
        console.error("Errore durante il recupero dei dati:", error);
        return {
            props: {
                parentCategory: null,
                products: [],
            },
        };
    }
}
