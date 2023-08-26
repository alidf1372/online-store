import React, {useState, useRef} from 'react';
import styles from "./register-page.module.css";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";
import {HelmetTag} from "../index";

const RegisterPage = () => {

    const title = 'فروشگاه آنلاین - ثبت نام';
    const description = 'ثبت نام اعضا به منظور دسترسی به امکانات سایت و خرید آنلاین';

    const [message, setMessage] = useState("");
    const [validate, setValidate] = useState(false);
    const mode = useSelector((state) => state.mode.mode);

    let registerInfo = {
        'userName': '',
        'full-name': '',
        'email': '',
        'password': '',
        'address': '',
        'postal-code': '',
        'phone-number': '',
        'id-number': '',
        'birthday': ''
    };

    const fullNameRef = useRef();
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const postalCodeRef = useRef();
    const phoneNumberRef = useRef();
    const idNumberRef = useRef();
    const birthdayRef = useRef();
    const addressRef = useRef();

    const validateForm = async (info) => {

        const dictionary = {
            'userName': 'نام کاربری',
            'full-name': 'نام و ناو خانوادگی',
            'email': 'ایمیل',
            'password': 'کلمه عبور',
            'address': 'آدرس محل سکونت',
            'postal-code': 'کد پستی',
            'phone-number': 'شماره همراه',
            'id-number': 'کد ملی',
            'birthday': 'تاریخ تولد'
        }

        for (const value of Object.keys(info)) {
            if (info[value] === '') {
                setMessage(`فیلد ${dictionary[value]} خالی است`);
                setValidate(false);
                return;
            }
            if (value == 'email' || value == 'userName' || value == 'phone-number') {
                try {
                    const res = await axios.get(`http://localhost:3001/users?${value}=${info[value]}`);
                    if (res.data.length > 0) {
                        setMessage(`این ${dictionary[value]} قبلا ثبت شده است`);
                        setValidate(false);
                        return;
                    } else {
                        return setValidate(true);
                    }
                } catch (error) {
                    setMessage('خطایی رخ داده است.');
                    setValidate(false);
                    return;
                }
            }
        }
    }


    const submitHandler = async (e) => {
        e.preventDefault();

        registerInfo = {
            'userName': userNameRef.current.value,
            'full-name': fullNameRef.current.value,
            'email': emailRef.current.value,
            'password': passwordRef.current.value,
            'address': addressRef.current.value,
            'postal-code': postalCodeRef.current.value,
            'phone-number': phoneNumberRef.current.value,
            'id-number': idNumberRef.current.value,
            'birthday': birthdayRef.current.value
        };

        await validateForm(registerInfo);

        if(validate) {
            axios.put(`http://localhost:3001/users`, registerInfo)
                .then(response => {
                    setMessage('ثبت نام با موفقیت انجام شد.');
                })
                .catch(error => {
                    console.error('Error updating cart products:', error);
                });
        }
    }


    return (
        <>
            <HelmetTag title={title} description={description} />

            <form className={`${mode === 'dark' ? (`${styles['dark-register-form']} ${styles['register-form']}`) : (styles['register-form'])}`} onSubmit={submitHandler}>

                <div className={styles['register-title']}>
                    <span className={`${styles['register_icon']} material-symbols-outlined `}>how_to_reg</span>
                    <span>فرم ثبت نام</span>
                    <div className={styles['register_message']}>{message}</div>
                </div>

                <label htmlFor="full-name"> نام و نام خانوادگی : </label>
                <input type="text" name="full-name" id="full-name" ref={fullNameRef} />

                <label htmlFor="userName">نام کاربری : </label>
                <input type="text" name="userName" id="user-name" ref={userNameRef} />

                <label htmlFor="email"> آدرس ایمیل : </label>
                <input type="email" name="email" id="email" ref={emailRef} />

                <label htmlFor="password">رمز عبور : </label>
                <input type="password" name="password" id="password" ref={passwordRef} />

                <label htmlFor="postal-code"> کد پستی : </label>
                <input type="number" name="postal-code" id="postal-code" ref={postalCodeRef} />

                <label htmlFor="phone-number">شماره همراه : </label>
                <input type="text" name="phone-number" id="phone-number" ref={phoneNumberRef} />

                <label htmlFor="id-number"> کد ملی : </label>
                <input type="text" name="id-number" id="id-number" ref={idNumberRef} />

                <label htmlFor="birthday">تاریخ تولد : </label>
                <input type="text" name="birthday" id="birthday" ref={birthdayRef} />

                <label htmlFor="address">آدرس محل سکونت : </label>
                <textarea name="address" id="address" ref={addressRef} />

                <div className={styles["form-footer"]}>
                    <button type="submit">ثبت نام</button>
                    <button type="button">لغو</button>
                </div>

                <div className={styles['register']}><NavLink to={'/login'}>
                    <span className="material-symbols-outlined">passkey</span>
                    ورود اعضا
                </NavLink></div>
            </form>
        </>
    );
};

export default RegisterPage;
