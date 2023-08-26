import React from 'react';
import styles from '../../layout/header/header.module.css'
import {useDispatch, useSelector} from "react-redux";
import {showConfirmAction, confirmOKAction} from "../../redux/confirm";
import axios from "axios";

const Confirm = ({userId}) => {

    const showConfirmbox = useSelector(state => state.confirm);

    const dispatchConfirm = useDispatch()
    const confirmState = useSelector(state => state.confirm.confirmOK.state);
    const confirmProductId = useSelector(state => state.confirm.confirmOK.productId);

    const showConfirmHandler = () => {
        if(confirmState) {
            axios.get('http://localhost:3001/cart-products')
                .then(response => {
                    const cartProduct = response.data.find(cart => cart.userId === userId);
                    if (cartProduct) {
                        const updatedProducts = cartProduct.products.filter(product => product.productId !== confirmProductId);
                        axios.patch(`http://localhost:3001/cart-products/${cartProduct.id}`, { products: updatedProducts })
                            .then(response => {
                                console.log('Product deleted successfully.');
                                dispatchConfirm(showConfirmAction(false));
                                window. location. reload();
                            })
                            .catch(error => {
                                console.error('Error deleting product:', error);
                            });
                    } else {
                        console.log('User cart not found.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching user carts:', error);
                });
        }
    }

    const cancelHandler = () => {
        dispatchConfirm(confirmOKAction({ state: false, productId: 0 }));
        dispatchConfirm(showConfirmAction(false));
    }

    return (
        showConfirmbox.showConfirmContent && (
            <div className={styles['confirm_contents']}>
                <div className={styles['popup-content']}>
                    <p>آیا از حذف محصول مطمئن هستید؟</p>
                    <button onClick={showConfirmHandler}>تأیید</button>
                    <button onClick={cancelHandler}>لغو</button>
                </div>
            </div>
        )
    );
};

export default Confirm;
