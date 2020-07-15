import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

export const RoundedButton = ({state, text, href}) =>{
    let display;
    const router = useRouter()

    switch(state){
        case 'loading':
            display = <FontAwesomeIcon icon="spinner" spin/>;
        case 'success':
            display = <FontAwesomeIcon icon="check"/>;
        default:
            display =  text;


    }
    
    const handleClick = (e) => {
        e.preventDefault()
        router.push(href)
    }


    return (
        <div className="btnCont">
            <button className="btn btn-success submit" onClick={handleClick}>{display}</button>
        </div>
    );
}

RoundedButton.propTypes = {
    type: PropTypes.string.isRequired,
}