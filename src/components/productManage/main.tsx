import React, { useState } from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import ProductCardCpn from "./productCard";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
interface mainProps {
    products: any[];
    categories: any[];
}
export default function MainCpn({ products, categories }: mainProps) {
    const [openDeleteDlg, setOpenDeleteDlg] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(0);
    const [tempImageSrc, setTempImageSrc] = React.useState<string | ArrayBuffer | null>(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    return (
        <div >
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
                    <Button color="primary" sx={{ p: '10px' }} variant="contained" aria-label="directions" startIcon={<SearchIcon />}>
                        Search
                    </Button>
                </div>
                <div className='h-margin'>
                    <Fab color="success" aria-label="add" onClick={() => {
                        setEditMode(false);
                        setOpenDialog(true);
                    }}>
                        <AddIcon />
                    </Fab>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', color: '#6b6c6e' }}>
                <SearchIcon />
                {`${products.length} products`}
            </div>
            <Dialog
                open={openDialog}
                fullWidth
                onClose={() => { setOpenDialog(false) }}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());

                    },
                }}
            >
                <LinearProgress />
                <DialogTitle>{`${editMode ? "Edit" : "Add"} Product`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`To ${editMode ? "edit" : "add"} product, please enter product info here.`}
                    </DialogContentText>
                    <div style={{ marginTop: '10px', marginBottom: '10px', display: 'flex' }}>
                        <Button
                            style={{ height: '40px', marginRight: '30px' }}
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload file
                            <VisuallyHiddenInput type="file"
                                name='image'
                                accept="image/*"
                                onChange={(event) => {
                                    const file = event.target.files && event.target.files[0];
                                    console.log(file)
                                    if (file) {
                                        // Use FileReader to read the file and set it as temp image source
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            if (reader.readyState === FileReader.DONE) {
                                                setTempImageSrc(reader.result);
                                            }
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </Button>
                        {tempImageSrc ?
                            <img src={tempImageSrc?.toString()} alt="Preview" className='product_img' />
                            : <img src="/img/empty.png" className='product_img' alt="empty" />
                        }
                    </div>
                    <div className='v-margin'>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Product Name"
                            fullWidth
                            variant="standard"
                        />
                    </div>
                    <div className='v-margin'>
                        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            // value={age}
                            // onChange={handleChange}
                            label="Category"
                            variant="standard"
                        >
                            {
                                categories.map((aCategory, idx) => (
                                    <MenuItem key={idx} value={aCategory.name}>{aCategory.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </div>
                    <div className='v-margin'>
                        <TextField
                            required
                            margin="dense"
                            id="sku"
                            name="sku"
                            label="SKU"
                            fullWidth
                            variant="standard"
                        />
                    </div>
                    <div className='v-margin'>
                        <TextField
                            type="number"
                            required
                            margin="dense"
                            id="price"
                            name="price"
                            label="price"
                            fullWidth
                            variant="standard"
                            // InputProps={{
                            //     startAdornment: (
                            //         <InputAdornment position="start">
                            //             <AttachMoneyIcon />
                            //         </InputAdornment>
                            //     ),
                            // }}
                            placeholder="$"
                        />
                    </div>
                    <div className='v-margin'>
                        <TextField
                            required
                            variant="standard"
                            fullWidth
                            id="outlined-multiline-flexible"
                            name="description"
                            label="description"
                            multiline
                            rows={5}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenDialog(false) }}  >Cancel</Button>
                    <Button type="submit" > Add</Button>
                    {editMode &&
                        <Button color="error"> Delete</Button>
                    }
                </DialogActions>
            </Dialog>
            <div style={{ display: 'flex', marginTop: '40px' }}>
                {
                    products.map((aProduct, idx) => (
                        <ProductCardCpn key={idx} product={aProduct}
                            setCurrentProduct={setCurrentProduct}
                            setOpenDialog={setOpenDialog}
                            setOpenDeleteDlg={setOpenDeleteDlg}
                            setEditMode={setEditMode} />
                    ))
                }
            </div>
            <Dialog
                open={openDeleteDlg}
                onClose={() => setOpenDeleteDlg(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Are you sure want to delete ${products[currentProduct].name} category?`}
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description">
                        If you delete p, all products in that category will be deleted.
                    </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDlg(false)}>Cancel</Button>
                    <Button onClick={() => setOpenDeleteDlg(false)} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}