import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { useDispatch } from 'react-redux';

export default function Products(props) {

    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    // console.log(data);
    // return '';

    const showModal = (product) => {
        //console.log("showModal" + product);
        setProduct(product);

    }

    const hideModal = () => {
        //console.log("hideModal");
        setProduct(null);
    }

    return (
        <>
            <Fade bottom cascade>
                <ul className="products">
                    {props.data && props.data.map(product => (
                        <li key={product.id} data-id={product.id}>
                            <div className="product">
                                <a href={"#" + product.id} onClick={() => showModal(product)}>
                                    <p>{product.title}</p>
                                    <img src={product.image} alt={product.title} />
                                </a>
                                <div className="product-price">
                                    <div>{product.price}</div>
                                    <button className="button primary" onClick={() => props.addCart(dispatch, product)}>Add to Cart</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </Fade>

            {product &&
                (
                    <Modal isOpen={product ? true : false} onRequestClose={() => hideModal()}>
                        <Zoom><>
                            <button className="close-modal" type="button" onClick={() => hideModal()}>x</button>

                            <div className="product-detail">
                                <img src={product.image} alt={product.title} />
                                <div className="product-detail-description">
                                    <p>{product.title}</p>
                                    <p>{product.description}</p>
                                    <p>{product.price}</p>
                                    <p>Taglie disponibili: {product.availableSizes && product.availableSizes.map((taglia) => <span>{taglia} </span>)}</p>
                                    <button className="button primary" onClick={() => { props.addCart(dispatch, product); hideModal() }}>Add to Cart</button>
                                </div>
                            </div>
                        </></Zoom>
                    </Modal>)
            }
        </>
    );
}