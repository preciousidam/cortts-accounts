import React, {useState} from 'react';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import {MoreVertOutlined,CreateOutlined, DeleteOutline, RemoveRedEyeOutlined} from '@material-ui/icons';


export default function ActionButton({}){

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="actionBtn">
            <IconButton className="trigger" aria-describedby={id} onClick={handleClick}>
                <MoreVertOutlined />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className="actions">
                    <div className="actions-items edit"><CreateOutlined />Edit</div>
                    <div className="actions-items view"><RemoveRedEyeOutlined />View</div>
                    <div className="actions-items del"><DeleteOutline />Delete</div>
                </div>
            </Popover>
        </div>
    );
}