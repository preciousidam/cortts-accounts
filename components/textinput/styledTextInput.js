
export function StyledInput({type, label, placeholder, id, ...rest}){
    return (
        <div className="form-group styled">
            {label && <label className="label" htmlFor={id}>{label}</label>}
            <input type={type} className="form-control" id={id} placeholder={placeholder} {...rest} />
        </div>
    );
}

export function SelectInput({defaultChoice, options, label, id, ...rest}){
    return (
        <div className="form-group styled">
            {label && <label className="label" htmlFor={id}>{label}</label>}
            <select class="custom-select" id={id} {...rest}>
                <option selected>{defaultChoice}</option>
                {options.map(({text,value}) => <option value={value}>{text}</option>)}
            </select>
        </div>
    );
}