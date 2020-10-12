import React, {useState} from 'react';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import {MoreVertOutlined,CreateOutlined, DeleteOutline, RemoveRedEyeOutlined} from '@material-ui/icons';


export default function ActionButton({ind,actions}){

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
                    {actions.edit && <div className="actions-items edit" onClick={e => actions.edit(ind)}><CreateOutlined />Edit</div>}
                    {actions.view && <div className="actions-items view" onClick={e => actions.view(ind)}><RemoveRedEyeOutlined />View</div>}
                    {actions.del && <div className="actions-items del" onClick={e => actions.del(ind)}><DeleteOutline />Delete</div>}
                </div>
            </Popover>
        </div>
    );
}