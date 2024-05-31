import React from "react";
import {useSelector} from "react-redux"
import {RootState} from "../redux/productStore";
import "../styles/ProductDetails.css"

const ProductDetails: React.FC = () => {
    const product = useSelector((state: RootState) => state.products.productData)

    if (!product) {
        return <div>No product details available</div>;
    }

    return (
        <div className={"product-details"}>
            <img src={product.image} alt={product.title} className={"product-image"} />
            <h1>{product.title}</h1>
            <h2>{product.subtitle}</h2>
            <div className={"product-tags-container"}>
                <div className={"product-tags"}>
                    {product.tags && product.tags.map((tag, index) => (
                        <span key={index} className={"tag"}>{tag}</span>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ProductDetails;