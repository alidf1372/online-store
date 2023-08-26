import React, { Fragment, useEffect, useState } from 'react';
import styles from './sidebar.module.css';
import { Col } from "react-bootstrap";
import axios from "axios";
import { fetchAllProductsThunk } from "../../redux/fetchData";
import { useDispatch } from "react-redux";

const SideBar = () => {
    const [selectedFilters, setSelectedFilters] = useState({ subcategories: [] });
    const dispatchProduct = useDispatch();

    useEffect(() => {
        const filters = [];

        if (selectedFilters.subcategories.length > 0) {
            filters.push(`subcategoryId=${selectedFilters.subcategories.join('&subcategoryId=')}`);
        }

        const queryString = filters.length > 0 ? filters.join('&') : '';
        const endpoint = queryString ? `products?${queryString}` : 'products';

        dispatchProduct(fetchAllProductsThunk(endpoint));
    }, [selectedFilters]);

    const handleFilterChange = (event) => {
        const filterValue = event.target.value;
        const filterType = event.target.id.includes('subcategory') ? 'subcategories' : 'categories';

        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: event.target.checked
                ? [...prevFilters[filterType], filterValue]
                : prevFilters[filterType].filter(filter => filter !== filterValue),
        }));
    }

    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/categories')
            .then(res => {
                setCategory(res.data);
            })
            .catch(error => {
                console.log("Error fetching categories:", error);
            });
    }, []);

    return (
        <Col as={"aside"} md={3} className={styles['sidebar']}>
            {category.length > 0 ? (
                <div className={styles['sidebar_contents']}>
                    {category.map(item => (
                        <Fragment key={item.id}>
                            <div className={styles['category']}>
                                <span className={styles['category_item']}>{item.name}</span>
                            </div>
                            {item.subcategories.map(subcategory => (
                                <div key={subcategory.id} className={styles['subcategory']}>
                                    <input
                                        type="checkbox"
                                        id={`subcategory_${subcategory.id}`}
                                        onChange={handleFilterChange}
                                        className={styles['subcategory_item']}
                                        value={subcategory.id}
                                    />
                                    <label htmlFor={`subcategory_${subcategory.id}`}>{subcategory.name}</label>
                                </div>
                            ))}
                        </Fragment>
                    ))}
                </div>
            ) : (
                <div>
                    مشکلی در لود محتوا ایجاد شده است.
                </div>
            )}
        </Col>
    );
};

export default SideBar;
