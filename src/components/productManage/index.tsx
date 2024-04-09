import React, { useState } from "react";
import CarouselCpn from "./carousel";
import LeftProductCategoryCpn from "./leftProductCategory";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import ProductDrawerCpn from "./productDrawer";
import MainCpn from "./main";

export default function ProductManagementCpn() {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <div className="container">
            <CarouselCpn />
            <Grid container spacing={2}>
                <Grid xs={2}>
                    <LeftProductCategoryCpn openDrawer={setOpenDrawer} />
                </Grid>
                <Grid xs={10}>
                    <MainCpn />
                </Grid>
            </Grid>
            <ProductDrawerCpn open={openDrawer} openDrawer={setOpenDrawer} />
        </div>
    )
}