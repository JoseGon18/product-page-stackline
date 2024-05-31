import React, { useEffect, useState } from 'react';
import './styles/App.css';
import ProductDetails from './components/ProductDetails';
import ProductGraph from "./components/ProductGraph";
import ProductTable from "./components/ProductTable";
import Header from './components/Header';
import { Provider, useDispatch } from 'react-redux';
import { productStore } from './redux/productStore';
import { setProductData } from './redux/productSlice';
import productData from './assets/stackline_frontend_assessment_data_2021.json';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Fetching product data...');
        setTimeout(() => {
            const fetchedProduct = productData[0]; // Assuming the first product in the JSON
            dispatch(setProductData(fetchedProduct));
            setLoading(false);
            console.log('Product data fetched and dispatched:', fetchedProduct);
        }, 1000); // Simulated fetch delay
    }, [dispatch]);

    return (
        <div className="app">
            <Header />
            <div className="content">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <div className={"left-panel"}>
                            <ProductDetails/>
                        </div>
                        <div className={"right-panel"}>
                            <ProductGraph/>
                            <div className={"table-container"}>
                                <ProductTable/>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const AppWrapper: React.FC = () => (
    <Provider store={productStore}>
        <App />
    </Provider>
);

export default AppWrapper;
