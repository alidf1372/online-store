import React, { useEffect, useState } from 'react';
import styles from '../../pages/products_page/products-page.module.css';
import axios from 'axios';

const ProductsPriceAndStock = ({ product }) => {
    const [orderCount, setOrderCount] = useState(1);
    const [message, setMessage] = useState('');
    const [cartProducts, setCartProducts] = useState([]);

    const orderCountPlusHandler = () => {
        if (orderCount < 5) {
            setOrderCount(orderCount => orderCount + 1);
        }
    };

    const orderCountMinusHandler = () => {
        if (orderCount > 1) {
            setOrderCount(orderCount => orderCount - 1);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:3001/cart-products')
            .then(response => {
                setCartProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching cart products:', error);
            });
    }, []);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (localStorage.getItem('isLogin')) {
            const existingUserCart = cartProducts.find(item => item.userId === userInfo['uid']);

            if (existingUserCart) {
                const existingProductInCart = existingUserCart.products.find(item => item.productId === product.id);

                if (existingProductInCart) {
                    setMessage('این محصول در سبد خرید شما موجود است.');
                }
            }
        }
    }, [cartProducts, product.id, userInfo]);

    const productBuyHandler = () => {
        if (localStorage.getItem('isLogin')) {
            const existingUserCart = cartProducts.find(item => item.userId === userInfo['uid']);

            if (existingUserCart) {
                const existingProductInCart = existingUserCart.products.find(item => item.productId === product.id);

                if (existingProductInCart) {
                    setMessage('این محصول قبلا به سبد خرید شما اضافه شده است.');
                } else {
                    const updatedCartProducts = cartProducts.map(item => {
                        if (item.userId === userInfo['uid']) {
                            return {
                                ...item,
                                products: [
                                    ...item.products,
                                    {
                                        productId: product.id,
                                        quantity: orderCount,
                                        timestamp: new Date().toISOString(),
                                    },
                                ],
                            };
                        }
                        return item;
                    });

                    axios.put(`http://localhost:3001/cart-products/${existingUserCart.id}?userId=${userInfo['uid']}`, updatedCartProducts)
                        .then(response => {
                            setMessage('محصول با موفقیت به سبد خرید اضافه شد.');
                            setCartProducts(updatedCartProducts);
                        })
                        .catch(error => {
                            console.error('Error updating cart products:', error);
                        });
                }
            } else {
                const newCartItem = {
                    userId: userInfo['uid'],
                    products: [
                        {
                            productId: product.id,
                            quantity: orderCount,
                            timestamp: new Date().toISOString(),
                        },
                    ],
                };

                axios.post('http://localhost:3001/cart-products', newCartItem)
                    .then(response => {
                        setMessage('محصول با موفقیت به سبد خرید اضافه شد.');
                        setCartProducts([...cartProducts, newCartItem]);
                    })
                    .catch(error => {
                        console.error('Error adding product to cart:', error);
                    });
            }
        } else {
            setMessage(
                'کاربر گرامی به منظور افزودن محصول به سبد خرید، لطفا ابتدا وارد حساب کاربری خود شوید.'
            );
        }
    };

    return (
        <div className={styles['product_info_price']}>
            {product.discount > 0 ? (
                <div>
                    <span>قیمت: </span>
                    <del>{product.price.toLocaleString('fa-IR')} تومان</del>
                    <div>{(Math.ceil(product.price - (product.price * (product.discount / 100))) * orderCount).toLocaleString('fa-IR')} تومان</div>
                </div>
            ) : (
                <div><span>قیمت: </span><span>{(product.price * orderCount).toLocaleString('fa-IR')} تومان</span></div>
            )}
            {product.stock > 0 ? (
                <>
                    <div className={styles['order_count']}>
                        <button onClick={orderCountPlusHandler}>+</button>
                        <span>{orderCount}</span>
                        <button onClick={orderCountMinusHandler}>-</button>
                    </div>
                    {product.stock < 6 && (
                        <div className={styles['product_stock']}>تنها {product.stock} عدد در انبار باقی مانده است</div>
                    )}
                </>
            ) : (
                <div className={styles['unavailable']}>نا موجود</div>
            )}
            <div className={styles['buy_message']}>{message}</div>
            <button className={styles[`${product.stock === 0 ? 'disabled' : 'add_card'}`]} disabled={product.stock === 0 && true} onClick={productBuyHandler}>افزودن به سبد خرید</button>
        </div>
    );
};

export default ProductsPriceAndStock;
