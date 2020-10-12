import React, {} from 'react';


export function StyledInput({type, label, placeholder, id, ...rest}){
    return (
        <div className="form-group styled">
            {label && <label className="label" htmlFor={id}>{label}</label>}
            <input type={type} className="form-control" id={id} placeholder={placeholder} {...rest} />
        </div>
    );
}

export function SelectInput({defaultChoice, containerStyle, options, label, id, ...rest}){
    return (
        <div className="form-group styled" style={containerStyle}>
            {label && <label className="label" htmlFor={id}>{label}</label>}
            <select className="custom-select" id={id} {...rest}>
                <option key={1000} value={0}>{defaultChoice}</option>
                {options.map(({text,value}, i) => <option key={i} value={value}>{text}</option>)}
            </select>
        </div>
    );
}