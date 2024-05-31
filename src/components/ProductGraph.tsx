import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/productStore";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
import "../styles/ProductGraph.css";

const ProductGraph: React.FC = () => {
    const product = useSelector((state: RootState) => state.products.productData);

    if (!product || !product.sales) {
        return <div>No product sales data available</div>;
    }

    /*Turn following 4 variables assist in creating the x-axis with MMM format for the dates. At the same time it assists in
    * allowing for proper data plotting relative to the x-axis. */
    const formatMonth = (date: number) => {
        const options: Intl.DateTimeFormatOptions = { month: 'short' };
        return new Date(date).toLocaleString('en-US', options);
    };

    const parseDate = (dateString: string) => new Date(dateString).getTime();

    const monthTicks = Array.from(new Set(product.sales.map(sale => {
        const date = new Date(sale.weekEnding);
        return new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    })));

    monthTicks.shift(); //Remove the first tick which is DEC to properly start in JAN.

    const dataWithParsedDates = product.sales.map(sale => ({
        ...sale,
        weekEnding: parseDate(sale.weekEnding),
    }));

    return (
        <div className="product-graph-container">
            <h2 className="graph-title">Retail Sales</h2>
            <div className="product-graph">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={dataWithParsedDates}
                        margin={{ top: 5, right: 25, left: 15, bottom: 5 }}>
                        <XAxis
                            dataKey="weekEnding"
                            scale="time"
                            type="number"
                            domain={['dataMin', 'dataMax']}
                            tickFormatter={formatMonth}
                            ticks={monthTicks}/>
                        <Line type="monotone" dataKey="retailerMargin" stroke="grey" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="retailSales" stroke="skyblue" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ProductGraph;
