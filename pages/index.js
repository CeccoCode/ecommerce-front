import Header from "@/components/Header";
import Featured from "@/components/Featured";
import CategoryExp from "@/components/CategoryExp";
import { Product } from '../models/Product';
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";


//Definizione del componente HomePage
export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <CategoryExp />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

//Funzione asincrona per ottenere i dati necessari durante il server-side rendering
export async function getServerSideProps() {
  //Id prodotto in primo piano
  const featuredProductID = '64d8f42fc850cd4a13584413';
  //Connessione con MongoDB
  await mongooseConnect();
  //Recupero del prodotto in primo piano tramite l'ID
  const featuredProduct = await Product.findById(featuredProductID);
  //Recupero dei nuovi prodotti, ordinati per ID in ordine decrescente e con un limite di 10 elementi
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });
  //Restituzione dei dati come oggetto props
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  }
}

