import React from 'react';
import styles from './home-page.module.css'
import {Col, Container, Row} from "react-bootstrap";
import { TopHomePageSlider } from "../../components";
import {Main, Possibilities, SideBar} from "../../layout";
import {HelmetTag} from "../index";

const HomePage = () => {

    const title = 'فروشگاه آنلاین - خانه';
    const description = 'در فروشگاه ما، با مجموعه ای از جدیدترین لباس‌ها و اکسسوری‌ها، به شما امکان می‌دهیم تا سبک خود را به آزادی بیان کنید.';

    return (
        <>

            <HelmetTag title={title} description={description} />

            <Container>
                <Row as={"section"}>
                    <Col as={"article"} xs={12} className={styles['slider_box']}>
                        <TopHomePageSlider />
                    </Col>
                </Row>
                <Row as={"section"} style={{marginBottom: 20}}>
                    <SideBar />
                    <Main />
                </Row>
                <Row as={"section"}>
                    <Possibilities />
                </Row>
            </Container>
        </>
    );
};

export default HomePage;
