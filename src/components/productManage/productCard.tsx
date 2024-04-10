import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

interface productProps {
    product: {
        name: string;
        SKU: string;
        price: string;
        description: string;
    }
    setCurrentProduct: (val: number) => void;
    setEditMode: (val: boolean) => void;
    setOpenDialog: (val: boolean) => void;
    setOpenDeleteDlg: (val: boolean) => void;
}
export default function ProductCardCpn({ product, setCurrentProduct, setEditMode, setOpenDeleteDlg, setOpenDialog }: productProps) {
    return (
        <div style={{ padding: '10px', width: '25%' }}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <div>
                        <img style={{ width: '100%' }} src="/img/coat.png" alt="green iguana" />
                    </div>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => {
                            setEditMode(true);
                            // setCurrentProduct(product)
                            setOpenDialog(true);
                            setEditMode(true);
                        }}>
                            More
                        </Button>
                    </CardActions>
                </CardActionArea>
            </Card>
        </div>

    );
}