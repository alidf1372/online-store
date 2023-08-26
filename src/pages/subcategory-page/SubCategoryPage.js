import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {NavLink, useParams} from "react-router-dom";
import axios from "axios";
import styles from "../../layout/main/main.module.css";
import {HelmetTag} from "../index";

const SubCategoryPage = () => {

    const title = 'فروشگاه آنلاین - لیست محصولات';
    const description = 'لیست محصولات بر اساس دسته بندی های متنوع و به تفکیک جهت خرید و انتخاب راحت کاربران';

    const {subcategoryId} = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    useEffect(() => {
        axios.get(`http://localhost:3001/products?subcategoryId=${subcategoryId}`)
            .then(res => {
                setProducts(res.data);
            })
    }, [products]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    console.log("products")

    return (
        <>
            <HelmetTag title={title} description={description} />

            <Container>
                <Row>
                    {currentProducts.map(product => (
                        <Col key={product.id} md={3} sm={6} xs={12} className={styles['card_contents']}>
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
            </Container>
        </>
    );
};

export default SubCategoryPage;
