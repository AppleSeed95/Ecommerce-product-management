import React, { useState } from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';


import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function MainCpn() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return (
        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'flex-end' }}>
            <div>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >

                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Products"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                </Paper>
            </div>

            <div className="h-margin">
                <Checkbox {...label}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
                <TextField
                    className="number-input"
                    style={{ width: '100px' }}
                    id="input-with-icon-textfield"
                    label="Min"
                    type="number"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AttachMoneyIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                />
            </div>
            <div className="h-margin">
                <TextField
                    className="number-input"
                    style={{ width: '100px' }}
                    id="input-with-icon-textfield"
                    label="Max"
                    type="number"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AttachMoneyIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                />
            </div>
            <Button color="primary" sx={{ p: '10px' }} variant="contained" aria-label="directions" startIcon={<SearchIcon />}>
                Search
            </Button>
            <div className='h-margin'>
                <Fab color="success" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
        </div>
    )
}