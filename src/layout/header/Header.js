import React, {Fragment, useEffect, useState} from 'react';
import logo from '../../logo.svg';
import styles from './header.module.css';
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { NavLink } from "react-router-dom";
import {toggleMode} from "../../redux/light-dark-mode";
import axios from "axios";
import {CartCount, Search} from "../../components";
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const loginStorage = localStorage.getItem('isLogin');

    const navigate = useNavigate();
    const navigateLogin = useNavigate();

    //Drop Down menu
    const [showMenu, setShowMenu] = useState(false);

    const showMenuHandler = () => {
        setShowMenu(!showMenu);
    }
    //Drop Down menu

    //get Category Name && CartCount
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/categories')
            .then(res => {
                setCategory(res.data);
            })
            .catch(console.log("error"));
    },[])
    //get Category Name && CartCount

    //Dark && Light Mode
    const dispatchMode = useDispatch();
    const mode = useSelector((state) => state.mode.mode);

    const modeHandler = () => {
        dispatchMode(toggleMode());
    }
    //Dark && Light Mode

    return (
        <Container fluid={true}>
            <header className={styles['header']}>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <Row as={"section"} className={`${styles['top_section']} flex-row justify-content-between align-items-center`}>
                                <Col lg={3} md={4} sm={12} className={`${styles['logo']} d-flex flex-row flex-nowrap justify-content-start align-items-center`} onClick={() => navigate("/")}>
                                    <img src={logo} className={styles['logo_img']} alt="logo" width="60" height="60"/>
                                    <span>فروشگاه </span>
                                    <span>آنلاین</span>
                                </Col>
                                <Col lg={6} md={4} sm={6} className={`${styles['search_box']} position-relative`}>
                                    <Search />
                                </Col>
                                <Col lg={3} md={4} sm={6} className="d-flex flex-row flex-nowrap justify-content-end">
                                    <CartCount />
                                    <button className={`${mode === 'dark' ? (`${styles['dark']} ${styles['dark_mode']}`) : (styles['dark_mode'])}`} onClick={modeHandler}>
                                        {mode === 'dark' ? (
                                            <span className="material-symbols-outlined">light_mode</span>
                                        ) : (
                                            <span className="material-symbols-outlined">dark_mode</span>
                                        )}
                                    </button>
                                    {loginStorage ? (
                                        <button className={styles['login_btn']} onClick={() => navigateLogin('profile')}>
                                        <span className="material-symbols-outlined">
                                            person
                                        </span>
                                        </button>
                                    ) : (
                                        <button className={styles['login_btn']} onClick={() => navigateLogin('login')}>
                                        <span className="material-symbols-outlined">
                                            person
                                        </span>
                                            ورود و عضویت
                                        </button>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12}>
                            <Row as={"section"} className={styles['bottom_section']}>
                                <ul className={`${mode === 'dark' ? (styles['dark-menu']) : (styles['menu'])}`}>
                                    <li className={`${mode === 'dark' ? (`${styles['dark_menu_list']} ${styles['menu_list']}`) : (styles['menu_list'])}`} onClick={showMenuHandler}>دسته بندی ها
                                        <span className={`${styles['arrow_down']} material-symbols-outlined`}>arrow_drop_down</span>
                                    </li>
                                    <ul className={`${styles['sub_menu']} ${showMenu ? styles['show'] : ''}`}>
                                        {category.map(item => (
                                            <div key={item.id} className={styles['sub_menu_content']}>
                                                <li className={styles['sub_menu_item']}>
                                                    <NavLink to={`category/${item.id}`}>{item.name}</NavLink>
                                                </li>
                                                {item.subcategories.map(subItem => (
                                                    <Fragment key={subItem.id}>
                                                        <li>
                                                            <NavLink to={`subcategory/${subItem.id}`}>{subItem.name}</NavLink>
                                                        </li>
                                                    </Fragment>
                                                ))}
                                            </div>
                                        ))}
                                    </ul>
                                </ul>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </header>
        </Container>
    );
};

export default Header;
