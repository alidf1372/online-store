import React, {useEffect, useState} from 'react';
import styles from "../../layout/header/header.module.css";
import axios from "axios";
import {Confirm} from "../index";
import {useDispatch, useSelector} from "react-redux";
import {confirmOKAction, showConfirmAction} from "../../redux/confirm";

const CartCount = () => {

    const [cartCount, setCartCount] = useState(0);
    const [cartProducts, setCartProducts] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [userInfoCartProduct, setUserInfoCartProduct] = useState(null);
    const [productCartCount, setProductCartCount] = useState({});
    const [showCart, setShowCart] = useState(false);
    const mode = useSelector((state) => state.mode.mode);

    const dispatchConfirm = useDispatch();

    const cartCountHandler = () => {
        setShowCart(!showCart);
    };

    useEffect(() => {
        if (userInfoCartProduct) {
            const fetchProductData = async () => {
                const productDataPromises = userInfoCartProduct.products.map((product, index) =>
                    axios.get(`http://localhost:3001/products?id=${product.productId}`)
                );

                try {
                    const productDataResponses = await Promise.all(productDataPromises);

                    const newCartProducts = productDataResponses.map(response => response.data);

                    setCartProducts(prevCartProducts => [...newCartProducts]);
                } catch (error) {
                    console.error("Error fetching product data:", error);
                }
            };

            fetchProductData();
        }
    },[userInfoCartProduct])

    useEffect(() => {
        axios.get(`http://localhost:3001/cart-products`)
            .then(res => {
                const userCartProduct = res.data.find(item => item.userId === userInfo['uid']);
                setProductCartCount(userCartProduct['products'])
                setUserInfoCartProduct(userCartProduct);
                setCartCount(userCartProduct.products.length);
            })
            .catch(error => console.log(error));
    }, []);

    const orderCountPlusHandler = (productId) => {
        const productIndex = productCartCount.findIndex(item => item.productId === productId);
        if (productIndex !== -1) {
            const currentQuantity = productCartCount[productIndex].quantity || 0;
            const newQuantity = Math.min(currentQuantity + 1, 5);

            const updatedCart = [...productCartCount];
            updatedCart[productIndex].quantity = newQuantity;

            setProductCartCount(updatedCart);
        }
    };

    const orderCountMinusHandler = (productId) => {
        const productIndex = productCartCount.findIndex(item => item.productId === productId);
        if (productIndex !== -1) {
            const currentQuantity = productCartCount[productIndex].quantity || 0;
            const newQuantity = Math.max(currentQuantity - 1, 1);

            const updatedCart = [...productCartCount];
            updatedCart[productIndex].quantity = newQuantity;

            setProductCartCount(updatedCart);
        }
    };

    const deleteProduct = (productId) => {
        dispatchConfirm(showConfirmAction(true));
        dispatchConfirm(confirmOKAction({ state: true, productId: productId }));
    };


    // useEffect(() => {
    //
    //     axios.put(`http://localhost:3001/cart-products/${userInfo['uid']}`, productCartCount)
    //         .then(response => {
    //             console.log("ok")
    //         })
    //         .catch(error => {
    //             console.error('Error updating user cart:', error);
    //         });
    // }, [productCartCount])

    return (
        <>
            <div className={styles['cart_count_box']}>
                <button className={`${mode === 'dark' ? (`${styles['dark']} ${styles['local_mall']}`) : (styles['local_mall'])}`} onClick={cartCountHandler}>
                <span className="material-symbols-outlined">
                    local_mall
                </span>
                    <i className={styles['cart_count']}>{cartCount}</i>
                </button>
                {showCart && (
                    <div className={styles['cart_count_contents']}>
                        {cartProducts.map((item, index) => (
                            item.map((product, index) => (
                                <div key={index} className={styles['cart_count_content']}>
                                    <div className={styles['cart_count_content_left']}>
                                        {product.covers.map((cover, index) => (
                                            <img key={index} src={cover['1']} alt={`${product.title} - Cover ${index}`} width="100%" />
                                        ))}
                                    </div>
                                    <div className={styles['cart_count_content_right']}>
                                        <h4>{product.title}</h4>
                                        <div><span>{product.color}</span></div>
                                        {product.discount > 0 ? (
                                            <div>
                                                <span>قیمت: </span>
                                                <del>{product.price.toLocaleString('fa-IR')} تومان</del>
                                                <div>{Math.ceil(product.price - (product.price * (product.discount / 100))).toLocaleString('fa-IR')} تومان</div>
                                            </div>
                                        ) : (
                                            <div><span>قیمت: </span><span>{(product.price).toLocaleString('fa-IR')} تومان</span></div>
                                        )}

                                        <div className={styles['order_count']}>
                                            <button onClick={() => orderCountPlusHandler(product.id)}>+</button>
                                            <span>{(productCartCount.find(p => p.productId === product.id)).quantity}</span>
                                            {(productCartCount.find(p => p.productId === product.id)).quantity > 1 ? (
                                                <button onClick={() => orderCountMinusHandler(product.id)}>-</button>
                                            ) : (
                                                <button onClick={() => deleteProduct(product.id)}>
                                                    <svg fill="#ffffff" width="16px" height="16px"><path d="M 6.496094 1 C 5.675781 1 5 1.675781 5 2.496094 L 5 3 L 2 3 L 2 4 L 3 4 L 3 12.5 C 3 13.328125 3.671875 14 4.5 14 L 10.5 14 C 11.328125 14 12 13.328125 12 12.5 L 12 4 L 13 4 L 13 3 L 10 3 L 10 2.496094 C 10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2 L 8.503906 2 C 8.785156 2 9 2.214844 9 2.496094 L 9 3 L 6 3 L 6 2.496094 C 6 2.214844 6.214844 2 6.496094 2 Z M 5 5 L 6 5 L 6 12 L 5 12 Z M 7 5 L 8 5 L 8 12 L 7 12 Z M 9 5 L 10 5 L 10 12 L 9 12 Z"/></svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles['cart_count_content_footer']}>
                                        <div><span>جمع قیمت: </span>{product.discount > 0 ? (
                                            <span>{(Math.ceil(product.price - (product.price * (product.discount / 100))) * ((productCartCount.find(p => p.productId === product.id)).quantity)).toLocaleString('fa-IR')} تومان</span>
                                        ) : (
                                            <span>{(product.price * ((productCartCount.find(p => p.productId === product.id)).quantity)).toLocaleString('fa-IR')} تومان</span>
                                        )}
                                        </div>
                                        <button>خرید</button>
                                    </div>
                                </div>
                            ))
                        ))}
                    </div>
                )}
            </div>
            {userInfo && (
                <Confirm userId={userInfo['uid']} />
            )}
        </>
    );
};

export default CartCount;