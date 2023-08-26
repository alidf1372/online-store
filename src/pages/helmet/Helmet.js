import React from 'react';
import {Helmet} from "react-helmet-async";

const HelmetTag = ({title, description}) => {
    return (
        <Helmet>
            { /* Standard metadata tags */ }
            <title>{title}</title>
            <meta name='description' content={description} />
            { /* End standard metadata tags */ }
            { /* Facebook tags */ }
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:locale" content="fa_IR" />
            { /* End Facebook tags */ }
            { /* Twitter tags */ }
            <meta name="twitter:card" content="website" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            { /* End Twitter tags */ }
        </Helmet>
    );
};

export default HelmetTag;
