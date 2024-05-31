import React, {useState} from "react";
import {useSelector} from "react-redux"
import {RootState} from "../redux/productStore";
import { format, parseISO } from "date-fns";

import "../styles/ProductTable.css"

const ProductTable: React.FC = () => {
    const product = useSelector((state: RootState) => state.products.productData)
    const data = React.useMemo(() => product ? product.sales : [], [product])

    const columns = [
        {
            Header: "WEEK ENDING",
            id: "weekEnding",
        },
        {
            Header: "RETAIL SALES",
            id: "retailSales",
        },
        {
            Header: "WHOLESALE SALES",
            id: "wholesaleSales",
        },
        {
            Header: "UNITS SOLD",
            id: "unitsSold",
        },
        {
            Header: "RETAILER MARGIN",
            id: "retailerMargin",
        },
    ];

    if (!product || !product.sales) {
        return null
    }

    return (
        <div className="product-table-container">
            <table className={"product-table"}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.id}>
                                {column.Header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex}>
                                {column.id ==="weekEnding" ? format(parseISO(row[column.id]), "MM-dd-yy") :
                                    column.id === "retailSales" || column.id === "wholesaleSales"
                                || column.id === "retailerMargin" ? `$${(row as any)[column.id].toLocaleString()}`
                                : (row as any)[column.id].toLocaleString
                                ? (row as any)[column.id].toLocaleString()
                                : (row as any)[column.id]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};


export default ProductTable;