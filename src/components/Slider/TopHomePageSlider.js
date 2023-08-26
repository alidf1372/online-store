import React, { useEffect } from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import  styles from './top-home-page-slider.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiscountProductsThunk } from '../../redux/fetchData';
import {SwiperSlide} from "swiper/react";
import {Autoplay, Scrollbar} from "swiper/modules";
import {Loading} from "../index";

const TopHomePageSlider = () => {
    const dispatch = useDispatch();
    const { discountProducts, loading, error } = useSelector((state) => state.fetchData);

    useEffect(() => {
        dispatch(fetchDiscountProductsThunk());
    },[]);

    if (loading) {
        return (
            <Loading />
        );
    }

    // if(discountProducts && discountProducts.length > 0) {
        return (
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                scrollbar={{
                    hide: true,
                }}
                modules={[Autoplay, Scrollbar]}
            >
                {discountProducts && (
    discountProducts.map(item => (
        <SwiperSlide key={item.id} className={styles['slider_contents']}>
            {item.covers.map((cover, index) => (
                <img key={index} src={cover['1']} alt={`${item.title} - Cover ${index}`} width="400" />
            ))}
            <div className={styles['slider_content']}>
                <h3>{item.title}</h3>
                <div>با <span className={styles['discount']}>{item.discount}</span> درصد تخفیف</div>
                <del>{item.price.toLocaleString('fa-IR')} تومان</del>
                <div className={styles['price_discount']}>
                    {Math.ceil(item.price - (item.price * (item.discount / 100))).toLocaleString('fa-IR')} تومان
                </div>
            </div>
        </SwiperSlide>
    ))
)}

            </Swiper>
        );
    // }
};

export default TopHomePageSlider;
