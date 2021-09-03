
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import './App.css';

import Map from './components/Map';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

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
                    <Button onClick={toggleDrawer(true)}>Filter</Button>
                    <Drawer open={state} onClose={toggleDrawer(false)}>
                        <div
                            className={clsx(classes.list, {
                                [classes.fullList]: false,
                            })}
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <List>
                                <ListItem button key="close">
                                    <ListItemIcon></ListItemIcon>
                                    <ListItemText primary="close" />
                                </ListItem>
                            </List>
                            <Divider />
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        </div>
                    </Drawer>
                </React.Fragment>
            </div>
            <Map>
            </Map>
        </div>
    );
}
