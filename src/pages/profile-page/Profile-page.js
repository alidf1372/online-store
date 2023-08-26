import React from 'react';
import {Container, Row} from "react-bootstrap";
import { PersonalInformation, ProductsPurchaseInfo } from "../../components";

const ProfilePage = () => {

    return (
        <Container>
            <Row>
                <PersonalInformation />
                <ProductsPurchaseInfo />
            </Row>
        </Container>
    );
};

export default ProfilePage;
