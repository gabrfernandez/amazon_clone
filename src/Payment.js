import React, { useState, useEffect } from 'react'
import "./Payment.css"
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import {getCartTotal} from "./reducer";
import axios from "./axios";
import {db} from './firebase';

function Payment() {
    const [{ cart, user }, dispatch] = useStateValue();
    const history=useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded]=useState(false);
    const [processing, setProcessing]=useState("");

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [clientSecret, setClientSecret]=useState(true);

    useEffect(()=>{
        //generate stripe secret allow us to charge customer
        const getClientSecret=async ()=>{
            const response= await axios({
                method:'post',
                //stripe expects the total in a currencies submits 
                url:`/payments/create?total=${getCartTotal(cart)*100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    },[cart])

    console.log('The secret is >>> ',clientSecret);
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            //paymentIntent =payment confirmation
            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                cart:cart,
                amount:paymentIntent.amount,
                created:paymentIntent.created
            })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type:'EMPTY_CART'
            })

            history.replace('/orders')
        })
    }

    const handleChange = event => {
        //listen for changes in cardElement
        //display any errors
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout" >{cart?.length} items</Link>)
                </h1>
                
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 Main St</p>
                        <p>San Jose, CA 95123</p>
                    </div>
                </div>

                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {cart.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                pice={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    < div className="payment__details">
                        {/* stripe payment */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total: {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getCartTotal(cart)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"} </span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
