import mongoose, { Schema, model, models } from "mongoose";

//Definizione dello schema per la categoria
const CategorySchema = new Schema({
    name: { type: String, required: true },                     //Nome della categoria, obbligatorio
    parent: { type: mongoose.Types.ObjectId, ref: 'Category' }, //Categoria padre (riferimento ad un'altra categoria)
    properties: [{ type: Object }]                              //Proprietà aggiuntive della categoria (array di oggetti)
});

//Creazione del modello Category utilizzando il pattern Singleton per evitare duplicati
export const Category = models?.Category || model('Category', CategorySchema);