import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";


//Definizione stili con Styled Components
const ProductName = styled.div`
  white-space: pre-line;
  max-width: 450px; /* Cambia la larghezza massima a tua scelta */
`;
const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.2fr .8fr ;
    gap: 40px;
    margin-top: 40px;
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`;

const ProductInfoCell = styled.td`
    padding: 10px 0;    
`;

const ProductImageBox = styled.div`
    width: 100px; 
    height: 100px;  
    padding: 10px;  
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  
    img {
        max-width: 100%;
        max-height: 100%;
    }
`;

const QuantityLabel = styled.span`
    padding: 0 3px;
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;


//Definizione componente CartPage
export default function CartPage() {
    //Utilizzo del CartContext per prendere le funzioni del carrello
    const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
    //Stati per gestire i dati del form e il successo dell'ordine
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    //UseEffect per recuperare i dettagli dei prodotti del carrello
    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts }).then(response => {
                setProducts(response.data);
            })
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    //UseEffect per gestire il successo dell'ordine
    useEffect(() => {
        if (typeof window === 'undefined') {
            clearCart();
            return;
        }
        if (window.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();
        }
    }, [clearCart]);

    //Funzione per aumentare la quantità di un prodotto nel carrello
    function moreOfThisProduct(id) {
        addProduct(id);
    }

    //Funzione per diminuire la quantità di un prodotto nel carrello
    function lessOfThisProduct(id) {
        removeProduct(id);
    }

    //Funzione per gestire il pagamento
    async function goToPayment() {
        if (!validateEmail(email)) {
            // Mostra un popup di errore se la mail non è valida
            alert(`L'email inserita non è valida, inserisci una nuova mail`);
            return;
        }
        const response = await axios.post('/api/checkout', {
            name, email, city, postalCode, streetAddress, country, cartProducts,
        });
        if (response.data.url) {
            window.location = response.data.url;
        }
    }
    //Funzione per validare una email utilizzando una regex
    function validateEmail(email) {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    }

    //Calcolo del torale del carrello
    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    //Pagina dell'avvenuto ordine (successo dell'ordine)
    if (isSuccess) {
        return (
            <>
                <Header />
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h1>Grazie per l'ordine</h1>
                            <p>Invieremo una mail appena l'ordine verrà spedito</p>
                        </Box>
                    </ColumnsWrapper>

                </Center>
            </>
        );
    }

    //Pagina del carrello
    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h2>Carrello</h2>
                        {!cartProducts?.length && (
                            <div>Carrello vuoto</div>
                        )}
                        {products?.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Prodotto</th>
                                        <th>Quantità</th>
                                        <th>Prezzo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src={product.images[0]} />
                                                </ProductImageBox>
                                                <ProductName>
                                                    {product.title}
                                                </ProductName>
                                            </ProductInfoCell>
                                            <td>
                                                <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                                                <QuantityLabel>
                                                    {cartProducts.filter(id => id === product._id).length}
                                                </QuantityLabel>
                                                <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                                            </td>
                                            <td>€ {((cartProducts.filter(id => id === product._id).length * product.price) % 1 === 0) ?
                                                (cartProducts.filter(id => id === product._id).length * product.price) :
                                                (cartProducts.filter(id => id === product._id).length * product.price).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>€ {((total % 1) === 0) ? total : total.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                    </Box>
                    {!!cartProducts?.length && (
                        <Box>
                            <h2>Order Information</h2>
                            <Input type="text"
                                placeholder="Nome"
                                value={name}
                                name="name"
                                onChange={ev => setName(ev.target.value)} />
                            <Input type="text"
                                placeholder="Email"
                                value={email}
                                name="email"
                                onChange={ev => setEmail(ev.target.value)} />
                            <CityHolder>
                                <Input type="text"
                                    placeholder="Città"
                                    value={city}
                                    name="city"
                                    onChange={ev => setCity(ev.target.value)} />
                                <Input type="text"
                                    placeholder="Codice Postale"
                                    value={postalCode}
                                    name="postalCode"
                                    onChange={ev => setPostalCode(ev.target.value)} />
                            </CityHolder>
                            <Input type="text"
                                placeholder="Indirizzo"
                                value={streetAddress}
                                name="steetAddress"
                                onChange={ev => setStreetAddress(ev.target.value)} />
                            <Input type="text"
                                placeholder="Paese"
                                value={country}
                                name="country"
                                onChange={ev => setCountry(ev.target.value)} />
                            <Button primary="true" block="true" onClick={goToPayment} >Vai al pagamento</Button>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center >
        </>
    );
}