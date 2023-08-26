import React from 'react';
import 'swiper/css';
import 'swiper/css/effect-flip';
import { Autoplay, EffectFlip } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '../../pages/products_page/products-page.module.css'

const ProductsImages = ({ covers, product }) => {
    return (
        <Swiper
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            effect={'flip'}
            grabCursor={true}
            modules={[Autoplay, EffectFlip]}
        >
            {covers.map(cover => (
                Object.keys(cover).map((coverKey, index) => (
                    <SwiperSlide key={index}>
                        <img src={cover[coverKey]} alt={product.title} className={styles['product_img']} width="404" />
                        {product.discount > 0 && <span className={styles['discount_product']}>{product.discount} % off</span>}
                    </SwiperSlide>
                ))
            ))}
        </Swiper>
    );
};

export default ProductsImages;
