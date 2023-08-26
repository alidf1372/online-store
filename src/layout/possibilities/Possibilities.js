import React from 'react';
import styles from './possibilities.module.css';
import {Col, Row} from "react-bootstrap";

const Possibilities = () => {
    return (
        <Col xs={12}>
            <Row>
                <Col md={2} sm={4} xs={6}>
                    <div className={styles['possibility_card']}>
                        <span className="material-symbols-outlined">security</span>
                        <span>امنیت بالا</span>
                    </div>
                </Col>
                <Col md={2} sm={4} xs={6}>
                    <div className={styles['possibility_card']}>
                        <span className="material-symbols-outlined">support_agent</span>
                        <span>پشتیبانی 24 ساعته</span>
                    </div>
                </Col>
                <Col md={2} sm={4} xs={6}>
                    <div className={styles['possibility_card']}>
                        <span className="material-symbols-outlined">local_shipping</span>
                        <span>ارسال سریع محصولات</span>
                    </div>
                </Col>
                <Col md={2} sm={4} xs={6}>
                    <div className={styles['possibility_card']}>
                        <span className="material-symbols-outlined">workspace_premium</span>
                        <span>تضمین اصالت و کیفیت</span>
                    </div>
                </Col>
                <Col md={2} sm={4} xs={6}>
                    <div className={styles['possibility_card']}>
                        <span className="material-symbols-outlined">local_atm</span>
                        <span>پرداخت با تمامی کارت ها</span>
                    </div>
                </Col>
                <Col md={2} sm={4} xs={6}>
                    <div className={styles['possibility_card']}>
                        <span className="material-symbols-outlined">price_check</span>
                        <span>قیمت های رقابتی</span>
                    </div>
                </Col>
            </Row>
        </Col>
    );
};

export default Possibilities;
