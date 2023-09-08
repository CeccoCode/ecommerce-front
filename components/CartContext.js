import { createContext, useEffect, useState } from "react";

//Creazione del context per il carrello
export const CartContext = createContext({});

export function CartContextProvider({ children }) {
    //Verifica se il localStorage è disponibile
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    //Stato per tenere traccia dei prodotti nel carrello
    const [cartProducts, setCartProducts] = useState([]);

    //UseEffect che aggiorna il localStorage quando il carrello cambia
    useEffect(() => {
        if (cartProducts?.length > 0 && ls) {
            ls.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts, ls]);

    //UseEffect che inizializza il carrello dal localStorage al caricamento della pagina
    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    }, [ls]);

    //Funzione per aggiungere il prodotto al carrello
    function addProduct(productId) {
        setCartProducts(prev => [...prev, productId]);
    }

    //Funzione per rimuovere un prodotto dal carrello
    function removeProduct(productId) {
        setCartProducts(prev => {
            const pos = prev.indexOf(productId);
            if (pos !== -1) {
                return prev.filter((value, index) => index !== pos);
            }
            return prev;
        });
    }

    //Funzione per svuotare il carrello
    function clearCart() {
        setCartProducts([]);
    }

    //Restituisce il provider del context con le funzioni e lo stato del carrello
    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
