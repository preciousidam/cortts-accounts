import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import useAuth from '../../provider';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }));

export const ProfileDropdown = ({name, links}) =>{

    const classes = useStyles();
    const [dropdown, setDropdown] = useState(false);
    const {logout, user} = useAuth();

    return(
        <div id="profileCont" onClick={() => setDropdown(!dropdown)}>
            <div id="profile">
                <Avatar id="avater" className={classes.purple}>{user != null ? user.username[0] : 'C'}</Avatar>
                <p>{user != null ? user.username : 'Anonymous'}</p>
            </div>
            {dropdown && <div className="dropdown">
                <ul className="dropdown-content">
                    {links.map((x,i) => <li className="drop-link" key={i} onClick><a>{x}</a></li>)}
                    <li className="drop-link" key={10} onClick={_ => logout()}><a>logout</a></li>
                </ul>
            </div>}
        </div>
    );
}