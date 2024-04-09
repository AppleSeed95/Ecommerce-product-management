import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';



interface LeftProductCategoryProps {
    openDrawer: (open: boolean) => void;
}

export default function LeftProductCategoryCpn({ openDrawer }: LeftProductCategoryProps) {
    const [isLoading, setIsLoading] = React.useState(false);
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
                    <ListItemButton >
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sent mail" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                    </ListItemButton>
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