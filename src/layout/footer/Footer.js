import React from 'react';
import styles from './footer.module.css';
import {Col, Container, Row} from "react-bootstrap";
import logo from "../../logo.svg";

const Footer = () => {
    return (
        <Container as={"footer"} fluid={true} className={styles['footer']}>
            <Container>
                <Row className={styles['footer_contents']}>
                    <Col sm={9}>
                        <div className={styles['about']}>
                            به دنیای رنگارنگ مد و شیک پوشی خوش آمدید! در فروشگاه ما، زیبایی و انعطاف پذیری به یکپارچه تجربه می‌شوند. با مجموعه ای از جدیدترین لباس‌ها و اکسسوری‌ها، به شما امکان می‌دهیم تا سبک خود را به آزادی بیان کنید. با ما، مدی جدید را تجربه کنید و خود را با لباس‌هایی که به شما اعتماد به نفس می‌بخشند، همراه کنید.
                        </div>
                    </Col>
                    <Col sm={3}>
                        <img src={logo} className={styles['logo_img']} alt="logo" width="120" height="120"/>
                    </Col>
                    <Col xs={12}>
                        <span className={styles['copyright']}>
                            &copy; کلیه حقوق این وب‌سایت متعلق به فروشگاه آنلاین می‌باشد.
                        </span>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default Footer;
