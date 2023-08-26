import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from "./profile-page.module.css";
import {Col, Row} from "react-bootstrap";
import {Loading} from "../index";
import { NavLink } from 'react-router-dom';
import moment from 'moment-jalaali';

const ProductsPurchaseInfo = () => {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [productInformation, setProductInformation] = useState([]);
    const [isLoadingProduct, setIsLoadingProduct] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3001/purchased-products/${userInfo['uid']}?userId=${userInfo['uid']}/products`)
            .then(res1 => {
                return res1.data['products'];
            })
            .then(response => {
                const productDataPromises = response.map(item => {
                    return axios.get(`http://localhost:3001/products/${item.productId}?id=${item.productId}`);
                });

                Promise.all(productDataPromises)
                    .then(productResponses => {
                        setIsLoadingProduct(false);
                        const combinedProducts = productResponses.map((item, index) => {
                            const productInfo = response[index];
                            return {
                                ...productInfo,
                                title: item.data['title'],
                                covers: item.data['covers']
                            };
                        });
                        setProductInformation(combinedProducts);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }, []);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        const formattedNumber = parseInt(`${year}${month}${day}${hours}${minutes}${seconds}`, 10);
        return formattedNumber;
    };

    return (
        <>
            <Col xs={12}>
                <header className={styles['header_section']}>
                    <h4>
                        <span>محصولات خریداری شده</span>
                    </h4>
                </header>
                <Row>
                    {isLoadingProduct ? (
                        <Loading />
                    ) : (
                        productInformation.map((product, index) => (
                            <Col xs={12} sm={6} className={styles['product_info_contents']} key={product['productId']}>
                                <NavLink to={`/product/${product['productId']}`}>
                                    <img src={product['covers'][0]['1']} alt={product['title']} width="70"/>
                                </NavLink>
                                <div className={styles['product_info_content']}>
                                    <NavLink to={`/product/${product['productId']}`}>
                                        <p>{product['title']}</p>
                                    </NavLink>
                                    <div><span>تعداد : </span><span>{product['quantity']}</span></div>
                                    <div>
                                        <span>تاریخ ثبت سفارش : </span><span>{moment(formatTimestamp(product['timestamp']), 'YYYYMMDDHHmmss').format('jYYYY/jMM/jDD - HH:mm:ss')}</span>
                                    </div>
                                </div>
                            </Col>
                        ))
                    )}
                </Row>
            </Col>
        </>
    );
};

export default ProductsPurchaseInfo;
