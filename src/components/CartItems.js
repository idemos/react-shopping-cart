import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Fade from 'react-reveal/Fade'

export default function CartItems(props) {

    const dispatch = useDispatch();

    const [visibleCheckout, setVisibleCheckout] = useState(false);
    const [user, setUser] = useState({});

    // console.log(data);
    // return '';

    const handlerUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const checkout = (e) => {
        e.preventDefault();
        props.checkout(user);
    }

    return (

        <div>
            <Fade left cascade>
                <ul className="cartItems">
                    {
                        props.cartItems.length > 0 ?
                            props.cartItems.map(cart => (
                                <li key={"cart" + cart.id} data-id={cart.id}>
                                    <div className="cart">
                                        <div className="cart-title">
                                            <img src={cart.image} alt={cart.title} />
                                            <p>{cart.title}</p>
                                        </div>
                                        <div className="cart-price">
                                            <div>{cart.price}x{cart.qta}</div>
                                            <button className="button primary" onClick={() => props.removeCart(dispatch,cart.id)}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))
                            : <li>Cart empty</li>
                    }
                    {
                        /* 
                        a = accumulator
                        c = current 
                        */
                        props.cartItems.length && (
                            <li className="cart-resume">
                                Price: {props.cartItems.reduce((a, c) => a + c.price * c.qta, 0)}<br />
                                Total Item: {props.cartItems.reduce((a, c) => a + c.qta, 0)}<br />
                                <button type="button" onClick={() => setVisibleCheckout(true)}>Proceed</button>
                                <button type="button" onClick={() => (window.confirm('confermi?') && props.emptyCart(dispatch, 1))}>Empty Cart</button>
                            </li>
                        )
                    }
                </ul>
            </Fade>
            {
                visibleCheckout && (
                    <Fade bottom cascade>
                        <div>
                            <div class="form-checkout">
                                <input type="text" name="firstname" required placeholder="first name" onChange={handlerUser} />
                                <input type="text" name="lastname" required placeholder="last name" onChange={handlerUser} />
                                <input type="email" name="email" required placeholder="your best email" onChange={handlerUser} />
                                <input type="text" name="address" required placeholder="address, city" onChange={handlerUser} />
                                <input type="submit" onClick={checkout} value="Proceed" />
                            </div>
                        </div>
                    </Fade>
                )
            }
        </div>



    );
}