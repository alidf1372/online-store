import React, {useEffect, useState} from 'react';
import styles from './main.module.css'
import {Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Loading} from "../../components";
import { fetchAllProductsThunk } from "../../redux/fetchData";
import { NavLink } from "react-router-dom";

const Main = () => {

    const dispatchProduct = useDispatch();
    const {allProducts, loading, error} = useSelector((state) => state.fetchData);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(allProducts.length / productsPerPage);

    useEffect(() => {
        dispatchProduct(fetchAllProductsThunk(`products`));
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if(loading) {
        return (
            <Loading />
        )
    }
    if (error) {
        return (
            <>
                <Col as={"main"} md={9}>
                    <Row>
                        <div className={styles['error_message']}>محصولی جهت نمایش وجود ندارد</div>
                    </Row>
                </Col>
            </>
        )
    }
    if (currentProducts) {
        return (
            <Col as={"main"} md={9}>
                <Row>
                    {currentProducts.map(product => (
                        <Col key={product.id} md={4} sm={6} xs={12} className={styles['card_contents']}>
                            <div className={styles['product_contents']}>
                                <NavLink to={`/product/${product.id}`}>
                                    {product.covers.map((cover, index) => (
                                        <img key={index} src={cover['1']} alt={`${product.title} - Cover ${index}`} width="240" />
                                    ))}
                                    <div className={styles['product_content']}>
                                        <h4 className={styles['product_title']}>{product.title}</h4>
                                        {product.discount > 0 ? (
                                            <>
                                                <span className={styles['discount_product']}>{product.discount} % off</span>
                                                <del>{product.price.toLocaleString('fa-IR')} تومان</del>
                                                <div className={styles['price_discount']}>
                                                    {Math.ceil(product.price - (product.price * (product.discount / 100))).toLocaleString('fa-IR')} تومان
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className={styles['price_discount']}>
                                                    {product.price.toLocaleString('fa-IR')} تومان
                                                </div>
                                            </>
                                        )}

                                    </div>
                                </NavLink>
                            </div>
                        </Col>
                    ))}
                </Row>
                <div className={styles['pagination']}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? styles['active'] : ''}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </Col>
        );
    }
};

export default Main;
