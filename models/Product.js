import mongoose, { model, Schema, models } from "mongoose";

//Definizione dello schema per il prodotto
const ProductSchema = new Schema({
    title: { type: String, required: true },                         //Titolo del prodotto, obbligatorio 
    description: String,                                            //Descrizione del prodotto (opzionale)
    price: { type: Number, required: true },                        //Prezzo del prodotto, obbligatorio 
    images: [{ type: String }],                                     //Array di url delle immagini associate al prodotto
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },   //Categoria del prodotto (riferimento ad una categoria)
    properties: { type: Object },                                   //Proprietà aggiuntive del prodotto
});

//Creazione del modello Product utilizzando il pattern Singleton per evitare duplicati
export const Product = models.Product || model('Product', ProductSchema);