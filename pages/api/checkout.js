import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

//Import di Stripe e inizializzazione con la chiave segreta
const stripe = require('stripe')(process.env.STRIPE_SK);

//Definizione del gestore per la richiesta
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        //Verifica se la richiesta è di tipo POST
        res.json('should be a POST request');
        return;
    }

    //Estrazione dei dati dalla richiesta
    const { name, email, city, postalCode, streetAddress, country, cartProducts } = req.body;

    //Connessione a MongoDB
    await mongooseConnect();

    //Estrazione degli ID unici dai prodotti nel carrello
    const productsIds = cartProducts;
    const uniqueIds = [...new Set(productsIds)];

    //Recupero delle informazioni sui prodotti dal database
    const productsInfos = await Product.find({ _id: uniqueIds });


    //Creazione di un'array di oggetti line_items per Stripe
    let line_items = [];
    for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(p => p._id.toString() === productId);
        const quantity = productsIds.filter(id => id === productId).length || 0;
        if (quantity > 0 && productInfo) {
            line_items.push({
                quantity,
                price_data: {
                    currency: 'EUR',
                    product_data: { name: productInfo.title },
                    unit_amount: 100 * productInfo.price,
                },
            });
        }
    }

    //Creazione di un documento di ordine nel database
    const orderDoc = await Order.create({
        line_items,
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        paid: false,
    });

    //Creazione di una sessione di pagamento Stripe
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        success_url: process.env.PUBLIC_URL + '/cart?success=1',
        cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
        metadata: { orderId: orderDoc._id.toString() },
    });

    //Restituzione dell'URL della sessione di pagamento a Stripe
    res.json({
        url: session.url,
    });

}

