import React from 'react';
import { useParams } from 'react-router';

const ProductDetails = () => {
    const {id} = useParams();
    console.log(id);
    return (
        <div>
            <p>This is details page</p>
            <p>id is {id}</p>
        </div>
    );
};

export default ProductDetails;