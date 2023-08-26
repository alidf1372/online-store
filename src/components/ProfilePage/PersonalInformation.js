import React, {useState, useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import styles from "./profile-page.module.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Loading} from "../index";

const PersonalInformation = () => {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [userInformation, setUserInformation] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        if(!userInfo) {
            navigate('/login');
            return;
        }

        axios.get(`http://localhost:3001/users/${userInfo['uid']}?id=${userInfo['uid']}`)
            .then(res => {
                setUserInformation(res.data);
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    },[]);

    const handleInputChange = (event, key) => {
        const newValue = event.target.value;
        setUserInformation(prevUserInformation => ({
            ...prevUserInformation,
            [key]: newValue
        }));
    };

    const saveInformationHandler = () => {
        axios.put(`http://localhost:3001/users/${userInfo['uid']}?id=${userInfo['uid']}`, userInformation)
            .then(response => {
                setMessage("اطلاعات ویرایش شد.");
                console.log("Data has been updated:", response.data);
                // You might want to update the userInformation state here if needed
            })
            .catch(error => {
                setMessage("مشکلی در ویرایش اطلاعات بوجود آمده است. لطفا بعدا مجدد تلاش نمایید.");
                console.error("Error updating data:", error);
            });
    };

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isLogin');
        navigate('/');
        return;
    }

    if(isLoading) {
        return (
            <Loading />
        )
    }else{
        return (
            <>
                <Col as={"header"} className={`${styles['header']} d-flex justify-content-between`} xs={12}>
                    <h3>پروفایل کاربر</h3>
                    <button className={styles['logout']} onClick={logoutHandler}><span className="material-symbols-outlined">move_item</span>خروج از حساب </button>
                </Col>
                <Col xs={12}><p className={styles['message']}>{message}</p></Col>
                <Col xs={12} className={styles['personal_information']}>
                    <header className={styles['header_section']}>
                        <h4>
                            <span>مشخصات فردی</span>
                        </h4>
                    </header>
                    <Row as={"section"}>
                        <Col sm={6} className={`${styles['column']} d-grid`}>
                            <label htmlFor={"full-name"}>نام و نام خانوادگی : </label>
                            <input type="text" className={styles['full-name']} id="full-name"
                                   value={userInformation['full-name']} onChange={e => handleInputChange(e, 'full-name')}/>
                            <label htmlFor={"email"}>ایمیل : </label>
                            <input type="email" className={styles['email']} id="email"
                                   value={userInformation['email']} onChange={e => handleInputChange(e, 'email')}/>
                            <label htmlFor={"phon-number"}>شماره همراه : </label>
                            <input type="text" className={styles['phon-number']} id="phon-number"
                                   value={userInformation['phone-number']} onChange={e => handleInputChange(e, 'phon-number')}/>
                        </Col>
                        <Col sm={6} className={`${styles['column']} d-grid`}>
                            <label htmlFor={"birthday"}>تاریخ تولد : </label>
                            <input type="text" className={styles['birthday']} id="birthday" value={userInformation['birthday']} onChange={e => handleInputChange(e, 'birthday')}/>
                            <label htmlFor={"id-number"}>کد ملی : </label>
                            <input type="text" className={styles['id-number']} id="id-number" value={userInformation['id-number']} onChange={e => handleInputChange(e, 'id-number')}/>
                            <label htmlFor={"postal-code"}>کد پستی : </label>
                            <input type="number" className={styles['postal-code']} id="postal-code" value={userInformation['postal-code']} onChange={e => handleInputChange(e, 'postal-code')}/>
                        </Col>
                        <Col sm={6} className={`${styles['column']} d-grid`}>
                            <label htmlFor={"address"}>آدرس : </label>
                            <textarea className={styles['address']} id="address" value={userInformation['address']} onChange={e => handleInputChange(e, 'address')}/>
                        </Col>
                        <Col sm={12}>
                            <button className={styles['save_info']} type="submit" onClick={saveInformationHandler}>ویرایش اطلاعات</button>
                        </Col>
                    </Row>
                </Col>
            </>
        );
    }
};

export default PersonalInformation;
