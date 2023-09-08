import { model, models, Schema } from "mongoose";

//Definizione dello schema per l'ordine
const OrderSchema = new Schema({
    line_items: Object,     //Oggetto contenente le informazioni sui prodotti dell'ordine
    name: String,           //Nome dell'utente che effettua l'ordine
    email: String,          //Indirizzo email dell'utente
    city: String,           //Città di destinazione dell'ordine
    postalCode: String,     //Codice postale di destinazione
    streetAddress: String,  //Indirizzo di spedizione
    country: String,        //Paese di destinazione dell'ordine
    paid: Boolean,          //Flag che indica se l'ordine è stato pagato o meno
}, {
    timestamps: true,       //Aggiunge campi "CreatedAdt" e "UpdateAdt" automaticamente
});

//Creazione del modello order utilizzando il pattern Singleton per evitare duplicati
export const Order = models?.Order || model('Order', OrderSchema);
