import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import LinearProgress from '@mui/material/LinearProgress';
import { useMutation } from '@apollo/client';
import { CREATE_CATEGORY_MUTATION } from '../../graphql/mutations';
import { CREATE_PRODUCT_MUTATION } from '../../graphql/mutations';

interface ProductDrawerProps {
    open: boolean;
    openDrawer: (val: boolean) => void;
}

export default function ProductDrawerCpn({ open, openDrawer }: ProductDrawerProps) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false)
    const [tempImageSrc, setTempImageSrc] = React.useState<string | ArrayBuffer | null>(null);
    const [createCategory, { data, loading, error }] = useMutation(CREATE_CATEGORY_MUTATION);

    const handleCreateCategory = () => {
        createCategory({
            variables: {
                input: {
                    name: "pear",
                },
            },
        });
    };
    // const [createProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT_MUTATION);

    // const handleCreateProduct = () => {
    // createProduct({
    //     variables: {
    //     input: {
    //         name: "maximum",
    //         price: 500.0,
    //         description: "",
    //     },
    //     },
    // });
    // };

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const list = () => (
        !isLoading ?
            <div className='h-padding'>
                <Box sx={{ width: 300 }}
                    role="presentation"
                >
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <div className='v-padding' style={{ textAlign: 'center' }}>
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpenDialog}>
                            Add Category
                        </Button>
                    </div>
                </Box>
            </div> :
            <div className='h-padding'>
                <Box sx={{ width: 300 }}>
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className='v-margin'>
                            <Skeleton variant="rectangular" height={50} animation="wave" />
                        </div>
                    ))}

                </Box>
            </div>
    );
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
    return (
        <div>
            < React.Fragment >
                <Drawer
                    anchor={'left'}
                    open={open}
                    onClose={() => openDrawer(false)}
                >
                    {list()}
                </Drawer>
            </React.Fragment >
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());

                        handleCreateCategory();
                        if (loading) {
                            console.log('loading');
                        };
                        if (error) {
                            console.log('error');

                        }
                        console.log(formJson);

                        // handleCloseDialog();
                    },
                }}
            >
                <LinearProgress />
                <DialogTitle>Add Product Category</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add product category, please enter category info here.
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
                                }} />
                        </Button>
                        {tempImageSrc ?
                            <img src={tempImageSrc?.toString()} alt="Preview" className='category_img' />
                            : <img src="/img/empty.png" className='category_img' alt="empty" />
                        }
                    </div>
                    <div className='v-margin'>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Category Name"
                            fullWidth
                            variant="standard"
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
                    <Button onClick={handleCloseDialog}  >Cancel</Button>
                    <Button type="submit" > Add</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}