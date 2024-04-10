import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import BorderAllIcon from '@mui/icons-material/BorderAll';




interface Category {
    name: string;
    description: string;
}
interface LeftProductCategoryProps {
    openDrawer: (open: boolean) => void;
    categories: {
        name: string;
        description: string;
    }[];
}

export default function LeftProductCategoryCpn({ openDrawer, categories }: LeftProductCategoryProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [selecctedIdx, setSelectedIdx] = React.useState(0)
    const handleClick = () => {
        openDrawer(true);
    };

    return (
        !isLoading ?
            <div>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    {
                        categories.map((aCategory, idx) => (
                            <ListItemButton key={idx}
                                onClick={() => setSelectedIdx(idx)}
                                selected={idx === selecctedIdx}
                            >
                                <ListItemIcon>
                                    <BorderAllIcon />
                                </ListItemIcon>
                                <ListItemText primary={aCategory.name} />
                            </ListItemButton>
                        ))
                    }
                </List>
                <div className='editBtn'>
                    <Fab color="primary" aria-label="add" onClick={handleClick}>
                        <EditIcon />
                    </Fab>
                </div>

            </div> : <div>
                <Box sx={{ width: 300 }}>
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className='v-margin'>
                            <Skeleton variant="rectangular" height={50} animation="wave" />
                        </div>
                    ))}

                </Box>
            </div>
    );
}