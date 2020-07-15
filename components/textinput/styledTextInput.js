
export function StyledInput({type, label, placeholder, id, ...rest}){
    return (
        <div className="form-group styled">
            {label && <label className="label" htmlFor={id}>{label}</label>}
            <input type={type} className="form-control" id={id} placeholder={placeholder} {...rest} />
        </div>
    );
}
