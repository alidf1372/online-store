import React, {Fragment, useEffect, useState} from 'react';
import styles from './products-page.module.css';
import 'swiper/css';
import 'swiper/css/effect-flip';
import {Col, Container, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import axios from "axios";
import {ProductsImages, ProductsInfo, ProductsPriceAndStock} from "../../components";
import {HelmetTag} from "../index";

const ProductsPage = () => {

    const title = 'فروشگاه آنلاین - صفحه محصول';
    const description = 'اطلاعات اختصاصی هر محصول و امکان بررسی و خرید برای کاربران';

    const { productId } = useParams();
    const [productInfo, setPrductInfo] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [brandName, setBrandName] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3001/products?id=${productId}`)
            .then(res1 => {
                const data1 = res1.data;
                    setPrductInfo(data1);
                    axios.get(`http://localhost:3001/categories`)
                        .then(res2 => {
                            const data2 = res2.data;
                            Object.values(data2).map((value) => {
                                if(value['id'] === data1[0]['categoryId']) {
                                    setCategoryName(value['name']);
                                }
                            })
                        })
                        .catch(error => console.log(error))
                    if(data1[0]['brand-id'] > 0) {
                        axios.get(`http://localhost:3001/brands`)
                            .then(res3 => {
                                const data3 = res3.data;
                                Object.values(data3).map((value => {
                                    if(value['id'] === data1[0]['brand-id']) {
                                        setBrandName(value['title']);
                                    }
                                }))
                            })
                            .catch(error => console.log(error))
                    }
                }
            )
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <HelmetTag title={title} description={description} />

            <Container style={{marginBottom: 40}}>
                <Row>
                    {productInfo.map(product => (
                        <Fragment key={product.id}>
                            <Col md={9}>
                                <Row>
                                    <Col sm={6}>
                                        <ProductsImages product={product} covers={product.covers} />
                                    </Col>
                                    <Col sm={6}>
                                        <ProductsInfo product={product} brandName={brandName} categoryName={categoryName} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={3} className={styles['product_sidebar']}>
                                <ProductsPriceAndStock product={product} />
                            </Col>
                        </Fragment>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default ProductsPage;
