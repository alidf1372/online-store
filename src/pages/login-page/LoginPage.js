import React, {useRef, useState} from 'react';
import styles from './login.module.css';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../../redux/login";
import { useNavigate, NavLink } from "react-router-dom";
import {HelmetTag} from "../index";

const Login = () => {

    const title = 'فروشگاه آنلاین - ورود اعضا';
    const description = 'ورود اعضا به منظور دسترسی به امکانات سایت و خرید آنلاین';

    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const mode = useSelector((state) => state.mode.mode);

    const userRef = useRef();
    const passRef = useRef();
    const dispatch = useDispatch();

    const submitHandler = async (event) => {
        event.preventDefault();

        let result = await axios.get(`http://localhost:3001/users?userName=${userRef.current.value}&password=${passRef.current.value}`)

        if (result.data && result.data.length > 0) {
            dispatch(signIn(result.data[0]));
            navigate('/');
        } else {
            setMessage("نام کاربری یا کلمه عبور اشتباه است.");
        }

    }

    return (
        <>
            <HelmetTag title={title} description={description} />

            <form className={`${mode === 'dark' ? (`${styles['dark-login-form']} ${styles['login-form']}`) : (styles['login-form'])}`} onSubmit={submitHandler}>

                <div className={styles['login-title']}>
                    <span className={`${styles['login_icon']} material-symbols-outlined`}>passkey</span>
                    <span>فرم ورود اعضا</span>
                    <div className={styles['login_message']}>{message}</div>
                </div>

                <label htmlFor="user-name"> نام کاربری:</label>
                <input type="text" name="userName" id="user-name" ref={userRef}/>

                <label htmlFor="password">کلمه عبور: </label>
                <input type="password" name="password" id="password" ref={passRef} />

                <div className={styles["form-footer"]}>
                    <button type="submit">ورود</button>
                    <button type="button">لغو</button>
                </div>

                <div className={styles['register']}><NavLink to={'/register'}>
                    <span className="material-symbols-outlined">how_to_reg</span>
                    ثبت نام
                </NavLink></div>
            </form>
        </>
    );
};

export default Login;
