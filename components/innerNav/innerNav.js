import {Add} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {useRouter} from 'next/router';


const Nav = ({breadcrumb, title,action}) => {
    const useStyles = makeStyles({
        root: {
          background: 'linear-gradient(45deg, #85c226 30%, #25D366 90%)',
          border: 0,
          borderRadius: 10,
          boxShadow: '0 3px 5px 2px rgba(#85c226, .3)',
          color: 'white',
          padding: '10px 30px',
        },
      });
    const classes = useStyles();
    const router = useRouter();

    const handleClick = (e) => {
        
        e.preventDefault();
        action();
    }

    return (
        <div className="inner-nav">
            <div className="inner-crumb">
                <h4>{title}</h4>
                {breadcrumb}
            </div>
            <div className="inner-action">
            <Button className={classes.root} onClick={handleClick} ><Add />New</Button>
            </div>
        </div>
    );
}

export default Nav;