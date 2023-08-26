import React from 'react';
import {Container, Col, Row} from "react-bootstrap";
import styles from './notfound-page.module.css';
import {HelmetTag} from "../index";

const NotFound = () => {

    const title = 'فروشگاه آنلاین - صفحه 404';
    const description = 'در فروشگاه ما، با مجموعه ای از جدیدترین لباس‌ها و اکسسوری‌ها، به شما امکان می‌دهیم تا سبک خود را به آزادی بیان کنید.';

    return (
        <>
            <HelmetTag title={title} description={description} />

            <Container>
                <Row>
                    <Col xs={12} className={styles['contents']}>
                        <div className={styles['status']}>404</div>
                        <h1 className={styles['content']}>محتوایی یافت نشد</h1>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default NotFound;
