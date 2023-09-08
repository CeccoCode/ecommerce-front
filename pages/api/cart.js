import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

//Definizione del gestore per la richiesta
export default async function handle(req, res) {
    //Connessione a MongoDB 
    await mongooseConnect();
    //Estrazione degli ID dei prodotti della richiesta
    const ids = req.body.ids;
    //Restituzione dei prodotti trovati
    res.json(await Product.find({ _id: ids }));
}