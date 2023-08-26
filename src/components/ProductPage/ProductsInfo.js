// ProductsPurchaseInfo.js
import React from 'react';
import styles from '../../pages/products_page/products-page.module.css';

const ProductsInfo = ({ product, categoryName, brandName }) => {
    return (
        <div className={styles['product_info_content']}>
            <h2 className={styles['product_title']}>{product.title}</h2>
            <div><span>دسته: </span><span>{categoryName}</span></div>
            {brandName && <div><span>برند: </span><span>{brandName}</span></div>}
            <div><span>سایز: </span><span>{product.size}</span></div>
            <div><span>رنگ بندی: </span><span>{product.color}</span></div>
            {product.description && <div><span>توضیحات: </span><span>{product.description}</span></div>}
        </div>
    );
};

export default ProductsInfo;

