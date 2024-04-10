import React, { useState } from "react";
import CarouselCpn from "./carousel";
import LeftProductCategoryCpn from "./leftProductCategory";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import ProductDrawerCpn from "./productDrawer";
import MainCpn from "./main";
const categories = [
    {
        name: 'first',
        description: 'description1'
    },
    {
        name: 'second',
        description: 'description2'
    },
    {
        name: 'third',
        description: 'description3'
    },
    {
        name: 'forth',
        description: 'description4'
    }
]
const products = [
    {
        name: 'product1',
        SKU: 'sku1',
        price: 'price1',
        description: ' descriptioin1'
    }, {
        name: 'product2',
        SKU: 'sku2',
        price: 'price2',
        description: ' descriptioin2'
    }, {
        name: 'product3',
        SKU: 'sku3',
        price: 'price3',
        description: ' descriptioin3'
    }, {
        name: 'product4',
        SKU: 'sku1',
        price: 'price4',
        description: ' descriptioin4'
    },
]
export default function ProductManagementCpn() {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <div className="container">
            <CarouselCpn />
            <Grid container spacing={2}>
                <Grid xs={2}>
                    <LeftProductCategoryCpn categories={categories} openDrawer={setOpenDrawer} />
                </Grid>
                <Grid xs={10}>
                    <MainCpn categories={categories} products={products} />
                </Grid>
            </Grid>
            <ProductDrawerCpn categories={categories} open={openDrawer} openDrawer={setOpenDrawer} />
        </div>
    )
}