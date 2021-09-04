import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
// import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
// import MailIcon from '@material-ui/icons/Mail';
import TextField from '@material-ui/core/TextField';
import './App.css';

import Map from './components/Map';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function App() {
    const classes = useStyles();
    const [state, setState] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(open);
    };

    return (
        <div>
            <div class="drawer">
                <React.Fragment key="left">
                    <Button onClick={toggleDrawer(true)}><SearchIcon/>Filter</Button>
                    <Drawer open={state} onClose={toggleDrawer(false)}>
                        <Box
                            className="close">
                            <Fab 
                                color="secondary" 
                                aria-label="edit"
                                onClick={toggleDrawer(false)}>
                                <CloseIcon/>
                            </Fab>
                        </Box>
                        <Divider />
                        <Box
                            className="query">
                            <TextField id="outlined-basic" label="Query" variant="outlined" />
                        </Box>
                    </Drawer>
                </React.Fragment>
            </div>
            <Map>
            </Map>
        </div>
    );
}
