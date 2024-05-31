import React from "react";
import MaterialTable from "@material-table/core";
import {useSelector} from "react-redux"
import {RootState} from "../redux/productStore";
import { format, parseISO } from "date-fns";

import "../styles/ProductTable.css"

const ProductTable: React.FC = () => {
    const product = useSelector((state: RootState) => state.products.productData)
    const data = React.useMemo(() => product ? product.sales : [], [product])

    const columns = [
        {
            title: "WEEK ENDING",
            field: "weekEnding",
            sorting: false,
            render: (rowData: { weekEnding: string; }) => format(parseISO(rowData.weekEnding), "MM-dd-yy"),
        },
        {
            title: "RETAIL SALES",
            field: "retailSales",
            sorting: false,
            render: (rowData: { retailSales: number }) => `$${rowData.retailSales.toLocaleString()}`,
        },
        {
            title: "WHOLESALE SALES",
            field: "wholesaleSales",
            sorting: false,
            render: (rowData: { wholesaleSales: { toLocaleString: () => any; }; }) => `$${rowData.wholesaleSales.toLocaleString()}`

        },
        {
            title: "UNITS SOLD",
            field: "unitsSold",
            sorting: false,
            render: (rowData: { unitsSold: { toLocaleString: () => any; }; }) => rowData.unitsSold.toLocaleString()
        },
        {
            title: "RETAILER MARGIN",
            field: "retailerMargin",
            sorting: false,
            render: (rowData: { retailerMargin: { toLocaleString: () => any; }; }) => `$${rowData.retailerMargin.toLocaleString()}`
        },
    ];

    if (!product || !product.sales) {
        return null
    }

    return (
        <div className="product-table-container">
            <MaterialTable
                title={""}
                columns={columns}
                data={data}
                options={{
                    pageSize: 20,
                    pageSizeOptions: [20, 40, 60],
                    paging: true,
                }}
            />
        </div>
    );
};

export default ProductTable;