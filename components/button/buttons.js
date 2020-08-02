import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

export const RoundedButton = ({state, text, onClick}) =>{

    if (state == 'loading')
        return (<div className="btnCont"><button className="btn btn-success submit" onClick={onClick}><FontAwesomeIcon icon="spinner" spin/></button></div>);

    else if (state == 'success')
        return (<div className="btnCont"><button className="btn btn-success submit" onClick={onClick}><FontAwesomeIcon icon="check"/></button></div>);


    return (
        <div className="btnCont">
            <button className="btn btn-success submit" onClick={onClick}>{text}</button>
        </div>
    );
}

RoundedButton.propTypes = {
    type: PropTypes.string.isRequired,
}